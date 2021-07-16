<template>
	<el-menu
		router
		:default-active="defaultActive"
		background-color="transparent"
		:collapse="setIsCollapse"
		:unique-opened="getThemeConfig.isUniqueOpened"
		:collapse-transition="false"
	>
		<template v-for="val in menuLists">
			<el-submenu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
				<template #title>
					<i :class="val.meta.icon ? val.meta.icon : ''"></i>
					<span>{{ $t(val.meta.title) }}</span>
				</template>
				<SubItem :chil="val.children" />
			</el-submenu>
			<el-menu-item :index="val.path" :key="val.path" v-else>
				<i :class="val.meta.icon ? val.meta.icon : ''"></i>
				<template #title v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
					<span>{{ $t(val.meta.title) }}</span>
				</template>
				<template #title v-else>
					<a :href="val.meta.isLink" target="_blank" rel="opener">{{ $t(val.meta.title) }}</a></template
				>
			</el-menu-item>
		</template>
	</el-menu>
</template>

<script lang="ts">
import { toRefs, reactive, computed, defineComponent, getCurrentInstance } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useStore } from '/@/store/index';
import SubItem from '/@/layout/navMenu/subItem.vue';
export default defineComponent({
	name: 'navMenuVertical',
	components: { SubItem },
	props: {
		menuList: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const route = useRoute();
		const state = reactive({
			// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
			defaultActive: route.meta.isDynamic ? route.meta.isDynamicPath : route.path,
		});
		// 获取父级菜单数据
		const menuLists = computed(() => {
			return props.menuList;
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 设置菜单的收起/展开
		const setIsCollapse = computed(() => {
			return document.body.clientWidth < 1000 ? false : getThemeConfig.value.isCollapse;
		});
		// 路由更新时
		onBeforeRouteUpdate((to) => {
			// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
			state.defaultActive = to.meta.isDynamic ? to.meta.isDynamicPath : to.path;
			proxy.mittBus.emit('onMenuClick');
			const clientWidth = document.body.clientWidth;
			if (clientWidth < 1000) getThemeConfig.value.isCollapse = false;
		});
		return {
			menuLists,
			getThemeConfig,
			setIsCollapse,
			...toRefs(state),
		};
	},
});
</script>
