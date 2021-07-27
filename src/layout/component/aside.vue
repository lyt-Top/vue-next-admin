<template>
	<template v-if="clientWidth > 1000">
		<el-aside class="layout-aside" :class="setCollapseWidth" v-show="!isCurrenFullscreen">
			<Logo v-if="setShowLogo" />
			<el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef">
				<Vertical :menuList="menuList" :class="setCollapseWidth" />
			</el-scrollbar>
		</el-aside>
	</template>
	<template v-else>
		<el-drawer v-model="getThemeConfig.isCollapse" :with-header="false" direction="ltr" size="220px">
			<el-aside class="layout-aside w100 h100">
				<Logo v-if="setShowLogo" />
				<el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef">
					<Vertical :menuList="menuList" />
				</el-scrollbar>
			</el-aside>
		</el-drawer>
	</template>
</template>

<script lang="ts">
import { toRefs, reactive, computed, watch, getCurrentInstance, onBeforeMount } from 'vue';
import { useStore } from '/@/store/index';
import Logo from '/@/layout/logo/index.vue';
import Vertical from '/@/layout/navMenu/vertical.vue';
export default {
	name: 'layoutAside',
	components: { Logo, Vertical },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const state: any = reactive({
			menuList: [],
			clientWidth: '',
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 获取卡片全屏信息
		const isCurrenFullscreen = computed(() => {
			return store.state.tagsViewRoutes.isCurrenFullscreen;
		});
		// 设置菜单展开/收起时的宽度
		const setCollapseWidth = computed(() => {
			let { layout, isCollapse, menuBar } = store.state.themeConfig.themeConfig;
			let asideBrColor = menuBar === '#FFFFFF' || menuBar === '#FFF' || menuBar === '#fff' || menuBar === '#ffffff' ? 'layout-el-aside-br-color' : '';
			if (layout === 'columns') {
				// 分栏布局，菜单收起时宽度给 1px
				if (isCollapse) {
					return ['layout-aside-width1', asideBrColor];
				} else {
					return ['layout-aside-width-default', asideBrColor];
				}
			} else {
				// 其它布局给 64px
				if (isCollapse) {
					return ['layout-aside-width64', asideBrColor];
				} else {
					return ['layout-aside-width-default', asideBrColor];
				}
			}
		});
		// 设置显示/隐藏 logo
		const setShowLogo = computed(() => {
			let { layout, isShowLogo } = store.state.themeConfig.themeConfig;
			return (isShowLogo && layout === 'defaults') || (isShowLogo && layout === 'columns');
		});
		// 设置/过滤路由（非静态路由/是否显示在菜单中）
		const setFilterRoutes = () => {
			if (store.state.themeConfig.themeConfig.layout === 'columns') return false;
			state.menuList = filterRoutesFun(store.state.routesList.routesList);
		};
		// 路由过滤递归函数
		const filterRoutesFun = (arr: Array<object>) => {
			return arr
				.filter((item: any) => !item.meta.isHide)
				.map((item: any) => {
					item = Object.assign({}, item);
					if (item.children) item.children = filterRoutesFun(item.children);
					return item;
				});
		};
		// 设置菜单导航是否固定（移动端）
		const initMenuFixed = (clientWidth: number) => {
			state.clientWidth = clientWidth;
		};
		// 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
		watch(store.state.themeConfig.themeConfig, (val) => {
			if (val.isShowLogoChange !== val.isShowLogo) {
				if (!proxy.$refs.layoutAsideScrollbarRef) return false;
				proxy.$refs.layoutAsideScrollbarRef.update();
			}
		});
		// 监听vuex值的变化，动态赋值给菜单中
		watch(store.state, (val) => {
			let { layout, isClassicSplitMenu } = val.themeConfig.themeConfig;
			if (layout === 'classic' && isClassicSplitMenu) return false;
			setFilterRoutes();
		});
		// 页面加载前
		onBeforeMount(() => {
			initMenuFixed(document.body.clientWidth);
			setFilterRoutes();
			// 此界面不需要取消监听(proxy.mittBus.off('setSendColumnsChildren))
			// 因为切换布局时有的监听需要使用，取消了监听，某些操作将不生效
			proxy.mittBus.on('setSendColumnsChildren', (res: any) => {
				state.menuList = res.children;
			});
			proxy.mittBus.on('setSendClassicChildren', (res: any) => {
				let { layout, isClassicSplitMenu } = store.state.themeConfig.themeConfig;
				if (layout === 'classic' && isClassicSplitMenu) {
					state.menuList = [];
					state.menuList = res.children;
				}
			});
			proxy.mittBus.on('getBreadcrumbIndexSetFilterRoutes', () => {
				setFilterRoutes();
			});
			proxy.mittBus.on('layoutMobileResize', (res: any) => {
				initMenuFixed(res.clientWidth);
			});
		});
		return {
			setCollapseWidth,
			setShowLogo,
			getThemeConfig,
			isCurrenFullscreen,
			...toRefs(state),
		};
	},
};
</script>
