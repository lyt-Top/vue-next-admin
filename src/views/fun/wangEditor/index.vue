<template>
	<div class="editor-container">
		<el-card shadow="hover" header="wangeditor富文本编辑器">
			<el-alert
				title="感谢优秀的 `wangeditor`，项目地址：https://github.com/wangeditor-team/wangEditor"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<Editor :is-disable="false" v-model="editorVal" />
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, defineComponent } from 'vue';
import Editor from '/@/components/editor/index.vue';

export default defineComponent({
	name: 'funWangEditor',
	components: { Editor },
	setup() {
		const state = reactive({
			editorVal: '',
		});
		// 页面加载时
		onMounted(() => {});
		return {
			...toRefs(state),
		};
	},
});
</script>
