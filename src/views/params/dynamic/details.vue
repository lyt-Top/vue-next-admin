<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<div class="flex-margin color-primary">
				<div>paramsDynamicDetails</div>
				<div class="mt10 mb10">路径：path: {{ params.path }}</div>
				<div>参数：params: {{ params.params }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'paramsDynamicDetails',
	setup() {
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
		return {
			...toRefs(state),
		};
	},
});
</script>
