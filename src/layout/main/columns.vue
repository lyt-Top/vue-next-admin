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

<script setup name="layoutColumns">
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import Aside from '/@/layout/component/aside.vue';
import Header from '/@/layout/component/header.vue';
import Main from '/@/layout/component/main.vue';
import ColumnsAside from '/@/layout/component/columnsAside.vue';

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
// 是否固定顶栏
const isFixedHeader = computed(() => {
	return themeConfig.value.isFixedHeader;
});
</script>
