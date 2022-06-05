<template>
	<div class="layout-navbars-breadcrumb-index">
		<Logo v-if="setIsShowLogo" />
		<Breadcrumb />
		<Horizontal :menuList="menuList" v-if="isLayoutTransverse" />
		<User />
	</div>
</template>

<script lang="ts">
import { computed, reactive, toRefs, onMounted, onUnmounted, getCurrentInstance, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useRoutesList } from '/@/stores/routesList';
import { useThemeConfig } from '/@/stores/themeConfig';
import Breadcrumb from '/@/layout/navBars/breadcrumb/breadcrumb.vue';
import User from '/@/layout/navBars/breadcrumb/user.vue';
import Logo from '/@/layout/logo/index.vue';
import Horizontal from '/@/layout/navMenu/horizontal.vue';

// 定义接口来定义对象的类型
interface IndexState {
	menuList: object[];
}

export default defineComponent({
	name: 'layoutBreadcrumbIndex',
	components: { Breadcrumb, User, Logo, Horizontal },
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const stores = useRoutesList();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const { routesList } = storeToRefs(stores);
		const route = useRoute();
		const state = reactive<IndexState>({
			menuList: [],
		});
		// 设置 logo 显示/隐藏
		const setIsShowLogo = computed(() => {
			let { isShowLogo, layout } = themeConfig.value;
			return (isShowLogo && layout === 'classic') || (isShowLogo && layout === 'transverse');
		});
		// 设置是否显示横向导航菜单
		const isLayoutTransverse = computed(() => {
			let { layout, isClassicSplitMenu } = themeConfig.value;
			return layout === 'transverse' || (isClassicSplitMenu && layout === 'classic');
		});
		// 设置/过滤路由（非静态路由/是否显示在菜单中）
		const setFilterRoutes = () => {
			let { layout, isClassicSplitMenu } = themeConfig.value;
			if (layout === 'classic' && isClassicSplitMenu) {
				state.menuList = delClassicChildren(filterRoutesFun(routesList.value));
				const resData = setSendClassicChildren(route.path);
				proxy.mittBus.emit('setSendClassicChildren', resData);
			} else {
				state.menuList = filterRoutesFun(routesList.value);
			}
		};
		// 设置了分割菜单时，删除底下 children
		const delClassicChildren = (arr: Array<object>) => {
			arr.map((v: any) => {
				if (v.children) delete v.children;
			});
			return arr;
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
		// 传送当前子级数据到菜单中
		const setSendClassicChildren = (path: string) => {
			const currentPathSplit = path.split('/');
			let currentData: any = {};
			filterRoutesFun(routesList.value).map((v, k) => {
				if (v.path === `/${currentPathSplit[1]}`) {
					v['k'] = k;
					currentData['item'] = [{ ...v }];
					currentData['children'] = [{ ...v }];
					if (v.children) currentData['children'] = v.children;
				}
			});
			return currentData;
		};
		// 页面加载时
		onMounted(() => {
			setFilterRoutes();
			proxy.mittBus.on('getBreadcrumbIndexSetFilterRoutes', () => {
				setFilterRoutes();
			});
		});
		// 页面卸载时
		onUnmounted(() => {
			proxy.mittBus.off('getBreadcrumbIndexSetFilterRoutes', () => {});
		});
		return {
			setIsShowLogo,
			isLayoutTransverse,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-index {
	height: 50px;
	display: flex;
	align-items: center;
	background: var(--next-bg-topBar);
	border-bottom: 1px solid var(--next-border-color-light);
}
</style>
