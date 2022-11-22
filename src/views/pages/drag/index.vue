<template>
	<div class="drag-container layout-pd">
		<el-card shadow="hover" header="拖动指令效果（v-drag）作用于 Dialog 对话框">
			<el-button type="primary" @click="state.dialogVisible = true" size="default">
				<el-icon>
					<ele-Pointer />
				</el-icon>
				点击打开 Dialog
			</el-button>
		</el-card>

		<el-card shadow="hover" header="自定义div" class="mt15">
			<div class="drag-dom">
				<div class="drag-header">
					<el-button type="success" size="default" v-drag="['.drag-container .drag-dom', '.drag-container .drag-header']">
						<el-icon>
							<ele-Pointer />
						</el-icon>
						按住进行拖动测试
					</el-button>
				</div>
			</div>
		</el-card>

		<el-dialog v-model="state.dialogVisible" width="769px">
			<template #header>
				<div v-drag="['.drag-container .el-dialog', '.drag-container .el-dialog__header']">拖动指令效果（v-drag）</div>
			</template>
			<p>鼠标放标题头进行 Dialog 对话框拖动</p>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="state.dialogVisible = false" size="default">取 消</el-button>
					<el-button type="primary" @click="state.dialogVisible = false" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="pagesDrag">
import { reactive } from 'vue';

// 定义变量内容
const state = reactive({
	dialogVisible: false,
});
</script>

<style scoped lang="scss">
.drag-container {
	.drag-dom {
		position: relative;
		display: inline-block;
		.drag-header {
			display: inline-block;
		}
	}
}
</style>
