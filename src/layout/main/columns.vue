<template>
	<el-container class="layout-container">
		<ColumnsAside />
		<div class="layout-columns-warp">
			<Aside />
			<el-container class="flex-center layout-backtop">
				<Header v-if="isFixedHeader" />
				<el-scrollbar>
					<Header v-if="!isFixedHeader" />
					<Main />
				</el-scrollbar>
			</el-container>
		</div>
		<el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script>
import Aside from '@/layout/component/aside.vue';
import Header from '@/layout/component/header.vue';
import Main from '@/layout/component/main.vue';
import ColumnsAside from '@/layout/component/columnsAside.vue';
export default {
	name: 'layoutColumns',
	components: { Aside, Header, Main, ColumnsAside },
	computed: {
		// 是否开启固定 header
		isFixedHeader() {
			return this.$store.state.themeConfig.themeConfig.isFixedHeader;
		},
	},
};
</script>
