<template>
	<el-main class="layout-main">
		<el-scrollbar
			ref="layoutScrollbarRef"
			:class="{
				'layout-scrollbar':
					(!isClassicOrTransverse && !currentRouteMeta.isLink && !currentRouteMeta.isIframe) ||
					(!isClassicOrTransverse && currentRouteMeta.isLink && !currentRouteMeta.isIframe),
			}"
		>
			<LayoutParentView
				:style="{
					padding: !isClassicOrTransverse || (currentRouteMeta.isLink && currentRouteMeta.isIframe) ? '0' : '15px',
					transition: 'padding 0.3s ease-in-out',
				}"
			/>
			<Footer v-if="themeConfig.isFooter" />
		</el-scrollbar>
	</el-main>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, getCurrentInstance, watch, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { NextLoading } from '/@/utils/loading';
import LayoutParentView from '/@/layout/routerView/parent.vue';
import Footer from '/@/layout/footer/index.vue';

// 定义接口来定义对象的类型
interface MainState {
	headerHeight: string | number;
	currentRouteMeta: any;
}

export default defineComponent({
	name: 'layoutMain',
	components: { LayoutParentView, Footer },
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const route = useRoute();
		const state = reactive<MainState>({
			headerHeight: '',
			currentRouteMeta: {},
		});
		// 判断布局
		const isClassicOrTransverse = computed(() => {
			const { layout } = themeConfig.value;
			return layout === 'classic' || layout === 'transverse';
		});
		// 设置 main 的高度
		const initHeaderHeight = () => {
			const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe;
			let { isTagsview } = themeConfig.value;
			if (isTagsview) return (state.headerHeight = bool ? `86px` : `115px`);
			else return (state.headerHeight = `80px`);
		};
		// 初始化获取当前路由 meta，用于设置 iframes padding
		const initGetMeta = () => {
			state.currentRouteMeta = route.meta;
		};
		// 页面加载前
		onMounted(async () => {
			await initGetMeta();
			initHeaderHeight();
			NextLoading.done();
		});
		// 监听路由变化
		watch(
			() => route.path,
			() => {
				state.currentRouteMeta = route.meta;
				const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe;
				state.headerHeight = bool ? `86px` : `115px`;
				proxy.$refs.layoutScrollbarRef.update();
			}
		);
		// 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
		watch(
			themeConfig,
			(val) => {
				state.currentRouteMeta = route.meta;
				const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe;
				state.headerHeight = val.isTagsview ? (bool ? `86px` : `115px`) : '51px';
				proxy.$refs?.layoutScrollbarRef?.update();
			},
			{
				deep: true,
			}
		);
		return {
			themeConfig,
			isClassicOrTransverse,
			...toRefs(state),
		};
	},
});
</script>
