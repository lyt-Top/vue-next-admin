<template>
	<div>
		<el-input v-model="val" placeholder="menu122：请输入内容测试路由缓存"></el-input>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent } from 'vue';

export default defineComponent({
	name: 'menu122',
	setup() {
		const state = reactive({
			val: '',
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
