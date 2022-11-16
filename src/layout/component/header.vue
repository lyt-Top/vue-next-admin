<template>
	<el-header class="layout-header" v-show="!isTagsViewCurrenFull">
		<NavBarsIndex />
	</el-header>
</template>

<script setup name="layoutHeader">
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';

const NavBarsIndex = defineAsyncComponent(() => import('/@/layout/navBars/index.vue'));

const storesTagsViewRoutes = useTagsViewRoutes();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
</script>
