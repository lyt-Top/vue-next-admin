<template>
	<el-container class="layout-container">
		<Aside />
		<el-container class="flex-center layout-backtop">
			<Header v-if="isFixedHeader" />
			<el-scrollbar ref="layoutDefaultsScrollbarRef">
				<Header v-if="!isFixedHeader" />
				<Main />
			</el-scrollbar>
		</el-container>
		<el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script>
import Aside from '@/views/layout/component/aside.vue';
import Header from '@/views/layout/component/header.vue';
import Main from '@/views/layout/component/main.vue';
export default {
	name: 'layoutDefaults',
	components: { Aside, Header, Main },
	data() {
		return {};
	},
	computed: {
		// 是否开启固定 header
		isFixedHeader() {
			return this.$store.state.themeConfig.themeConfig.isFixedHeader;
		},
	},
	watch: {
		// 监听路由的变化
		$route: {
			handler() {
				this.$refs.layoutDefaultsScrollbarRef.wrap.scrollTop = 0;
			},
			deep: true,
		},
	},
};
</script>
