<template>
	<el-main class="layout-main">
		<el-scrollbar
			class="layout-scrollbar"
			ref="layoutScrollbarRef"
			:style="{ padding: currentRouteMeta.isLink && currentRouteMeta.isIframe ? 0 : '', transition: 'padding 0.3s ease-in-out' }"
		>
			<LayoutParentView :style="{ minHeight: `calc(100vh - ${headerHeight})` }" />
			<Footer v-if="getThemeConfig.isFooter" />
		</el-scrollbar>
	</el-main>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, reactive, getCurrentInstance, watch, onMounted } from 'vue';
import { useStore } from '/@/store/index';
import { useRoute } from 'vue-router';
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
		const route = useRoute();
		const store = useStore();
		const state = reactive<MainState>({
			headerHeight: '',
			currentRouteMeta: {},
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 设置 main 的高度
		const initHeaderHeight = () => {
			const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe;
			let { isTagsview } = store.state.themeConfig.themeConfig;
			if (isTagsview) return (state.headerHeight = bool ? `85px` : `114px`);
			else return (state.headerHeight = `51px`);
		};
		// 初始化获取当前路由 meta，用于设置 iframes padding
		const initGetMeta = () => {
			state.currentRouteMeta = route.meta;
		};
		// 页面加载前
		onMounted(async () => {
			await initGetMeta();
			initHeaderHeight();
		});
		// 监听路由变化
		watch(
			() => route.path,
			() => {
				state.currentRouteMeta = route.meta;
				const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe;
				state.headerHeight = bool ? `85px` : `114px`;
				proxy.$refs.layoutScrollbarRef.update();
			}
		);
		// 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
		watch(store.state.themeConfig.themeConfig, (val) => {
			state.currentRouteMeta = route.meta;
			const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe;
			state.headerHeight = val.isTagsview ? (bool ? `85px` : `114px`) : '51px';
			if (val.isFixedHeaderChange !== val.isFixedHeader) {
				if (!proxy.$refs.layoutScrollbarRef) return false;
				proxy.$refs.layoutScrollbarRef.update();
			}
		});
		return {
			getThemeConfig,
			...toRefs(state),
		};
	},
});
</script>
