<template>
	<div class="layout-view-bg-white flex" :style="{ height: `calc(100vh - ${setViewHeight}` }">
		<div class="flex-margin color-primary">
			<div>paramsDynamicDetails</div>
			<div class="mt10 mb10">路径：path: {{ params.path }}</div>
			<div>参数：params: {{ params.params }}</div>
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
	name: 'paramsDynamicDetails',
	setup() {
		const storesTagsViewRoutes = useTagsViewRoutes();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
		const route = useRoute();
		const state = reactive({
			params: {
				path: '',
				params: '',
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
