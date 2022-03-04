<template>
	<div class="layout-navbars-breadcrumb" :style="{ display: isShowBreadcrumb }">
		<SvgIcon
			class="layout-navbars-breadcrumb-icon"
			:name="getThemeConfig.isCollapse ? 'ele-Expand' : 'ele-Fold'"
			:size="16"
			@click="onThemeConfigChange"
		/>
		<el-breadcrumb class="layout-navbars-breadcrumb-hide">
			<transition-group name="breadcrumb" mode="out-in">
				<el-breadcrumb-item v-for="(v, k) in breadcrumbList" :key="v.meta.title">
					<span v-if="k === breadcrumbList.length - 1" class="layout-navbars-breadcrumb-span">
						<SvgIcon :name="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon" />{{ v.meta.title }}
					</span>
					<a v-else @click.prevent="onBreadcrumbClick(v)">
						<SvgIcon :name="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon" />{{ v.meta.title }}
					</a>
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, onMounted, defineComponent } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import { Local } from '/@/utils/storage';

// 定义接口来定义对象的类型
interface BreadcrumbState {
	breadcrumbList: Array<any>;
	routeSplit: Array<string>;
	routeSplitFirst: string;
	routeSplitIndex: number;
}

export default defineComponent({
	name: 'layoutBreadcrumb',
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive<BreadcrumbState>({
			breadcrumbList: [],
			routeSplit: [],
			routeSplitFirst: '',
			routeSplitIndex: 1,
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 动态设置经典、横向布局不显示
		const isShowBreadcrumb = computed(() => {
			initRouteSplit(route.path);
			const { layout, isBreadcrumb } = store.state.themeConfig.themeConfig;
			if (layout === 'classic' || layout === 'transverse') return 'none';
			else return isBreadcrumb ? '' : 'none';
		});
		// 面包屑点击时
		const onBreadcrumbClick = (v: any) => {
			const { redirect, path } = v;
			if (redirect) router.push(redirect);
			else router.push(path);
		};
		// 展开/收起左侧菜单点击
		const onThemeConfigChange = () => {
			store.state.themeConfig.themeConfig.isCollapse = !store.state.themeConfig.themeConfig.isCollapse;
			setLocalThemeConfig();
		};
		// 存储布局配置
		const setLocalThemeConfig = () => {
			Local.remove('themeConfig');
			Local.set('themeConfig', getThemeConfig.value);
		};
		// 处理面包屑数据
		const getBreadcrumbList = (arr: Array<object>) => {
			arr.map((item: any) => {
				state.routeSplit.map((v: any, k: number, arrs: any) => {
					if (state.routeSplitFirst === item.path) {
						state.routeSplitFirst += `/${arrs[state.routeSplitIndex]}`;
						state.breadcrumbList.push(item);
						state.routeSplitIndex++;
						if (item.children) getBreadcrumbList(item.children);
					}
				});
			});
		};
		// 当前路由字符串切割成数组，并删除第一项空内容
		const initRouteSplit = (path: string) => {
			if (!store.state.themeConfig.themeConfig.isBreadcrumb) return false;
			state.breadcrumbList = [store.state.routesList.routesList[0]];
			state.routeSplit = path.split('/');
			state.routeSplit.shift();
			state.routeSplitFirst = `/${state.routeSplit[0]}`;
			state.routeSplitIndex = 1;
			getBreadcrumbList(store.state.routesList.routesList);
		};
		// 页面加载时
		onMounted(() => {
			initRouteSplit(route.path);
		});
		// 路由更新时
		onBeforeRouteUpdate((to) => {
			initRouteSplit(to.path);
		});
		return {
			onThemeConfigChange,
			isShowBreadcrumb,
			getThemeConfig,
			onBreadcrumbClick,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb {
	flex: 1;
	height: inherit;
	display: flex;
	align-items: center;
	padding-left: 15px;
	.layout-navbars-breadcrumb-icon {
		cursor: pointer;
		font-size: 18px;
		margin-right: 15px;
		color: var(--next-bg-topBarColor);
	}
	.layout-navbars-breadcrumb-span {
		opacity: 0.7;
		color: var(--next-bg-topBarColor);
	}
	.layout-navbars-breadcrumb-iconfont {
		font-size: 14px;
		margin-right: 5px;
	}
	::v-deep(.el-breadcrumb__separator) {
		opacity: 0.7;
		color: var(--next-bg-topBarColor);
	}
	::v-deep(.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link) {
		font-weight: unset !important;
		color: var(--next-bg-topBarColor);
		&:hover {
			color: var(--el-color-primary) !important;
		}
	}
}
</style>
