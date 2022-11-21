<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<div class="flex-margin color-primary">
				<div>paramsDynamicDetails</div>
				<div class="mt10 mb10">路径：path: {{ state.params.path }}</div>
				<div>参数：params: {{ state.params.params }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const state = reactive({
	params: {
		path: '',
		params: '',
	},
});

// 页面加载时
onMounted(() => {
	state.params = <any>route;
});
</script>
