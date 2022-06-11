<template>
	<div class="layout-view-bg-white flex mt1" :style="{ height: `calc(100vh - ${setIframeHeight}`, border: 'none' }" v-loading="state.iframeLoading">
		<iframe :src="iframeUrl" frameborder="0" height="100%" width="100%" ref="iframeDom" v-show="!iframeLoading"></iframe>
	</div>
</template>

<script setup name="layoutIfameView">
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';

const route = useRoute();
const storesThemeConfig = useThemeConfig();
const storesTagsViewRoutes = useTagsViewRoutes();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
const state = reactive({
	iframeLoading: true,
	iframeUrl: '',
});
// 初始化页面加载 loading
const initIframeLoad = () => {
	state.iframeUrl = route.meta.isLink;
	nextTick(() => {
		state.iframeLoading = true;
		const iframe = state.iframeDom;
		if (!iframe) return false;
		iframe.onload = () => {
			state.iframeLoading = false;
		};
	});
};
// 设置 iframe 的高度
const setIframeHeight = computed(() => {
	let { isTagsview } = themeConfig.value;
	if (isTagsViewCurrenFull.value) {
		return `1px`;
	} else {
		if (isTagsview) return `86px`;
		else return `51px`;
	}
});
// 页面加载时
onMounted(() => {
	initIframeLoad();
});
// 监听路由变化，多个 iframe 时使用
watch(
	() => route.path,
	() => {
		initIframeLoad();
	}
);
</script>
