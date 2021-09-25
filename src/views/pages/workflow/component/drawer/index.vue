<template>
	<el-drawer :title="`${nodeData.type === 'line' ? '线' : '节点'}操作`" v-model="isOpen" size="320px">
		<el-scrollbar>
			<pre>{{ nodeData }}</pre>
		</el-scrollbar>
	</el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
	name: 'pagesWorkflowDrawer',
	setup() {
		const state = reactive({
			isOpen: false,
			nodeData: {
				type: 'node',
			},
		});
		// 打开抽屉
		const open = (item) => {
			state.nodeData = item;
			state.isOpen = true;
		};
		// 关闭
		const close = () => {
			state.isOpen = false;
		};
		return {
			open,
			close,
			...toRefs(state),
		};
	},
});
</script>
