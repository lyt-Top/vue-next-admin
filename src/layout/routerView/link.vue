<template>
	<div class="layout-view-bg-white flex layout-view-link" :style="{ height: `calc(100vh - ${setLinkHeight}` }">
		<a :href="currentRouteMeta.isLink" target="_blank" rel="opener" class="flex-margin">
			{{ currentRouteMeta.title }}：{{ currentRouteMeta.isLink }}
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, watch } from 'vue';
import { useRoute, RouteMeta } from 'vue-router';
import { useStore } from '/@/store/index';

// 定义接口来定义对象的类型
interface LinkViewState {
	currentRouteMeta: {
		isLink: string;
		title: string;
	};
}
interface LinkViewRouteMeta extends RouteMeta {
	isLink: string;
	title: string;
}

export default defineComponent({
	name: 'layoutLinkView',
	setup() {
		const route = useRoute();
		const store = useStore();
		const state = reactive<LinkViewState>({
			currentRouteMeta: {
				isLink: '',
				title: '',
			},
		});
		// 设置 link 的高度
		const setLinkHeight = computed(() => {
			let { isTagsview } = store.state.themeConfig.themeConfig;
			if (isTagsview) return `114px`;
			else return `80px`;
		});
		// 监听路由的变化，设置内容
		watch(
			() => route.path,
			() => {
				state.currentRouteMeta = <LinkViewRouteMeta>route.meta;
			},
			{
				immediate: true,
			}
		);
		return {
			setLinkHeight,
			...toRefs(state),
		};
	},
});
</script>
