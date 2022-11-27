<template>
	<el-main class="layout-main" :style="isFixedHeader ? `height: calc(100% - ${setMainHeight})` : `minHeight: calc(100% - ${setMainHeight})`">
		<el-scrollbar ref="layoutMainScrollbarRef" class="layout-main-scroll" wrap-class="layout-main-scroll" view-class="layout-main-scroll">
			<LayoutParentView />
			<LayoutFooter v-if="isFooter" />
		</el-scrollbar>
		<el-backtop target=".layout-backtop .el-scrollbar__wrap" />
	</el-main>
</template>

<script setup lang="ts" name="layoutMain">
import { defineAsyncComponent, onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { useThemeConfig } from '/@/stores/themeConfig';
import { NextLoading } from '/@/utils/loading';

// 引入组件
const LayoutParentView = defineAsyncComponent(() => import('/@/layout/routerView/parent.vue'));
const LayoutFooter = defineAsyncComponent(() => import('/@/layout/footer/index.vue'));

// 定义变量内容
const layoutMainScrollbarRef = ref();
const route = useRoute();
const storesTagsViewRoutes = useTagsViewRoutes();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);

// 设置 footer 显示/隐藏
const isFooter = computed(() => {
	return themeConfig.value.isFooter && !route.meta.isIframe;
});
// 设置 header 固定
const isFixedHeader = computed(() => {
	return themeConfig.value.isFixedHeader;
});
// 设置主内容区的高度
const setMainHeight = computed(() => {
	if (isTagsViewCurrenFull.value) return '0px';
	const { isTagsview, layout } = themeConfig.value;
	if (isTagsview && layout !== 'classic') return '85px';
	else return '51px';
});
// 页面加载前
onMounted(() => {
	NextLoading.done(600);
});

// 暴露变量
defineExpose({
	layoutMainScrollbarRef,
});
</script>
