<template>
	<div class="layout-navbars-tagsview">
		<el-scrollbar ref="scrollbarRef" @wheel.native.prevent="onHandleScroll">
			<ul class="layout-navbars-tagsview-ul" :class="setTagsStyle" ref="tagsUlRef">
				<li
					v-for="(v, k) in tagsViewList"
					:key="k"
					class="layout-navbars-tagsview-ul-li"
					:data-name="v.name"
					:class="{ 'is-active': v.path === tagsRoutePath }"
					@contextmenu.prevent="onContextmenu(v, $event)"
					@click="onTagsClick(v, k)"
					ref="tagsRefs"
				>
					<i class="iconfont icon-webicon318 layout-navbars-tagsview-ul-li-iconfont font14" v-if="v.path === tagsRoutePath"></i>
					<i
						class="layout-navbars-tagsview-ul-li-iconfont font14 is-tagsview-icon"
						:class="v.meta.icon"
						v-if="v.path !== tagsRoutePath && getThemeConfig.isTagsviewIcon"
					></i>
					<span>{{ $t(v.meta.title) }}</span>
					<i
						class="el-icon-refresh-right layout-navbars-tagsview-ul-li-icon ml5"
						v-if="v.path === tagsRoutePath"
						@click.stop="refreshCurrentTagsView(v.path)"
					></i>
					<i class="el-icon-close layout-navbars-tagsview-ul-li-icon ml5" v-if="!v.meta.isAffix" @click.stop="closeCurrentTagsView(v.path)"></i>
				</li>
			</ul>
		</el-scrollbar>
		<Contextmenu :dropdown="tagsDropdown" ref="tagsContextmenu" @currentContextmenuClick="onCurrentContextmenuClick" />
	</div>
</template>

