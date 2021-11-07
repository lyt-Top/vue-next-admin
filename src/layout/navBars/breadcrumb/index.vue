<template>
	<div class="layout-navbars-breadcrumb-index">
		<Logo v-if="setIsShowLogo" />
		<Breadcrumb />
		<Horizontal :menuList="menuList" v-if="isLayoutTransverse" />
		<User />
	</div>
</template>

<script>
import Breadcrumb from '@/layout/navBars/breadcrumb/breadcrumb.vue';
import User from '@/layout/navBars/breadcrumb/user.vue';
import Logo from '@/layout/logo/index.vue';
import Horizontal from '@/layout/navMenu/horizontal.vue';
export default {
	name: 'layoutNavBars',
	components: { Breadcrumb, User, Logo, Horizontal },
	data() {
		return {
			menuList: [],
		};
	},
	computed: {
		// 设置 logo 是否显示
		setIsShowLogo() {
			let { isShowLogo, layout } = this.$store.state.themeConfig.themeConfig;
			return (isShowLogo && layout === 'classic') || (isShowLogo && layout === 'transverse');
		},
		// 设置是否显示横向菜单
		isLayoutTransverse() {
			let { layout, isClassicSplitMenu } = this.$store.state.themeConfig.themeConfig;
			return layout === 'transverse' || (isClassicSplitMenu && layout === 'classic');
		},
	},
	mounted() {
		this.setFilterRoutes();
	},
	methods: {
		// 设置路由的过滤
		setFilterRoutes() {
			this.menuList = this.filterRoutesFun(this.$store.state.routesList.routesList);
		},
		// 设置路由的过滤递归函数
		filterRoutesFun(arr) {
			return arr
				.filter((item) => !item.meta.isHide)
				.map((item) => {
					item = Object.assign({}, item);
					if (item.children) item.children = this.filterRoutesFun(item.children);
					return item;
				});
		},
	},
	watch: {
		// 监听 vuex 数据变化
		'$store.state': {
			handler(val) {
				if (val.routesList.routesList.length === this.menuList.length) return false;
				this.setFilterRoutes();
			},
			deep: true,
		},
	},
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-index {
	height: 50px;
	display: flex;
	align-items: center;
	padding-right: 15px;
	background: var(--bg-topBar);
	overflow: hidden;
	border-bottom: 1px solid #f1f2f3;
}
</style>
