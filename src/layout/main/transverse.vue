<template>
	<el-container class="layout-container flex-center layout-backtop">
		<LayoutHeader />
		<LayoutMain ref="layoutMainRef" />
	</el-container>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref, watch, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';

export default defineComponent({
	name: 'layoutTransverse',
	components: {
		LayoutHeader: defineAsyncComponent(() => import('/@/layout/component/header.vue')),
		LayoutMain: defineAsyncComponent(() => import('/@/layout/component/main.vue')),
	},
	setup() {
		const layoutMainRef = ref<any>('');
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const route = useRoute();
		// 重置滚动条高度，更新子级 scrollbar
		const updateScrollbar = () => {
			layoutMainRef.value.layoutMainScrollbarRef.update();
		};
		// 重置滚动条高度，由于组件是异步引入的
		const initScrollBarHeight = () => {
			nextTick(() => {
				setTimeout(() => {
					updateScrollbar();
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
		});
		return {
			layoutMainRef,
		};
	},
});
</script>
