<template>
	<div class="roll-notice-container">
		<el-card shadow="hover" header="滚动通知演示"> </el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive } from 'vue';
export default {
	name: 'rollNotice',
	setup() {
		const state = reactive({});
		return {
			...toRefs(state),
		};
	},
};
</script>
