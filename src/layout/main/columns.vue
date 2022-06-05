<template>
	<el-container class="layout-container">
		<ColumnsAside />
		<div class="layout-columns-warp">
			<Asides />
			<el-container class="flex-center layout-backtop" :class="{ 'layout-backtop': !isFixedHeader }">
				<Headers v-if="isFixedHeader" />
				<el-scrollbar :class="{ 'layout-backtop': isFixedHeader }">
					<Headers v-if="!isFixedHeader" />
					<Mains />
				</el-scrollbar>
			</el-container>
		</div>
		<el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import Asides from '/@/layout/component/aside.vue';
import Headers from '/@/layout/component/header.vue';
import Mains from '/@/layout/component/main.vue';
import ColumnsAside from '/@/layout/component/columnsAside.vue';

export default defineComponent({
	name: 'layoutColumns',
	components: { Asides, Headers, Mains, ColumnsAside },
	setup() {
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const isFixedHeader = computed(() => {
			return themeConfig.value.isFixedHeader;
		});
		return {
			isFixedHeader,
		};
	},
});
</script>
