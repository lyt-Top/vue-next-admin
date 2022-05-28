<template>
	<div class="layout-navbars-tagsview" :class="{ 'layout-navbars-tagsview-shadow': getThemeConfig.layout === 'classic' }">
		<el-scrollbar ref="scrollbarRef" @wheel.prevent="onHandleScroll">
			<ul class="layout-navbars-tagsview-ul" :class="setTagsStyle" ref="tagsUlRef">
				<li
					v-for="(v, k) in tagsViewList"
					:key="k"
					class="layout-navbars-tagsview-ul-li"
					:data-url="v.url"
					:class="{ 'is-active': isActive(v) }"
					@contextmenu.prevent="onContextmenu(v, $event)"
					@click="onTagsClick(v, k)"
					:ref="
						(el) => {
							if (el) tagsRefs[k] = el;
						}
					"
				>
					<i class="iconfont icon-webicon318 layout-navbars-tagsview-ul-li-iconfont" v-if="isActive(v)"></i>
					<SvgIcon :name="v.meta.icon" v-if="!isActive(v) && getThemeConfig.isTagsviewIcon" class="pr5" />
					<span>{{ setTagsViewNameI18n(v) }}</span>
					<template v-if="isActive(v)">
						<SvgIcon
							name="ele-RefreshRight"
							class="ml5 layout-navbars-tagsview-ul-li-refresh"
							@click.stop="refreshCurrentTagsView($route.fullPath)"
						/>
						<SvgIcon
							name="ele-Close"
							class="layout-navbars-tagsview-ul-li-icon layout-icon-active"
							v-if="!v.meta.isAffix"
							@click.stop="closeCurrentTagsView(getThemeConfig.isShareTagsView ? v.path : v.url)"
						/>
					</template>
					<SvgIcon
						name="ele-Close"
						class="layout-navbars-tagsview-ul-li-icon layout-icon-three"
						v-if="!v.meta.isAffix"
						@click.stop="closeCurrentTagsView(getThemeConfig.isShareTagsView ? v.path : v.url)"
					/>
				</li>
			</ul>
		</el-scrollbar>
		<Contextmenu :dropdown="dropdown" ref="contextmenuRef" @currentContextmenuClick="onCurrentContextmenuClick" />
	</div>
</template>

<script lang="ts">
import {
	toRefs,
	reactive,
	onMounted,
	computed,
	ref,
	nextTick,
	onBeforeUpdate,
	onBeforeMount,
	onUnmounted,
	getCurrentInstance,
	watch,
	defineComponent,
} from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import Sortable from 'sortablejs';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import pinia from '/@/stores/index';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useKeepALiveNames } from '/@/stores/keepAliveNames';
import { Session } from '/@/utils/storage';
import { isObjectValueEqual } from '/@/utils/arrayOperation';
import other from '/@/utils/other';
import Contextmenu from '/@/layout/navBars/tagsView/contextmenu.vue';

// 定义接口来定义对象的类型
interface TagsViewState {
	routeActive: string;
	routePath: string | unknown;
	dropdown: {
		x: string | number;
		y: string | number;
	};
	sortable: any;
	tagsRefsIndex: number;
	tagsViewList: any[];
	tagsViewRoutesList: any[];
}
interface RouteParams {
	path: string;
	url: string;
	query: object;
	params: object;
}
interface CurrentContextmenu {
	meta: {
		isDynamic: boolean;
	};
	params: any;
	query: any;
	path: string;
	contextMenuClickId: string | number;
}

