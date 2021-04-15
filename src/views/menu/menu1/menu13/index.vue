<template>
	<div>
		<el-input v-model="val" placeholder="menu13：请输入内容测试路由缓存"></el-input>
	</div>
</template>

<script>
export default {
	name: 'menu13',
	data() {
		return {
			val: '',
		};
	},
	mounted() {
		console.log(2222);
	},
	activated() {
		console.log(1111);
	},
};
</script>
