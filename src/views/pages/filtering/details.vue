<template>
	<div :style="{ height: `calc(100vh - ${initTagViewHeight}` }">
		<div class="layout-view-bg-white">
			<div class="w100 h100 flex">
				<div class="flex-margin color-primary">filtering-details 测试界面</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, computed } from 'vue';
import { useStore } from '/@/store/index';
export default {
	name: 'pagesFilteringDetails',
	setup() {
		const store = useStore();
		const state = reactive({
			tagViewHeight: '',
		});
		// 设置主内容的高度
		const initTagViewHeight = computed(() => {
			let { isTagsview } = store.state.themeConfig.themeConfig;
			let { isTagsViewCurrenFull } = store.state.tagsViewRoutes;
			if (isTagsViewCurrenFull) {
				return `30px`;
			} else {
				if (isTagsview) return `114px`;
				else return `80px`;
			}
		});
		return {
			initTagViewHeight,
			...toRefs(state),
		};
	},
};
</script>