<script>
import Contextmenu from '@/layout/navBars/tagsView/contextmenu';
import { Session } from '@/utils/storage.js';
export default {
	name: 'tagsView',
	components: { Contextmenu },
	data() {
		return {
			userInfo: {},
			tagsViewList: [],
			tagsDropdown: {
				x: '',
				y: '',
			},
			tagsRefsIndex: 0,
			tagsRoutePath: this.$route.path,
			tagsViewRoutesList: [],
		};
	},
	computed: {
		// 获取布局配置信息
		getThemeConfig() {
			return this.$store.state.themeConfig.themeConfig;
		},
		// 动态设置 tagsView 风格样式
		setTagsStyle() {
			return this.$store.state.themeConfig.themeConfig.tagsStyle;
		},
	},
	created() {
		// 监听非本页面调用 0 刷新当前，1 关闭当前，2 关闭其它，3 关闭全部
		this.bus.$on('onCurrentContextmenuClick', (data) => {
			this.onCurrentContextmenuClick(data);
		});
	},
	mounted() {
		this.getTagsViewRoutes();
	},
	methods: {
		// 获取路由信息
		getRoutesList() {
			return this.$store.state.routesList.routesList;
		},
		// 当前的 tagsView 项点击时
		onTagsClick(v, k) {
			this.tagsRoutePath = v.path;
			this.tagsRefsIndex = k;
			this.$router.push(v);
		},
		// 获取 tagsView 的下标：用于处理 tagsView 点击时的横向滚动
		getTagsRefsIndex(path) {
			if (this.tagsViewList.length > 0) {
				this.tagsRefsIndex = this.tagsViewList.findIndex((item) => item.path === path);
			}
		},
		// 鼠标滚轮滚动
		onHandleScroll(e) {
			this.$refs.scrollbarRef.$refs.wrap.scrollLeft += e.wheelDelta / 4;
		},
		// tagsView 横向滚动
		tagsViewmoveToCurrentTag() {
			this.$nextTick(() => {
				const tagsRefs = this.$refs.tagsRefs;
				if (tagsRefs.length <= 0) return false;
				// 当前 li 元素
				let liDom = tagsRefs[this.tagsRefsIndex];
				// 当前 li 元素下标
				let liIndex = this.tagsRefsIndex;
				// 当前 ul 下 li 元素总长度
				let liLength = tagsRefs.length;
				// 最前 li
				let liFirst = tagsRefs[0];
				// 最后 li
				let liLast = tagsRefs[tagsRefs.length - 1];
				// 当前滚动条的值
				let scrollRefs = this.$refs.scrollbarRef.$refs.wrap;
				// 当前滚动条滚动宽度
				let scrollS = scrollRefs.scrollWidth;
				// 当前滚动条偏移宽度
				let offsetW = scrollRefs.offsetWidth;
				// 当前滚动条偏移距离
				let scrollL = scrollRefs.scrollLeft;
				// 上一个 tags li dom
				let liPrevTag = tagsRefs[this.tagsRefsIndex - 1];
				// 下一个 tags li dom
				let liNextTag = tagsRefs[this.tagsRefsIndex + 1];
				// 上一个 tags li dom 的偏移距离
				let beforePrevL = '';
				// 下一个 tags li dom 的偏移距离
				let afterNextL = '';
				if (liDom === liFirst) {
					// 头部
					scrollRefs.scrollLeft = 0;
				} else if (liDom === liLast) {
					// 尾部
					scrollRefs.scrollLeft = scrollS - offsetW;
				} else {
					// 非头/尾部
					if (liIndex === 0) beforePrevL = liFirst?.offsetLeft - 5;
					else beforePrevL = liPrevTag?.offsetLeft - 5;
					if (liIndex === liLength) afterNextL = liLast?.offsetLeft + liLast.offsetWidth + 5;
					else afterNextL = liNextTag?.offsetLeft + liNextTag.offsetWidth + 5;
					if (afterNextL > scrollL + offsetW) {
						scrollRefs.scrollLeft = afterNextL - offsetW;
					} else if (beforePrevL < scrollL) {
						scrollRefs.scrollLeft = beforePrevL;
					}
				}
				// 更新滚动条，防止不出现
				this.updateScrollbar();
			});
		},
		// 更新滚动条显示
		updateScrollbar() {
			this.$refs.scrollbarRef.update();
		},
		// 递归查找当前路径下的组件信息
		filterCurrentMenu(arr, currentPath, callback) {
			arr.map((item) => {
				if (item.path === currentPath) {
					callback(item);
					return false;
				}
				item = Object.assign({}, item);
				if (item.children) {
					item.children = this.filterCurrentMenu(item.children, currentPath, callback);
				}
			});
		},
		// 数组对象去重
		duplicate(arr) {
			let newobj = {};
			arr = arr.reduce((preVal, curVal) => {
				newobj[curVal.path] ? '' : (newobj[curVal.path] = preVal.push(curVal));
				return preVal;
			}, []);
			return arr;
		},
		// 获取 vuex 中的 tagsViewRoutes 列表
		getTagsViewRoutes() {
			this.tagsRoutePath = this.$route.path;
			this.tagsViewList = [];
			if (!this.$store.state.themeConfig.themeConfig.isCacheTagsView) Session.remove('tagsViewList');
			this.tagsViewRoutesList = this.$store.state.tagsViewRoutes.tagsViewRoutes;
			this.initTagsViewList();
		},
		// 存储 tagsViewList 到浏览器临时缓存中，页面刷新时，保留记录
		addBrowserSetSession(tagsViewList) {
			Session.set('tagsViewList', tagsViewList);
		},
		// 初始化设置了 tagsView 数据
		initTagsViewList() {
			if (Session.get('tagsViewList') && this.$store.state.themeConfig.themeConfig.isCacheTagsView) {
				this.tagsViewList = Session.get('tagsViewList');
			} else {
				this.tagsViewRoutesList.map((v) => {
					if (v.meta.isAffix && !v.meta.isHide) this.tagsViewList.push({ ...v });
				});
				this.addTagsView(this.$route.path);
			}
			// 初始化当前元素(li)的下标
			this.getTagsRefsIndex(this.$route.path);
			// 添加初始化横向滚动条移动到对应位置
			this.tagsViewmoveToCurrentTag();
		},
		// 添加 tagsView：未设置隐藏（isHide）也添加到在 tagsView 中
		addTagsView(path, to) {
			if (this.tagsViewList.some((v) => v.path === path)) return false;
			const item = this.tagsViewRoutesList.find((v) => v.path === path);
			if (item.meta.isLink && !item.meta.isIframe) return false;
			item.query = to?.query ? to?.query : this.$route.query;
			this.tagsViewList.push({ ...item });
			this.addBrowserSetSession(this.tagsViewList);
		},
		// 右键菜单点击时显示菜单列表
		onContextmenu(v, e) {
			let { clientX, clientY } = e;
			this.tagsDropdown.x = clientX;
			this.tagsDropdown.y = clientY;
			this.$refs.tagsContextmenu.openContextmenu(v);
		},
		// 当前项右键菜单点击
		onCurrentContextmenuClick(data) {
			let { id, path } = data;
			let currentTag = this.tagsViewList.find((v) => v.path === path);
			switch (id) {
				case 0:
					this.refreshCurrentTagsView(path);
					this.$router.push({ path, query: currentTag.query });
					break;
				case 1:
					this.closeCurrentTagsView(path);
					break;
				case 2:
					this.$router.push({ path, query: currentTag.query });
					this.closeOtherTagsView(path);
					break;
				case 3:
					this.closeAllTagsView(path);
					break;
			}
		},
		// 1、刷新当前 tagsView：
		refreshCurrentTagsView(path) {
			this.bus.$emit('onTagsViewRefreshRouterView', path);
		},
		// 2、关闭当前 tagsView：当前项 `tags-view` icon 关闭时点击，如果是设置了固定的（isAffix），不可以关闭
		closeCurrentTagsView(path) {
			this.tagsViewList.map((v, k, arr) => {
				if (!v.meta.isAffix) {
					if (v.path === path) {
						this.tagsViewList.splice(k, 1);
						setTimeout(() => {
							// 最后一个
							if (this.tagsViewList.length === k) this.$router.push({ path: arr[arr.length - 1].path, query: arr[arr.length - 1].query });
							// 否则，跳转到下一个
							else this.$router.push({ path: arr[k].path, query: arr[k].query });
						}, 0);
					}
				}
			});
			this.addBrowserSetSession(this.tagsViewList);
		},
		// 3、关闭其它 tagsView：如果是设置了固定的（isAffix），不进行关闭
		closeOtherTagsView(path) {
			this.tagsViewList = [];
			this.tagsViewRoutesList.map((v) => {
				if (v.meta.isAffix && !v.meta.isHide) this.tagsViewList.push({ ...v });
			});
			this.addTagsView(path);
		},
		// 4、关闭全部 tagsView：如果是设置了固定的（isAffix），不进行关闭
		closeAllTagsView(path) {
			this.tagsViewList = [];
			this.tagsViewRoutesList.map((v) => {
				if (v.meta.isAffix && !v.meta.isHide) {
					this.tagsViewList.push({ ...v });
					if (this.tagsViewList.some((v) => v.path === path)) this.$router.push({ path, query: this.$route.query });
					else this.$router.push({ path: v.path, query: this.$route.query });
				}
			});
			this.addBrowserSetSession(this.tagsViewList);
		},
	},
	watch: {
		// 监听路由变化
		$route: {
			handler(to) {
				this.tagsRoutePath = to.path;
				this.addTagsView(to.path, to);
				this.getTagsRefsIndex(to.path);
				this.tagsViewmoveToCurrentTag();
			},
			deep: true,
		},
	},
	destroyed() {
		// 取消非本页面调用监听（fun/tagsView）
		this.bus.$off('onCurrentContextmenuClick');
	},
};
</script>

