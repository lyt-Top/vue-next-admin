<template>
	<div class="layout-view-bg-white flex" :style="{ height: `calc(100vh - ${iframeHeight}`, border: 'none' }" v-loading="iframeLoading">
		<iframe :src="iframeUrl" frameborder="0" height="100%" width="100%" id="iframe" v-show="!iframeLoading"></iframe>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
export default defineComponent({
	name: 'layoutIfameView',
	setup() {
		const route = useRoute();
		const store = useStore();
		const state = reactive({
			iframeLoading: true,
			iframeUrl: '',
			iframeHeight: '',
		});
		// 初始化页面加载 loading
		const initIframeLoad = () => {
			state.iframeUrl = route.meta.isLink;
			nextTick(() => {
				state.iframeLoading = true;
				const iframe = document.getElementById('iframe');
				if (!iframe) return false;
				iframe.onload = () => {
					state.iframeLoading = false;
				};
			});
		};
		// 设置 iframe 的高度
		const initIframeHeight = () => {
			let { isTagsview } = store.state.themeConfig.themeConfig;
			if (isTagsview) return (state.iframeHeight = `84px`);
			else return (state.iframeHeight = `20px`);
		};
		// 页面加载时
		onMounted(() => {
			initIframeLoad();
			initIframeHeight();
		});
		// 监听路由变化，多个 iframe 时使用
		watch(
			() => route.path,
			() => {
				initIframeLoad();
			}
		);
		return {
			...toRefs(state),
		};
	},
});
</script>
