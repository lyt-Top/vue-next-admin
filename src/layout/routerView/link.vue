<template>
	<div class="layout-view-bg-white flex layout-view-link" :style="{ height: `calc(100vh - ${linkHeight}` }">
		<a href="https://element-plus.gitee.io/#/zh-CN/component/installation" target="_blank" class="flex-margin"
			>{{ currentRouteMeta.title }}：{{ currentRouteMeta.isLink }}</a
		>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
export default defineComponent({
	name: 'layoutLinkView',
	setup() {
		const route = useRoute();
		const store = useStore();
		const state = reactive({
			currentRouteMeta: {},
			linkHeight: '',
		});
		// 初始化获取当前路由 meta
		const initGetMeta = () => {
			state.currentRouteMeta = route.meta;
		};
		// 设置 iframe 的高度
		const initLinkHeight = () => {
			let { isTagsview } = store.state.themeConfig.themeConfig;
			if (isTagsview) return (state.linkHeight = `114px`);
			else return (state.linkHeight = `50px`);
		};
		// 页面加载时
		onMounted(() => {
			initGetMeta();
			initLinkHeight();
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
