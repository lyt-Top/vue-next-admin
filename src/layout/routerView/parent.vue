<template>
	<div class="h100">
		<router-view v-slot="{ Component }">
			<transition :name="setTransitionName" mode="out-in">
				<keep-alive :include="keepAliveNameList">
					<component :is="Component" :key="refreshRouterViewKey" class="w100" />
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, reactive, getCurrentInstance, onBeforeMount, onUnmounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useKeepALiveNames } from '/@/stores/keepAliveNames';
import { useThemeConfig } from '/@/stores/themeConfig';

// 定义接口来定义对象的类型
interface ParentViewState {
	refreshRouterViewKey: null | string;
	keepAliveNameList: string[];
}

export default defineComponent({
	name: 'layoutParentView',
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const route = useRoute();
		const stores = useKeepALiveNames();
		const storesThemeConfig = useThemeConfig();
		const { keepAliveNames } = storeToRefs(stores);
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const state = reactive<ParentViewState>({
			refreshRouterViewKey: null,
			keepAliveNameList: [],
		});
		// 设置主界面切换动画
		const setTransitionName = computed(() => {
			return themeConfig.value.animation;
		});
		// 页面加载前，处理缓存，页面刷新时路由缓存处理
		onBeforeMount(() => {
			state.keepAliveNameList = keepAliveNames.value;
			proxy.mittBus.on('onTagsViewRefreshRouterView', (fullPath: string) => {
				state.keepAliveNameList = keepAliveNames.value.filter((name: string) => route.name !== name);
				state.refreshRouterViewKey = null;
				nextTick(() => {
					state.refreshRouterViewKey = fullPath;
					state.keepAliveNameList = keepAliveNames.value;
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
				state.refreshRouterViewKey = decodeURI(route.fullPath);
			}
		);
		return {
			setTransitionName,
			...toRefs(state),
		};
	},
});
</script>
