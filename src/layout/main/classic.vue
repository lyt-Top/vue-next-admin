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

<script setup name="layoutClassic">
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';

const LayoutAside = defineAsyncComponent(() => import('/@/layout/component/aside.vue'));
const LayoutHeader = defineAsyncComponent(() => import('/@/layout/component/header.vue'));
const LayoutMain = defineAsyncComponent(() => import('/@/layout/component/main.vue'));
const LayoutTagsView = defineAsyncComponent(() => import('/@/layout/navBars/tagsView/tagsView.vue'));

const layoutMainRef = ref('');
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
</script>
