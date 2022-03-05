<template>
	<div class="layout-view-bg-white flex layout-view-link" :style="{ height: `calc(100vh - ${setLinkHeight}` }">
		<a :href="state.currentRouteMeta.isLink" target="_blank" rel="opener" class="flex-margin">
			{{ state.currentRouteMeta.title }}：{{ state.currentRouteMeta.isLink }}
		</a>
	</div>
</template>

<script setup name="layoutLinkView">
const route = useRoute();
const store = useStore();
const state = reactive({
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
		state.currentRouteMeta = route.meta;
	},
	{
		immediate: true,
	}
);
</script>
