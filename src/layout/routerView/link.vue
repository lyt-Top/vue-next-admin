<template>
	<div class="layout-view-bg-white flex layout-view-link" :style="{ height: `calc(100vh - ${setLinkHeight}` }">
		<a href="https://element-plus.gitee.io/#/zh-CN/component/installation" target="_blank" class="flex-margin"
			>{{ currentRouteMeta.title }}：{{ currentRouteMeta.isLink }}</a
		>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
export default defineComponent({
	name: 'layoutLinkView',
	setup() {
		const route = useRoute();
		const store = useStore();
		const state = reactive({
			currentRouteMeta: {},
		});
		// 初始化获取当前路由 meta
		const initGetMeta = () => {
			state.currentRouteMeta = route.meta;
		};
		// 设置 link 的高度
		const setLinkHeight = computed(() => {
			let { isTagsview } = store.state.themeConfig.themeConfig;
			if (isTagsview) return `114px`;
			else return `80px`;
		});
		// 页面加载时
		onMounted(() => {
			initGetMeta();
		});
		return {
			setLinkHeight,
			...toRefs(state),
		};
	},
});
</script>
