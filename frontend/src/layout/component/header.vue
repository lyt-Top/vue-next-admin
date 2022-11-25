<template>
	<el-header class="layout-header" v-show="!isTagsViewCurrenFull">
		<NavBarsIndex />
	</el-header>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';

export default defineComponent({
	name: 'layoutHeader',
	components: {
		NavBarsIndex: defineAsyncComponent(() => import('/@/layout/navBars/index.vue')),
	},
	setup() {
		const storesTagsViewRoutes = useTagsViewRoutes();
		const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
		return {
			isTagsViewCurrenFull,
		};
	},
});
</script>
