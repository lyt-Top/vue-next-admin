<template>
	<el-menu
		router
		background-color="transparent"
		:default-active="defaultActive"
		:collapse="setIsCollapse"
		:unique-opened="getThemeConfig.isUniqueOpened"
		:collapse-transition="false"
	>
		<template v-for="val in menuList">
			<el-submenu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
				<template slot="title">
					<i :class="val.meta.icon ? val.meta.icon : ''"></i>
					<span>{{ $t(val.meta.title) }}</span>
				</template>
				<SubItem :chil="val.children" />
			</el-submenu>
			<el-menu-item :index="val.path" :key="val.path" v-else>
				<i :class="val.meta.icon ? val.meta.icon : ''"></i>
				<template slot="title" v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
					<span>{{ $t(val.meta.title) }}</span>
				</template>
				<template slot="title" v-else>
					<a :href="val.meta.isLink" target="_blank">{{ $t(val.meta.title) }}</a></template
				>
			</el-menu-item>
		</template>
	</el-menu>
</template>

<script>
import SubItem from '@/layout/navMenu/subItem.vue';
export default {
	name: 'navMenuVertical',
	components: { SubItem },
	props: {
		menuList: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		return {
			defaultActive: this.$route.path,
		};
	},
	computed: {
		// 获取布局配置信息
		getThemeConfig() {
			return this.$store.state.themeConfig.themeConfig;
		},
		// 设置左侧菜单是否展开/收起
		setIsCollapse() {
			return document.body.clientWidth < 1000 ? false : this.$store.state.themeConfig.themeConfig.isCollapse;
		},
	},
	watch: {
		// 监听路由的变化
		$route: {
			handler(to) {
				this.defaultActive = to.path;
				const clientWidth = document.body.clientWidth;
				if (clientWidth < 1000) this.$store.state.themeConfig.themeConfig.isCollapse = false;
			},
			deep: true,
		},
	},
};
</script>
