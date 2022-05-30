<template>
	<div class="drag-container">
		<el-card shadow="hover" header="拖动指令效果（v-drag）作用于 Dialog 对话框">
			<el-button type="primary" @click="dialogVisible = true" size="default">
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

		<el-dialog v-model="dialogVisible" width="769px">
			<template #header>
				<div v-drag="['.drag-container .el-dialog', '.drag-container .el-dialog__header']">拖动指令效果（v-drag）</div>
			</template>
			<p>鼠标放标题头进行 Dialog 对话框拖动</p>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false" size="default">取 消</el-button>
					<el-button type="primary" @click="dialogVisible = false" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent } from 'vue';

export default defineComponent({
	name: 'pagesDrag',
	setup() {
		const state = reactive({
			dialogVisible: false,
		});
		return {
			...toRefs(state),
		};
	},
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
