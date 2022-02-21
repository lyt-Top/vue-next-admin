<template>
	<el-container class="layout-container">
		<Aside />
		<el-container class="flex-center" :class="{ 'layout-backtop': !isFixedHeader }">
			<Header v-if="isFixedHeader" />
			<el-scrollbar ref="layoutDefaultsScrollbarRef" :class="{ 'layout-backtop': isFixedHeader }">
				<Header v-if="!isFixedHeader" />
				<Main />
			</el-scrollbar>
		</el-container>
		<el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
import { computed, getCurrentInstance, watch, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import Aside from '/@/layout/component/aside.vue';
import Header from '/@/layout/component/header.vue';
import Main from '/@/layout/component/main.vue';
export default defineComponent({
	name: 'layoutDefaults',
	components: { Aside, Header, Main },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const route = useRoute();
		const isFixedHeader = computed(() => {
			return store.state.themeConfig.themeConfig.isFixedHeader;
		});
		// 监听路由的变化
		watch(
			() => route.path,
			() => {
				proxy.$refs.layoutDefaultsScrollbarRef.wrap$.scrollTop = 0;
			}
		);
		return {
			isFixedHeader,
		};
	},
});
</script>
