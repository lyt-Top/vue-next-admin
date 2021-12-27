<template>
	<el-container class="layout-container flex-center">
		<Header />
		<el-container class="layout-mian-height-50">
			<Aside />
			<div class="flex-center layout-backtop">
				<TagsView v-if="getThemeConfig.isTagsview" />
				<Main />
			</div>
		</el-container>
		<el-backtop target=".layout-backtop .el-main .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script setup name="layoutClassic">
import Aside from '/@/layout/component/aside.vue';
import Header from '/@/layout/component/header.vue';
import Main from '/@/layout/component/main.vue';
import TagsView from '/@/layout/navBars/tagsView/tagsView.vue';

const store = useStore();
// 获取布局配置信息
const getThemeConfig = computed(() => {
	return store.state.themeConfig.themeConfig;
});
</script>
