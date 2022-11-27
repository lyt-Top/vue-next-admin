<template>
	<div>
		<el-drawer :title="`${state.nodeData.type === 'line' ? '线' : '节点'}操作`" v-model="state.isOpen" size="320px">
			<el-scrollbar>
				<Lines v-if="state.nodeData.type === 'line'" @change="onLineChange" @close="close" ref="lineRef" />
				<Nodes v-else @submit="onNodeSubmit" @close="close" ref="nodeRef" />
			</el-scrollbar>
		</el-drawer>
	</div>
</template>

<script setup lang="ts" name="pagesWorkflowDrawer">
import { defineAsyncComponent, reactive, ref, nextTick } from 'vue';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['label', 'node']);

// 引入组件
const Lines = defineAsyncComponent(() => import('./line.vue'));
const Nodes = defineAsyncComponent(() => import('./node.vue'));

// 定义变量内容
const lineRef = ref();
const nodeRef = ref();
const state = reactive<WorkflowDrawerState>({
	isOpen: false,
	nodeData: {
		type: 'node',
	},
	jsplumbConn: {},
});

// 打开抽屉
const open = (item: WorkflowDrawerLabelType, conn: EmptyObjectType) => {
	state.isOpen = true;
	state.jsplumbConn = conn;
	state.nodeData = item;
	nextTick(() => {
		setTimeout(() => {
			if (item.type === 'line') lineRef.value.getParentData(item);
			else nodeRef.value.getParentData(item);
		}, 300);
	});
};
// 关闭
const close = () => {
	state.isOpen = false;
};
// 线 label 内容改变时
const onLineChange = (label: string) => {
	state.jsplumbConn.label = label;
	emit('label', state.jsplumbConn);
};
// 节点内容改变时
const onNodeSubmit = (data: object) => {
	emit('node', data);
};

// 暴露变量
defineExpose({
	open,
});
</script>