export default defineComponent({
	name: 'layoutTagsView',
	components: { Contextmenu },
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const tagsRefs = ref<any[]>([]);
		const scrollbarRef = ref();
		const contextmenuRef = ref();
		const tagsUlRef = ref();
		const stores = useTagsViewRoutes();
		const storesThemeConfig = useThemeConfig();
		const storesTagsViewRoutes = useTagsViewRoutes();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const { tagsViewRoutes } = storeToRefs(storesTagsViewRoutes);
		const storesKeepALiveNames = useKeepALiveNames();
		const route = useRoute();
		const router = useRouter();
		const state = reactive<TagsViewState>({
			routeActive: '',
			routePath: route.path,
			dropdown: { x: '', y: '' },
			sortable: '',
			tagsRefsIndex: 0,
			tagsViewList: [],
			tagsViewRoutesList: [],
		});
		// 动态设置 tagsView 风格样式
		const setTagsStyle = computed(() => {
			return themeConfig.value.tagsStyle;
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return themeConfig.value;
		});
		// 设置 自定义 tagsView 名称、 自定义 tagsView 名称国际化
		const setTagsViewNameI18n = computed(() => {
			return (v: any) => {
				return other.setTagsViewNameI18n(v);
			};
		});
		// 设置 tagsView 高亮
		const isActive = (v: RouteParams) => {
			if (getThemeConfig.value.isShareTagsView) {
				return v.path === state.routePath;
			} else {
				if ((v.query && Object.keys(v.query).length) || (v.params && Object.keys(v.params).length)) {
					// 普通传参
					return v.url ? v.url === state.routeActive : v.path === state.routeActive;
				} else {
					// 通过 name 传参，params 取值，刷新页面参数消失
					// https://gitee.com/lyt-top/vue-next-admin/issues/I51RS9
					return v.path === state.routePath;
				}
			}
		};
		// 存储 tagsViewList 到浏览器临时缓存中，页面刷新时，保留记录
		const addBrowserSetSession = (tagsViewList: Array<object>) => {
			Session.set('tagsViewList', tagsViewList);
		};
		// 获取 vuex 中的 tagsViewRoutes 列表
		const getTagsViewRoutes = async () => {
			state.routeActive = await setTagsViewHighlight(route);
			state.routePath = (await route.meta.isDynamic) ? route.meta.isDynamicPath : route.path;
			state.tagsViewList = [];
			state.tagsViewRoutesList = tagsViewRoutes.value;
			initTagsView();
		};
		// vuex 中获取路由信息：如果是设置了固定的（isAffix），进行初始化显示
		const initTagsView = async () => {
			if (Session.get('tagsViewList') && getThemeConfig.value.isCacheTagsView) {
				state.tagsViewList = await Session.get('tagsViewList');
			} else {
				await state.tagsViewRoutesList.map((v: any) => {
					if (v.meta.isAffix && !v.meta.isHide) {
						v.url = setTagsViewHighlight(v);
						state.tagsViewList.push({ ...v });
						storesKeepALiveNames.addCachedView(v);
					}
				});
				await addTagsView(route.path, route);
			}
			// 初始化当前元素(li)的下标
			getTagsRefsIndex(getThemeConfig.value.isShareTagsView ? state.routePath : state.routeActive);
		};
		// 处理可开启多标签详情，单标签详情（动态路由（xxx/:id/:name"），普通路由处理）
		const solveAddTagsView = async (path: string, to?: any) => {
			let isDynamicPath = to.meta.isDynamic ? to.meta.isDynamicPath : path;
			let current = state.tagsViewList.filter(
				(v: any) =>
					v.path === isDynamicPath &&
					isObjectValueEqual(
						to.meta.isDynamic ? (v.params ? v.params : null) : v.query ? v.query : null,
						to.meta.isDynamic ? (to?.params ? to?.params : null) : to?.query ? to?.query : null
					)
			);
			if (current.length <= 0) {
				// 防止：Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.
				let findItem = state.tagsViewRoutesList.find((v: any) => v.path === isDynamicPath);
				if (!findItem) return false;
				if (findItem.meta.isAffix) return false;
				if (findItem.meta.isLink && !findItem.meta.isIframe) return false;
				to.meta.isDynamic ? (findItem.params = to.params) : (findItem.query = to.query);
				findItem.url = setTagsViewHighlight(findItem);
				state.tagsViewList.push({ ...findItem });
				await storesKeepALiveNames.addCachedView(findItem);
				addBrowserSetSession(state.tagsViewList);
			}
		};
		// 处理单标签时，第二次的值未覆盖第一次的 tagsViewList 值（Session Storage）
		const singleAddTagsView = (path: string, to?: any) => {
			let isDynamicPath = to.meta.isDynamic ? to.meta.isDynamicPath : path;
			state.tagsViewList.forEach((v) => {
				if (
					v.path === isDynamicPath &&
					!isObjectValueEqual(
						to.meta.isDynamic ? (v.params ? v.params : null) : v.query ? v.query : null,
						to.meta.isDynamic ? (to?.params ? to?.params : null) : to?.query ? to?.query : null
					)
				) {
					to.meta.isDynamic ? (v.params = to.params) : (v.query = to.query);
					v.url = setTagsViewHighlight(v);
					addBrowserSetSession(state.tagsViewList);
				}
			});
		};
		// 1、添加 tagsView：未设置隐藏（isHide）也添加到在 tagsView 中（可开启多标签详情，单标签详情）
		const addTagsView = (path: string, to?: any) => {
			// 防止拿取不到路由信息
			nextTick(async () => {
				// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
				let item: any = '';
				if (to && to.meta.isDynamic) {
					// 动态路由（xxx/:id/:name"）：参数不同，开启多个 tagsview
					if (!getThemeConfig.value.isShareTagsView) await solveAddTagsView(path, to);
					else await singleAddTagsView(path, to);
					if (state.tagsViewList.some((v: any) => v.path === to.meta.isDynamicPath)) return false;
					item = state.tagsViewRoutesList.find((v: any) => v.path === to.meta.isDynamicPath);
				} else {
					// 普通路由：参数不同，开启多个 tagsview
					if (!getThemeConfig.value.isShareTagsView) await solveAddTagsView(path, to);
					else await singleAddTagsView(path, to);
					if (state.tagsViewList.some((v: any) => v.path === path)) return false;
					item = state.tagsViewRoutesList.find((v: any) => v.path === path);
				}
				if (!item) return false;
				if (item.meta.isLink && !item.meta.isIframe) return false;
				if (to && to.meta.isDynamic) item.params = to?.params ? to?.params : route.params;
				else item.query = to?.query ? to?.query : route.query;
				item.url = setTagsViewHighlight(item);
				await storesKeepALiveNames.addCachedView(item);
				await state.tagsViewList.push({ ...item });
				await addBrowserSetSession(state.tagsViewList);
			});
		};
		// 2、刷新当前 tagsView：
		const refreshCurrentTagsView = async (fullPath: string) => {
			const item = state.tagsViewList.find((v: any) => (getThemeConfig.value.isShareTagsView ? v.path === fullPath : v.url === fullPath));
			if (item != null) {
				await storesKeepALiveNames.delCachedView(item);
				proxy.mittBus.emit('onTagsViewRefreshRouterView', fullPath);
				if (item.meta.isKeepAlive) storesKeepALiveNames.addCachedView(item);
			}
		};
		// 3、关闭当前 tagsView：如果是设置了固定的（isAffix），不可以关闭
		const closeCurrentTagsView = (path: string) => {
			state.tagsViewList.map((v: any, k: number, arr: any) => {
				if (!v.meta.isAffix) {
					if (getThemeConfig.value.isShareTagsView ? v.path === path : v.url === path) {
						storesKeepALiveNames.delCachedView(v);
						state.tagsViewList.splice(k, 1);
						setTimeout(() => {
							if (state.tagsViewList.length === k && getThemeConfig.value.isShareTagsView ? state.routePath === path : state.routeActive === path) {
								// 最后一个且高亮时
								if (arr[arr.length - 1].meta.isDynamic) {
									// 动态路由（xxx/:id/:name"）
									if (k !== arr.length) router.push({ name: arr[k].name, params: arr[k].params });
									else router.push({ name: arr[arr.length - 1].name, params: arr[arr.length - 1].params });
								} else {
									// 普通路由
									if (k !== arr.length) router.push({ path: arr[k].path, query: arr[k].query });
									else router.push({ path: arr[arr.length - 1].path, query: arr[arr.length - 1].query });
								}
							} else {
								// 非最后一个且高亮时，跳转到下一个
								if (state.tagsViewList.length !== k && getThemeConfig.value.isShareTagsView ? state.routePath === path : state.routeActive === path) {
									if (arr[k].meta.isDynamic) {
										// 动态路由（xxx/:id/:name"）
										router.push({ name: arr[k].name, params: arr[k].params });
									} else {
										// 普通路由
										router.push({ path: arr[k].path, query: arr[k].query });
									}
								}
							}
						}, 0);
					}
				}
			});
			addBrowserSetSession(state.tagsViewList);
		};
		// 4、关闭其它 tagsView：如果是设置了固定的（isAffix），不进行关闭
		const closeOtherTagsView = (path: string) => {
			if (Session.get('tagsViewList')) {
				state.tagsViewList = [];
				Session.get('tagsViewList').map((v: any) => {
					if (v.meta.isAffix && !v.meta.isHide) {
						v.url = setTagsViewHighlight(v);
						storesKeepALiveNames.delOthersCachedViews(v);
						state.tagsViewList.push({ ...v });
					}
				});
				addTagsView(path, route);
				addBrowserSetSession(state.tagsViewList);
			}
		};
		// 5、关闭全部 tagsView：如果是设置了固定的（isAffix），不进行关闭
		const closeAllTagsView = () => {
			if (Session.get('tagsViewList')) {
				storesKeepALiveNames.delAllCachedViews();
				state.tagsViewList = [];
				Session.get('tagsViewList').map((v: any) => {
					if (v.meta.isAffix && !v.meta.isHide) {
						v.url = setTagsViewHighlight(v);
						state.tagsViewList.push({ ...v });
						router.push({ path: state.tagsViewList[state.tagsViewList.length - 1].path });
					}
				});
				addBrowserSetSession(state.tagsViewList);
			}
		};
		// 6、开启当前页面全屏
		const openCurrenFullscreen = async (path: string) => {
			const item = state.tagsViewList.find((v: any) => (getThemeConfig.value.isShareTagsView ? v.path === path : v.url === path));
			if (item.meta.isDynamic) await router.push({ name: item.name, params: item.params });
			else await router.push({ name: item.name, query: item.query });
			stores.setCurrenFullscreen(true);
		};
		// 当前项右键菜单点击，拿当前点击的路由路径对比 浏览器缓存中的 tagsView 路由数组，取当前点击项的详细路由信息
		// 防止 tagsView 非当前页演示时，操作异常
		const getCurrentRouteItem = (path: string, cParams: any) => {
			const itemRoute = Session.get('tagsViewList') ? Session.get('tagsViewList') : state.tagsViewList;
			return itemRoute.find((v: any) => {
				if (
					v.path === path &&
					isObjectValueEqual(
						v.meta.isDynamic ? (v.params ? v.params : null) : v.query ? v.query : null,
						cParams && Object.keys(cParams ? cParams : {}).length > 0 ? cParams : null
					)
				) {
					return v;
				} else if (v.path === path && Object.keys(cParams ? cParams : {}).length <= 0) {
					return v;
				}
			});
		};
		// 当前项右键菜单点击
		const onCurrentContextmenuClick = async (item: CurrentContextmenu) => {
			const cParams = item.meta.isDynamic ? item.params : item.query;
			if (!getCurrentRouteItem(item.path, cParams)) return ElMessage({ type: 'warning', message: '请正确输入路径及完整参数（query、params）' });
			const { path, name, params, query, meta, url } = getCurrentRouteItem(item.path, cParams);
			switch (item.contextMenuClickId) {
				case 0:
					// 刷新当前
					if (meta.isDynamic) await router.push({ name, params });
					else await router.push({ path, query });
					refreshCurrentTagsView(route.fullPath);
					break;
				case 1:
					// 关闭当前
					closeCurrentTagsView(getThemeConfig.value.isShareTagsView ? path : url);
					break;
				case 2:
					// 关闭其它
					if (meta.isDynamic) await router.push({ name, params });
					else await router.push({ path, query });
					closeOtherTagsView(path);
					break;
				case 3:
					// 关闭全部
					closeAllTagsView();
					break;
				case 4:
					// 开启当前页面全屏
					openCurrenFullscreen(getThemeConfig.value.isShareTagsView ? path : url);
					break;
			}
		};
		// 右键点击时：传 x,y 坐标值到子组件中（props）
		const onContextmenu = (v: any, e: any) => {
			const { clientX, clientY } = e;
			state.dropdown.x = clientX;
			state.dropdown.y = clientY;
			contextmenuRef.value.openContextmenu(v);
		};
		// 当前的 tagsView 项点击时
		const onTagsClick = (v: any, k: number) => {
			state.tagsRefsIndex = k;
			router.push(v);
		};
		// 处理 tagsView 高亮（多标签详情时使用，单标签详情未使用）
		const setTagsViewHighlight = (v: any) => {
			let params = v.query && Object.keys(v.query).length > 0 ? v.query : v.params;
			if (!params || Object.keys(params).length <= 0) return v.path;
			let path = '';
			for (let i in params) {
				path += params[i];
			}
			// 判断是否是动态路由（xxx/:id/:name"）
			return `${v.meta.isDynamic ? v.meta.isDynamicPath : v.path}-${path}`;
		};
		// 更新滚动条显示
		const updateScrollbar = () => {
			proxy.$refs.scrollbarRef.update();
		};
		// 鼠标滚轮滚动
		const onHandleScroll = (e: any) => {
			proxy.$refs.scrollbarRef.$refs.wrap$.scrollLeft += e.wheelDelta / 4;
		};
		// tagsView 横向滚动
		const tagsViewmoveToCurrentTag = () => {
			nextTick(() => {
				if (tagsRefs.value.length <= 0) return false;
				// 当前 li 元素
				let liDom = tagsRefs.value[state.tagsRefsIndex];
				// 当前 li 元素下标
				let liIndex = state.tagsRefsIndex;
				// 当前 ul 下 li 元素总长度
				let liLength = tagsRefs.value.length;
				// 最前 li
				let liFirst: any = tagsRefs.value[0];
				// 最后 li
				let liLast: any = tagsRefs.value[tagsRefs.value.length - 1];
				// 当前滚动条的值
				let scrollRefs = proxy.$refs.scrollbarRef.$refs.wrap$;
				// 当前滚动条滚动宽度
				let scrollS = scrollRefs.scrollWidth;
				// 当前滚动条偏移宽度
				let offsetW = scrollRefs.offsetWidth;
				// 当前滚动条偏移距离
				let scrollL = scrollRefs.scrollLeft;
				// 上一个 tags li dom
				let liPrevTag: any = tagsRefs.value[state.tagsRefsIndex - 1];
				// 下一个 tags li dom
				let liNextTag: any = tagsRefs.value[state.tagsRefsIndex + 1];
				// 上一个 tags li dom 的偏移距离
				let beforePrevL: any = '';
				// 下一个 tags li dom 的偏移距离
				let afterNextL: any = '';
				if (liDom === liFirst) {
					// 头部
					scrollRefs.scrollLeft = 0;
				} else if (liDom === liLast) {
					// 尾部
					scrollRefs.scrollLeft = scrollS - offsetW;
				} else {
					// 非头/尾部
					if (liIndex === 0) beforePrevL = liFirst.offsetLeft - 5;
					else beforePrevL = liPrevTag?.offsetLeft - 5;
					if (liIndex === liLength) afterNextL = liLast.offsetLeft + liLast.offsetWidth + 5;
					else afterNextL = liNextTag.offsetLeft + liNextTag.offsetWidth + 5;
					if (afterNextL > scrollL + offsetW) {
						scrollRefs.scrollLeft = afterNextL - offsetW;
					} else if (beforePrevL < scrollL) {
						scrollRefs.scrollLeft = beforePrevL;
					}
				}
				// 更新滚动条，防止不出现
				updateScrollbar();
			});
		};
		// 获取 tagsView 的下标：用于处理 tagsView 点击时的横向滚动
		const getTagsRefsIndex = (path: string | unknown) => {
			nextTick(async () => {
				// await 使用该写法，防止拿取不到 tagsViewList 列表数据不完整
				let tagsViewList = await state.tagsViewList;
				state.tagsRefsIndex = tagsViewList.findIndex((v: any) => {
					if (getThemeConfig.value.isShareTagsView) {
						return v.path === path;
					} else {
						return v.url === path;
					}
				});
				// 添加初始化横向滚动条移动到对应位置
				tagsViewmoveToCurrentTag();
			});
		};
		// 设置 tagsView 可以进行拖拽
		const initSortable = async () => {
			const el = <HTMLElement>document.querySelector('.layout-navbars-tagsview-ul');
			if (!el) return false;
			state.sortable.el && state.sortable.destroy();
			state.sortable = Sortable.create(el, {
				animation: 300,
				dataIdAttr: 'data-url',
				disabled: getThemeConfig.value.isSortableTagsView ? false : true,
				onEnd: () => {
					const sortEndList: any = [];
					state.sortable.toArray().map((val: any) => {
						state.tagsViewList.map((v: any) => {
							if (v.url === val) sortEndList.push({ ...v });
						});
					});
					addBrowserSetSession(sortEndList);
				},
			});
		};
		// 拖动问题，https://gitee.com/lyt-top/vue-next-admin/issues/I3ZRRI
		const onSortableResize = async () => {
			await initSortable();
			if (other.isMobile()) state.sortable.el && state.sortable.destroy();
		};
		// 页面加载前
		onBeforeMount(() => {
			// 初始化，防止手机端直接访问时还可以拖拽
			onSortableResize();
			// 拖动问题，https://gitee.com/lyt-top/vue-next-admin/issues/I3ZRRI
			window.addEventListener('resize', onSortableResize);
			// 监听非本页面调用 0 刷新当前，1 关闭当前，2 关闭其它，3 关闭全部 4 当前页全屏
			proxy.mittBus.on('onCurrentContextmenuClick', (data: CurrentContextmenu) => {
				onCurrentContextmenuClick(data);
			});
			// 监听布局配置界面开启/关闭拖拽
			proxy.mittBus.on('openOrCloseSortable', () => {
				initSortable();
			});
			// 监听布局配置开启 TagsView 共用，为了演示还原默认值
			proxy.mittBus.on('openShareTagsView', () => {
				if (getThemeConfig.value.isShareTagsView) {
					router.push('/home');
					state.tagsViewList = [];
					state.tagsViewRoutesList.map((v: any) => {
						if (v.meta.isAffix && !v.meta.isHide) {
							v.url = setTagsViewHighlight(v);
							state.tagsViewList.push({ ...v });
						}
					});
				}
			});
		});
		// 页面卸载时
		onUnmounted(() => {
			// 取消非本页面调用监听
			proxy.mittBus.off('onCurrentContextmenuClick', () => {});
			// 取消监听布局配置界面开启/关闭拖拽
			proxy.mittBus.off('openOrCloseSortable', () => {});
			// 取消监听布局配置开启 TagsView 共用
			proxy.mittBus.off('openShareTagsView', () => {});
			// 取消窗口 resize 监听
			window.removeEventListener('resize', onSortableResize);
		});
		// 页面更新时
		onBeforeUpdate(() => {
			tagsRefs.value = [];
		});
		// 页面加载时
		onMounted(() => {
			// 初始化 pinia 中的 tagsViewRoutes 列表
			getTagsViewRoutes();
			initSortable();
		});
		// 路由更新时（组件内生命钩子）
		onBeforeRouteUpdate(async (to) => {
			state.routeActive = setTagsViewHighlight(to);
			state.routePath = to.meta.isDynamic ? to.meta.isDynamicPath : to.path;
			await addTagsView(to.path, to);
			getTagsRefsIndex(getThemeConfig.value.isShareTagsView ? state.routePath : state.routeActive);
		});
		// 监听路由的变化，动态赋值给 tagsView
		watch(
			pinia.state,
			(val) => {
				if (val.tagsViewRoutes.tagsViewRoutes.length === state.tagsViewRoutesList.length) return false;
				getTagsViewRoutes();
			},
			{
				deep: true,
			}
		);
		return {
			isActive,
			onContextmenu,
			onTagsClick,
			tagsRefs,
			contextmenuRef,
			scrollbarRef,
			tagsUlRef,
			onHandleScroll,
			getThemeConfig,
			setTagsStyle,
			setTagsViewNameI18n,
			refreshCurrentTagsView,
			closeCurrentTagsView,
			onCurrentContextmenuClick,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.layout-navbars-tagsview {
	background-color: var(--el-color-white);
	border-bottom: 1px solid var(--next-border-color-light);
	position: relative;
	z-index: 4;
	::v-deep(.el-scrollbar__wrap) {
		overflow-x: auto !important;
	}
	&-ul {
		list-style: none;
		margin: 0;
		padding: 0;
		height: 34px;
		display: flex;
		align-items: center;
		color: var(--el-text-color-regular);
		font-size: 12px;
		white-space: nowrap;
		padding: 0 15px;
		&-li {
			height: 26px;
			line-height: 26px;
			display: flex;
			align-items: center;
			border: 1px solid var(--el-border-color-lighter);
			padding: 0 15px;
			margin-right: 5px;
			border-radius: 2px;
			position: relative;
			z-index: 0;
			cursor: pointer;
			justify-content: space-between;
			&:hover {
				background-color: var(--el-color-primary-light-9);
				color: var(--el-color-primary);
				border-color: var(--el-color-primary-light-5);
			}
			&-iconfont {
				position: relative;
				left: -5px;
				font-size: 12px;
			}
			&-icon {
				border-radius: 100%;
				position: relative;
				height: 14px;
				width: 14px;
				text-align: center;
				line-height: 14px;
				right: -5px;
				&:hover {
					color: var(--el-color-white);
					background-color: var(--el-color-primary-light-3);
				}
			}
			.layout-icon-active {
				display: block;
			}
			.layout-icon-three {
				display: none;
			}
		}
		.is-active {
			color: var(--el-color-white);
			background: var(--el-color-primary);
			border-color: var(--el-color-primary);
			transition: border-color 3s ease;
		}
	}
	// 风格4
	.tags-style-four {
		.layout-navbars-tagsview-ul-li {
			margin-right: 0 !important;
			border: none !important;
			position: relative;
			border-radius: 3px !important;
			.layout-icon-active {
				display: none;
			}
			.layout-icon-three {
				display: block;
			}
			&:hover {
				background: none !important;
			}
		}
		.is-active {
			background: none !important;
			color: var(--el-color-primary) !important;
		}
	}
	// 风格5
	.tags-style-five {
		align-items: flex-end;
		.tags-style-five-svg {
			-webkit-mask-box-image: url("data:image/svg+xml,%3Csvg width='68' height='34' viewBox='0 0 68 34' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='m27,0c-7.99582,0 -11.95105,0.00205 -12,12l0,6c0,8.284 -0.48549,16.49691 -8.76949,16.49691l54.37857,-0.11145c-8.284,0 -8.60908,-8.10146 -8.60908,-16.38546l0,-6c0.11145,-12.08445 -4.38441,-12 -12,-12l-13,0z' fill='%23409eff'/%3E%3C/svg%3E")
				12 27 15;
		}
		.layout-navbars-tagsview-ul-li {
			padding: 0 5px;
			border-width: 15px 27px 15px;
			border-style: solid;
			border-color: transparent;
			margin: 0 -15px;
			.layout-icon-active,
			.layout-navbars-tagsview-ul-li-iconfont,
			.layout-navbars-tagsview-ul-li-refresh {
				display: none;
			}
			.layout-icon-three {
				display: block;
			}
			&:hover {
				@extend .tags-style-five-svg;
				background: var(--el-color-primary-light-9);
				color: unset;
			}
		}
		.is-active {
			@extend .tags-style-five-svg;
			background: var(--el-color-primary-light-9) !important;
			color: var(--el-color-primary) !important;
			z-index: 1;
		}
	}
}
.layout-navbars-tagsview-shadow {
	box-shadow: rgb(0 21 41 / 4%) 0px 1px 4px;
}
</style>
