<template>
	<div class="layout-pd">
		<el-input v-model="val" placeholder="menu2：请输入内容测试路由缓存"></el-input>
	</div>
</template>

<script setup lang="ts" name="menu2">
import { ref } from 'vue';

// 定义变量内容
const val = ref('');
</script>
