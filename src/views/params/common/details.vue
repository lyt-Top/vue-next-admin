<template>
	<div class="layout-view-bg-white flex" :style="{ height: `calc(100vh - ${setViewHeight}` }">
		<div class="flex-margin color-primary">
			<div>paramsCommonDetails</div>
			<div class="mt10 mb10">路径：path: {{ params.path }}</div>
			<div>参数：query: {{ params.query }}</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';

export default defineComponent({
	name: 'paramsCommonDetails',
	setup() {
		const route = useRoute();
		const storesTagsViewRoutes = useTagsViewRoutes();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
		const state = reactive({
			params: {
				path: '',
				query: '',
			},
		});
		// 设置 view 的高度
		const setViewHeight = computed(() => {
			let { isTagsview } = themeConfig.value;
			if (isTagsViewCurrenFull.value) {
				return `30px`;
			} else {
				if (isTagsview) return `114px`;
				else return `80px`;
			}
		});
		// 页面加载时
		onMounted(() => {
			state.params = <any>route;
		});
		return {
			setViewHeight,
			...toRefs(state),
		};
	},
});
</script>
