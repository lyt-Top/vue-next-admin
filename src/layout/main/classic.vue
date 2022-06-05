<template>
	<el-container class="layout-container flex-center">
		<Headers />
		<el-container class="layout-mian-height-50">
			<Asides />
			<div class="flex-center layout-backtop">
				<TagsView v-if="themeConfig.isTagsview" />
				<Mains />
			</div>
		</el-container>
		<el-backtop target=".layout-backtop .el-main .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import Asides from '/@/layout/component/aside.vue';
import Headers from '/@/layout/component/header.vue';
import Mains from '/@/layout/component/main.vue';
import TagsView from '/@/layout/navBars/tagsView/tagsView.vue';

export default defineComponent({
	name: 'layoutClassic',
	components: { Asides, Headers, Mains, TagsView },
	setup() {
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		return {
			themeConfig,
		};
	},
});
</script>
