<template>
	<el-container class="layout-container">
		<ColumnsAside />
		<div class="layout-columns-warp">
			<Aside />
			<el-container class="flex-center layout-backtop" :class="{ 'layout-backtop': !isFixedHeader }">
				<Header v-if="isFixedHeader" />
				<el-scrollbar :class="{ 'layout-backtop': isFixedHeader }">
					<Header v-if="!isFixedHeader" />
					<Main />
				</el-scrollbar>
			</el-container>
		</div>
		<el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from '/@/store/index';
import Aside from '/@/layout/component/aside.vue';
import Header from '/@/layout/component/header.vue';
import Main from '/@/layout/component/main.vue';
import ColumnsAside from '/@/layout/component/columnsAside.vue';
export default {
	name: 'layoutColumns',
	components: { Aside, Header, Main, ColumnsAside },
	setup() {
		const store = useStore();
		const isFixedHeader = computed(() => {
			return store.state.themeConfig.themeConfig.isFixedHeader;
		});
		return {
			isFixedHeader,
		};
	},
};
</script>
