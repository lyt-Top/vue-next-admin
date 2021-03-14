<template>
	<div class="h100">
		<router-view v-slot="{ Component }">
			<transition :name="setTransitionName" mode="out-in">
				<keep-alive :include="getKeepAliveNames">
					<component :is="Component" :key="refreshRouterViewKey" class="w100" />
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, reactive, getCurrentInstance, onBeforeMount, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index.ts';
export default defineComponent({
	name: 'layoutParentView',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const store = useStore();
		const state: any = reactive({
			refreshRouterViewKey: null,
		});
		// 设置主界面切换动画
		const setTransitionName = computed(() => {
			return store.state.themeConfig.themeConfig.animation;
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 获取组件缓存列表(name值)
		const getKeepAliveNames = computed(() => {
			return store.state.keepAliveNames.keepAliveNames;
		});
		// 页面加载前
		onBeforeMount(() => {
			proxy.mittBus.on('onTagsViewRefreshRouterView', (path: string) => {
				if (route.path !== path) return false;
				state.refreshRouterViewKey = route.path;
				nextTick(() => {
					state.refreshRouterViewKey = null;
				});
			});
		});
		// 页面卸载时
		onUnmounted(() => {
			proxy.mittBus.off('onTagsViewRefreshRouterView');
		});
		return {
			getThemeConfig,
			getKeepAliveNames,
			setTransitionName,
			...toRefs(state),
		};
	},
});
</script>
