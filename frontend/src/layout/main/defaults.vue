<template>
	<el-container class="layout-container">
		<LayoutAside />
		<el-container class="layout-container-view h100">
			<el-scrollbar ref="layoutScrollbarRef" class="layout-backtop">
				<LayoutHeader />
				<LayoutMain ref="layoutMainRef" />
			</el-scrollbar>
		</el-container>
	</el-container>
</template>

<script lang="ts">
import { defineAsyncComponent, watch, defineComponent, onMounted, nextTick, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { NextLoading } from '/@/utils/loading';

export default defineComponent({
	name: 'layoutDefaults',
	components: {
		LayoutAside: defineAsyncComponent(() => import('/@/layout/component/aside.vue')),
		LayoutHeader: defineAsyncComponent(() => import('/@/layout/component/header.vue')),
		LayoutMain: defineAsyncComponent(() => import('/@/layout/component/main.vue')),
	},
	setup() {
		const layoutScrollbarRef = ref<any>('');
		const layoutMainRef = ref<any>('');
		const route = useRoute();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		// 重置滚动条高度
		const updateScrollbar = () => {
			// 更新父级 scrollbar
			layoutScrollbarRef.value.update();
			// 更新子级 scrollbar
			layoutMainRef.value.layoutMainScrollbarRef.update();
		};
		// 重置滚动条高度，由于组件是异步引入的
		const initScrollBarHeight = () => {
			nextTick(() => {
				setTimeout(() => {
					updateScrollbar();
					layoutScrollbarRef.value.wrap$.scrollTop = 0;
					layoutMainRef.value.layoutMainScrollbarRef.wrap$.scrollTop = 0;
				}, 500);
			});
		};
		// 监听路由的变化，切换界面时，滚动条置顶
		watch(
			() => route.path,
			() => {
				initScrollBarHeight();
			}
		);
		// 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
		watch(
			themeConfig,
			() => {
				updateScrollbar();
			},
			{
				deep: true,
			}
		);
		// 页面加载时
		onMounted(() => {
			initScrollBarHeight();
			NextLoading.done(600);
		});
		return {
			layoutScrollbarRef,
			layoutMainRef,
		};
	},
});
</script>