<style scoped lang="scss">
.layout-navbars-tagsview {
	flex: 1;
	background-color: #ffffff;
	border-bottom: 1px solid #f1f2f3;
	& ::v-deep .is-vertical {
		display: none !important;
	}
	&-ul {
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 34px;
		display: flex;
		align-items: center;
		white-space: nowrap;
		color: #606266;
		font-size: 12px;
		padding: 0 15px;
		&-li {
			height: 26px;
			line-height: 26px;
			display: flex;
			align-items: center;
			border: 1px solid #ebeef5;
			padding: 0 12px 0 15px;
			margin-right: 5px;
			border-radius: 2px;
			position: relative;
			z-index: 0;
			cursor: pointer;
			justify-content: space-between;
			transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
			&::before {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: var(--color-primary);
				z-index: -1;
				opacity: 0;
				transform: scale3d(0.7, 1, 1);
				transition: transform 0.3s, opacity 0.3s;
				transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
			}
			&:hover {
				color: #ffffff;
				transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
				border-color: transparent;
				&::before {
					opacity: 1;
					transform: translate3d(0, 0, 0);
					border-radius: 2px;
				}
				.is-tagsview-icon {
					color: #ffffff;
					transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
				}
			}
			&-iconfont {
				position: relative;
				left: -5px;
				top: 1px;
				color: #ffffff;
			}
			&-icon {
				border-radius: 100%;
				position: relative;
				height: 14px;
				width: 14px;
				text-align: center;
				line-height: 14px;
				top: 1px;
			}
			.is-tagsview-icon {
				color: #606266;
				transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
			}
		}
		.is-active {
			color: #ffffff;
			transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
			border-color: transparent;
			&::before {
				opacity: 1;
				transform: translate3d(0, 0, 0);
				border-radius: 2px;
			}
		}
	}
	& ::-webkit-scrollbar {
		display: none !important;
	}
	// // 风格2
	// .tags-style-two {
	// }
	// // 风格3
	// .tags-style-three {
	// }
	// // 风格4
	// .tags-style-four {
	// }
}
</style>
