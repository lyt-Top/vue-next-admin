<template>
	<div>
		<el-input v-model="val" placeholder="menu122：请输入内容测试路由缓存"></el-input>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive } from 'vue';
export default {
	name: 'menu122',
	setup() {
		const state = reactive({
			val: '',
		});
		return {
			...toRefs(state),
		};
	},
};
</script>
