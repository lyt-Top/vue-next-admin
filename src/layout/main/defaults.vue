<template>
	<el-container class="layout-container">
		<Asides />
		<el-container class="flex-center" :class="{ 'layout-backtop': !isFixedHeader }">
			<Headers v-if="isFixedHeader" />
			<el-scrollbar ref="layoutDefaultsScrollbarRef" :class="{ 'layout-backtop': isFixedHeader }">
				<Headers v-if="!isFixedHeader" />
				<Mains />
			</el-scrollbar>
		</el-container>
		<el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
import { computed, getCurrentInstance, watch, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import Asides from '/@/layout/component/aside.vue';
import Headers from '/@/layout/component/header.vue';
import Mains from '/@/layout/component/main.vue';

export default defineComponent({
	name: 'layoutDefaults',
	components: { Asides, Headers, Mains },
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const route = useRoute();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const isFixedHeader = computed(() => {
			return themeConfig.value.isFixedHeader;
		});
		// 监听路由的变化
		watch(
			() => route.path,
			() => {
				proxy.$refs.layoutDefaultsScrollbarRef.wrap$.scrollTop = 0;
			}
		);
		return {
			isFixedHeader,
		};
	},
});
</script>
