<template>
	<el-container class="layout-container flex-center">
		<LayoutHeader />
		<el-container class="layout-mian-height-50">
			<LayoutAside />
			<div class="flex-center layout-backtop">
				<LayoutTagsView v-if="isTagsview" />
				<LayoutMain ref="layoutMainRef" />
			</div>
		</el-container>
	</el-container>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, computed, ref, watch, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';

export default defineComponent({
	name: 'layoutClassic',
	components: {
		LayoutAside: defineAsyncComponent(() => import('/@/layout/component/aside.vue')),
		LayoutHeader: defineAsyncComponent(() => import('/@/layout/component/header.vue')),
		LayoutMain: defineAsyncComponent(() => import('/@/layout/component/main.vue')),
		LayoutTagsView: defineAsyncComponent(() => import('/@/layout/navBars/tagsView/tagsView.vue')),
	},
	setup() {
		const layoutMainRef = ref<any>('');
		const route = useRoute();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		// 判断是否显示 tasgview
		const isTagsview = computed(() => {
			return themeConfig.value.isTagsview;
		});
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
			isTagsview,
		};
	},
});
</script>
