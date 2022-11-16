<template>
	<div class="layout-parent">
		<router-view v-slot="{ Component }">
			<transition :name="setTransitionName" mode="out-in">
				<keep-alive :include="getKeepAliveNames">
					<component :is="Component" :key="refreshRouterViewKey" class="w100" v-show="!isIframePage" />
				</keep-alive>
			</transition>
		</router-view>
		<transition :name="setTransitionName" mode="out-in">
			<Iframes class="w100" v-show="isIframePage" :refreshKey="iframeRefreshKey" :name="setTransitionName" :list="iframeList" />
		</transition>
	</div>
</template>

<script lang="ts">
import { defineAsyncComponent, computed, defineComponent, toRefs, reactive, onBeforeMount, onUnmounted, nextTick, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useKeepALiveNames } from '/@/stores/keepAliveNames';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Session } from '/@/utils/storage';
import mittBus from '/@/utils/mitt';

// 定义接口来定义对象的类型
interface ParentViewState {
	refreshRouterViewKey: string;
	iframeRefreshKey: string;
	keepAliveNameList: string[];
	iframeList: string[];
}

export default defineComponent({
	name: 'layoutParentView',
	components: {
		Iframes: defineAsyncComponent(() => import('/@/layout/routerView/iframes.vue')),
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const storesKeepAliveNames = useKeepALiveNames();
		const storesThemeConfig = useThemeConfig();
		const { keepAliveNames, cachedViews } = storeToRefs(storesKeepAliveNames);
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const state = reactive<ParentViewState>({
			refreshRouterViewKey: '', // 非 iframe tagsview 右键菜单刷新时
			iframeRefreshKey: '', // iframe tagsview 右键菜单刷新时
			keepAliveNameList: [],
			iframeList: [],
		});
		// 设置主界面切换动画
		const setTransitionName = computed(() => {
			return themeConfig.value.animation;
		});
		// 获取组件缓存列表(name值)
		const getKeepAliveNames = computed(() => {
			return themeConfig.value.isTagsview ? cachedViews.value : state.keepAliveNameList;
		});
		// 设置 iframe 显示/隐藏
		const isIframePage = computed(() => {
			return route.meta.isIframe;
		});
		// 获取 iframe 组件列表(未进行渲染)
		const getIframeListRoutes = async () => {
			router.getRoutes().forEach((v: any) => {
				if (v.meta.isIframe) {
					v.meta.isIframeOpen = false;
					v.meta.loading = true;
					state.iframeList.push({ ...v });
				}
			});
		};
		// 页面加载前，处理缓存，页面刷新时路由缓存处理
		onBeforeMount(() => {
			state.keepAliveNameList = keepAliveNames.value;
			mittBus.on('onTagsViewRefreshRouterView', (fullPath: string) => {
				state.keepAliveNameList = keepAliveNames.value.filter((name: string) => route.name !== name);
				state.refreshRouterViewKey = '';
				state.iframeRefreshKey = '';
				nextTick(() => {
					state.refreshRouterViewKey = fullPath;
					state.iframeRefreshKey = fullPath;
					state.keepAliveNameList = keepAliveNames.value;
				});
			});
		});
		// 页面加载时
		onMounted(() => {
			getIframeListRoutes();
			// https://gitee.com/lyt-top/vue-next-admin/issues/I58U75
			// https://gitee.com/lyt-top/vue-next-admin/issues/I59RXK
			nextTick(() => {
				setTimeout(() => {
					if (themeConfig.value.isCacheTagsView) cachedViews.value = Session.get('tagsViewList')?.map((item: any) => item.name);
				}, 0);
			});
		});
		// 页面卸载时
		onUnmounted(() => {
			mittBus.off('onTagsViewRefreshRouterView', () => {});
		});
		// 监听路由变化，防止 tagsView 多标签时，切换动画消失
		// https://toscode.gitee.com/lyt-top/vue-next-admin/pulls/38/files
		watch(
			() => route.fullPath,
			() => {
				state.refreshRouterViewKey = decodeURI(route.fullPath);
			},
			{
				immediate: true,
			}
		);
		return {
			route,
			setTransitionName,
			getKeepAliveNames,
			isIframePage,
			...toRefs(state),
		};
	},
});
</script>
