<template>
	<div class="layout-navbars-container">
		<BreadcrumbIndex />
		<TagsView v-if="setShowTagsView" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import BreadcrumbIndex from '/@/layout/navBars/breadcrumb/index.vue';
import TagsView from '/@/layout/navBars/tagsView/tagsView.vue';

export default defineComponent({
	name: 'layoutNavBars',
	components: { BreadcrumbIndex, TagsView },
	setup() {
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		// 是否显示 tagsView
		const setShowTagsView = computed(() => {
			let { layout, isTagsview } = themeConfig.value;
			return layout !== 'classic' && isTagsview;
		});
		return {
			setShowTagsView,
		};
	},
});
</script>

<style scoped lang="scss">
.layout-navbars-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}
</style>
