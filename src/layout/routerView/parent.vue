<template>
	<div class="h100">
		<router-view v-slot="{ Component }">
			<transition :name="setTransitionName" mode="out-in">
				<keep-alive :include="getKeepAliveNames">
					<component :is="Component" :key="state.refreshRouterViewKey" class="w100" />
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<script setup name="layoutParentView">
import { storeToRefs } from 'pinia';
import { useKeepALiveNames } from '/@/stores/keepAliveNames';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Session } from '/@/utils/storage';

const { proxy } = getCurrentInstance();
const route = useRoute();
const storesKeepAliveNames = useKeepALiveNames();
const storesThemeConfig = useThemeConfig();
const { keepAliveNames, cachedViews } = storeToRefs(storesKeepAliveNames);
const { themeConfig } = storeToRefs(storesThemeConfig);
const state = reactive({
	refreshRouterViewKey: null,
	keepAliveNameList: [],
});
// 设置主界面切换动画
const setTransitionName = computed(() => {
	return themeConfig.value.animation;
});
// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
	return themeConfig.value.isTagsview ? cachedViews.value : state.keepAliveNameList;
});
// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
	state.keepAliveNameList = keepAliveNames.value;
	proxy.mittBus.on('onTagsViewRefreshRouterView', (fullPath) => {
		state.keepAliveNameList = keepAliveNames.value.filter((name) => route.name !== name);
		state.refreshRouterViewKey = null;
		nextTick(() => {
			state.refreshRouterViewKey = fullPath;
			state.keepAliveNameList = keepAliveNames.value;
		});
	});
}); // 页面加载时
onMounted(() => {
	// https://gitee.com/lyt-top/vue-next-admin/issues/I58U75
	// https://gitee.com/lyt-top/vue-next-admin/issues/I59RXK
	nextTick(() => {
		setTimeout(() => {
			if (themeConfig.value.isCacheTagsView) cachedViews.value = Session.get('tagsViewList')?.map((item) => item.name);
		}, 0);
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
		state.refreshRouterViewKey = decodeURI(route.fullPath);
	}
);
</script>
