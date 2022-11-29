<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<div class="flex-margin color-primary">
				<div>paramsCommonDetails</div>
				<div class="mt10 mb10">路径：path: {{ route.path }}</div>
				<div>参数：query: {{ route.query }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="paramsCommonDetails">
import { useRoute } from 'vue-router';

// 定义变量内容
const route = useRoute();
</script>
