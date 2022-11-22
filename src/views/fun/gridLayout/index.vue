<template>
	<div class="grid-layout-container layout-pd">
		<el-card shadow="hover" header="vue-grid-layout 拖拽布局演示">
			<el-alert
				title="感谢优秀的 `vue-grid-layout`，项目地址：https://github.com/jbaysolutions/vue-grid-layout"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<grid-layout
				v-model:layout="state.layouts"
				:col-num="12"
				:row-height="30"
				:is-draggable="true"
				:is-resizable="true"
				:is-mirrored="false"
				:vertical-compact="true"
				:margin="[10, 10]"
				:use-css-transforms="true"
			>
				<grid-item v-for="item in state.layouts" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
					<div class="w100 h100 flex">
						<span class="flex-margin font14">{{ item.i }}</span>
					</div>
				</grid-item>
			</grid-layout>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="funGridLayout">
import { reactive } from 'vue';

// 定义变量内容
const state = reactive({
	layouts: [
		{ x: 0, y: 0, w: 2, h: 2, i: '0' },
		{ x: 2, y: 0, w: 2, h: 4, i: '1' },
		{ x: 4, y: 0, w: 2, h: 5, i: '2' },
		{ x: 6, y: 0, w: 2, h: 3, i: '3' },
		{ x: 8, y: 0, w: 2, h: 3, i: '4' },
		{ x: 10, y: 0, w: 2, h: 3, i: '5' },
		{ x: 0, y: 5, w: 2, h: 5, i: '6' },
	],
});
</script>

<style scoped lang="scss">
.grid-layout-container {
	.vue-grid-item {
		background: var(--el-color-primary);
		color: var(--el-color-white);
	}
}
</style>
