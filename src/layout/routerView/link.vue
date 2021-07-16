<template>
	<div class="layout-view-bg-white flex layout-view-link" :style="{ height: `calc(100vh - ${setLinkHeight}` }">
		<a :href="currentRouteMeta.isLink" target="_blank" rel="opener" class="flex-margin"
			>{{ $t(currentRouteMeta.title) }}：{{ currentRouteMeta.isLink }}</a
		>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, watch } from 'vue';
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
				state.currentRouteMeta = route.meta;
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
