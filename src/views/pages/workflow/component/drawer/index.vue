<template>
	<div>
		<el-drawer :title="`${nodeData.type === 'line' ? '线' : '节点'}操作`" v-model="isOpen" size="320px">
			<el-scrollbar>
				<Line v-if="nodeData.type === 'line'" @change="onLineChange" @close="close" ref="lineRef" />
				<Node v-else @submit="onNodeSubmit" @close="close" ref="nodeRef" />
			</el-scrollbar>
		</el-drawer>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, nextTick } from 'vue';
import Line from './line.vue';
import Node from './node.vue';

// 定义接口来定义对象的类型
interface WorkflowDrawerState {
	isOpen: boolean;
	nodeData: {
		type: string;
	};
	jsplumbConn: any;
}

export default defineComponent({
	name: 'pagesWorkflowDrawer',
	components: { Line, Node },
	setup(props, { emit }) {
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
		const open = (item: any, conn: any) => {
			state.isOpen = true;
			state.jsplumbConn = conn;
			state.nodeData = item;
			nextTick(() => {
				if (item.type === 'line') lineRef.value.getParentData(item);
				else nodeRef.value.getParentData(item);
			});
		};
		// 关闭
		const close = () => {
			state.isOpen = false;
		};
		// 线 label 内容改变时
		const onLineChange = (label: any) => {
			state.jsplumbConn.label = label;
			emit('label', state.jsplumbConn);
		};
		// 节点内容改变时
		const onNodeSubmit = (data: object) => {
			emit('node', data);
		};
		return {
			lineRef,
			nodeRef,
			open,
			close,
			onLineChange,
			onNodeSubmit,
			...toRefs(state),
		};
	},
});
</script>
