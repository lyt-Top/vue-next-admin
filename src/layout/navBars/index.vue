<template>
	<div class="layout-navbars-container">
		<BreadcrumbIndex />
		<TagsView v-if="setShowTagsView" />
	</div>
</template>

<script setup name="layoutNavBars">
import BreadcrumbIndex from '/@/layout/navBars/breadcrumb/index.vue';
import TagsView from '/@/layout/navBars/tagsView/tagsView.vue';

const store = useStore();
// 是否显示 tagsView
const setShowTagsView = computed(() => {
	let { layout, isTagsview } = store.state.themeConfig.themeConfig;
	return layout !== 'classic' && isTagsview;
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
