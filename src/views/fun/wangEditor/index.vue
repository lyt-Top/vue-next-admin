<template>
	<div class="editor-container">
		<el-card shadow="hover" header="wangeditor富文本编辑器">
			<el-alert
				title="感谢优秀的 `wangeditor`，项目地址：https://github.com/wangeditor-team/wangEditor"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<div id="wangeditor"></div>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted } from 'vue';
import wangeditor from 'wangeditor';
export default {
	name: 'funWangEditor',
	setup() {
		const state = reactive({});
		// 初始化富文本
		// https://doc.wangeditor.com/
		const initWangeditor = () => {
			const editor = new wangeditor('#wangeditor');
			editor.config.placeholder = '请输入内容';
			editor.config.onchange = (html: string) => {
				console.log(html);
				// console.log(editor.txt.html());
				// console.log(editor.txt.text());
			};
			editor.create();
		};
		// 页面加载时
		onMounted(() => {
			initWangeditor();
		});
		return {
			...toRefs(state),
		};
	},
};
</script>
