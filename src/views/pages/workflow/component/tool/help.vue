<template>
	<div class="workflow-tool-help">
		<el-dialog v-model="isShow" width="769px">
			<template #header>
				<div v-drag="['.workflow-tool-help .el-dialog', '.workflow-tool-help .el-dialog__header']">使用帮助</div>
			</template>
			<div>1、拖入：鼠标移入左侧导航中，鼠标形状改变时拖动到右侧网格状的视图中。</div>
			<div class="mt10">2、移动：鼠标移入到视图中的某个节点元素，鼠标形状改变时拖动改变位置。</div>
			<div class="mt10">3、连线：鼠标移入到视图中的某个节点元素的icon(图标)，鼠标形状改变（变成"+"），按下鼠标左键进行拖线连接。</div>
			<div class="mt10">4、节点：鼠标移入到视图中的某个节点元素，点击鼠标右键可进行删除、编辑节点。</div>
			<div class="mt10 mb10">5、线条：鼠标移入到视图中的某个线条，线条颜色改变时，点击鼠标右键可进行删除、编辑线条。</div>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="pagesWorkflowToolHelp">
import { ref } from 'vue';

// 定义变量内容
const isShow = ref(false);

// 打开弹窗
const open = () => {
	isShow.value = true;
};
// 关闭弹窗
const close = () => {
	isShow.value = false;
};

// 暴露变量
defineExpose({
	open,
	close,
});
</script>
