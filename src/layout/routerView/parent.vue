<template>
	<div class="h100">
		<router-view v-slot="{ Component }">
			<transition :name="setTransitionName" mode="out-in">
				<keep-alive :include="state.keepAliveNameList">
					<component :is="Component" :key="state.refreshRouterViewKey" class="w100" :style="{ minHeight }" />
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<script setup name="layoutParentView">
const props = defineProps({
	minHeight: {
		type: String,
		default: '',
	},
});

const { proxy } = getCurrentInstance();
const route = useRoute();
const store = useStore();
const state = reactive({
	refreshRouterViewKey: null,
	keepAliveNameList: [],
});
// 设置主界面切换动画
const setTransitionName = computed(() => {
	return store.state.themeConfig.themeConfig.animation;
});
// 设置最小高度
const minHeight = computed(() => {
	return props.minHeight;
});
// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
	return store.state.keepAliveNames.keepAliveNames;
});
// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
	state.keepAliveNameList = getKeepAliveNames.value;
	proxy.mittBus.on('onTagsViewRefreshRouterView', (fullPath) => {
		state.keepAliveNameList = getKeepAliveNames.value.filter((name) => route.name !== name);
		state.refreshRouterViewKey = null;
		nextTick(() => {
			state.refreshRouterViewKey = fullPath;
			state.keepAliveNameList = getKeepAliveNames.value;
		});
	});
});
// 页面卸载时
onUnmounted(() => {
	proxy.mittBus.off('onTagsViewRefreshRouterView');
});
// 监听路由变化，防止 tagsView 多标签时，切换动画消失
watch(
	() => route.fullPath,
	() => {
		state.refreshRouterViewKey = route.fullPath;
	}
);
</script>
