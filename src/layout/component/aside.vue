<template>
	<div class="h100" v-show="!isTagsViewCurrenFull">
		<el-aside class="layout-aside" :class="setCollapseStyle">
			<Logo v-if="setShowLogo" />
			<el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef" @mouseenter="onAsideEnterLeave(true)" @mouseleave="onAsideEnterLeave(false)">
				<Vertical :menuList="menuList" />
			</el-scrollbar>
		</el-aside>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, watch, getCurrentInstance, onBeforeMount, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import pinia from '/@/stores/index';
import { useRoutesList } from '/@/stores/routesList';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import Logo from '/@/layout/logo/index.vue';
import Vertical from '/@/layout/navMenu/vertical.vue';

export default defineComponent({
	name: 'layoutAside',
	components: { Logo, Vertical },
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const stores = useRoutesList();
		const storesThemeConfig = useThemeConfig();
		const storesTagsViewRoutes = useTagsViewRoutes();
		const { routesList } = storeToRefs(stores);
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
		const state = reactive({
			menuList: [],
			clientWidth: 0,
		});
		// 设置菜单展开/收起时的宽度
		const setCollapseStyle = computed(() => {
			const { layout, isCollapse, menuBar } = themeConfig.value;
			const asideBrTheme = ['#FFFFFF', '#FFF', '#fff', '#ffffff'];
			const asideBrColor = asideBrTheme.includes(menuBar) ? 'layout-el-aside-br-color' : '';
			// 判断是否是手机端
			if (state.clientWidth <= 1000) {
				if (isCollapse) {
					document.body.setAttribute('class', 'el-popup-parent--hidden');
					const asideEle = document.querySelector('.layout-container') as HTMLElement;
					const modeDivs = document.createElement('div');
					modeDivs.setAttribute('class', 'layout-aside-mobile-mode');
					asideEle.appendChild(modeDivs);
					modeDivs.addEventListener('click', closeLayoutAsideMobileMode);
					return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-open'];
				} else {
					// 关闭弹窗
					closeLayoutAsideMobileMode();
					return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-close'];
				}
			} else {
				if (layout === 'columns') {
					// 分栏布局，菜单收起时宽度给 1px
					if (isCollapse) return [asideBrColor, 'layout-aside-pc-1'];
					else return [asideBrColor, 'layout-aside-pc-220'];
				} else {
					// 其它布局给 64px
					if (isCollapse) return [asideBrColor, 'layout-aside-pc-64'];
					else return [asideBrColor, 'layout-aside-pc-220'];
				}
			}
		});
		// 关闭移动端蒙版
		const closeLayoutAsideMobileMode = () => {
			const el = document.querySelector('.layout-aside-mobile-mode');
			el?.setAttribute('style', 'animation: error-img-two 0.3s');
			setTimeout(() => {
				el?.parentNode?.removeChild(el);
			}, 300);
			const clientWidth = document.body.clientWidth;
			if (clientWidth < 1000) themeConfig.value.isCollapse = false;
			document.body.setAttribute('class', '');
		};
		// 设置显示/隐藏 logo
		const setShowLogo = computed(() => {
			let { layout, isShowLogo } = themeConfig.value;
			return (isShowLogo && layout === 'defaults') || (isShowLogo && layout === 'columns');
		});
		// 设置/过滤路由（非静态路由/是否显示在菜单中）
		const setFilterRoutes = () => {
			if (themeConfig.value.layout === 'columns') return false;
			(state.menuList as any) = filterRoutesFun(routesList.value);
		};
		// 路由过滤递归函数
		const filterRoutesFun = (arr: Array<string>) => {
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
		// 鼠标移入、移出
		const onAsideEnterLeave = (bool: Boolean) => {
			let { layout } = themeConfig.value;
			if (layout !== 'columns') return false;
			if (!bool) proxy.mittBus.emit('restoreDefault');
			stores.setColumnsMenuHover(bool);
		};
		// 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
		watch(themeConfig.value, (val) => {
			if (val.isShowLogoChange !== val.isShowLogo) {
				if (!proxy.$refs.layoutAsideScrollbarRef) return false;
				proxy.$refs.layoutAsideScrollbarRef.update();
			}
		});
		// 监听vuex值的变化，动态赋值给菜单中
		watch(
			pinia.state,
			(val) => {
				let { layout, isClassicSplitMenu } = val.themeConfig.themeConfig;
				if (layout === 'classic' && isClassicSplitMenu) return false;
				setFilterRoutes();
			},
			{
				deep: true,
			}
		);
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
				let { layout, isClassicSplitMenu } = themeConfig.value;
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
				closeLayoutAsideMobileMode();
			});
		});
		return {
			setCollapseStyle,
			setShowLogo,
			isTagsViewCurrenFull,
			onAsideEnterLeave,
			...toRefs(state),
		};
	},
});
</script>
