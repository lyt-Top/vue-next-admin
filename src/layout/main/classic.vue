<template>
	<el-container class="layout-container flex-center">
		<Header />
		<el-container class="layout-mian-height-50">
			<Aside />
			<div class="flex-center layout-backtop">
				<TagsView v-if="themeConfig.isTagsview" />
				<Main />
			</div>
		</el-container>
		<el-backtop target=".layout-backtop .el-main .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import Aside from '/@/layout/component/aside.vue';
import Header from '/@/layout/component/header.vue';
import Main from '/@/layout/component/main.vue';
import TagsView from '/@/layout/navBars/tagsView/tagsView.vue';

export default defineComponent({
	name: 'layoutClassic',
	components: { Aside, Header, Main, TagsView },
	setup() {
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		return {
			themeConfig,
		};
	},
});
</script>
