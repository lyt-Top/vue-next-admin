<template>
	<div class="editor-container">
		<Toolbar :editor="editorRef" :mode="mode" />
		<Editor :mode="mode" :defaultConfig="editorConfig" :style="{ height }" v-model="editorVal" @onCreated="handleCreated" @onChange="handleChange" />
	</div>
</template>

<script lang="ts">
// https://www.wangeditor.com/v5/for-frame.html#vue3
import '@wangeditor/editor/dist/css/style.css';
import { defineComponent, reactive, toRefs, shallowRef, watch, onBeforeUnmount } from 'vue';
import { Toolbar, Editor } from '@wangeditor/editor-for-vue';

export default defineComponent({
	name: 'wngEditor',
	components: { Toolbar, Editor },
	props: {
		// 是否禁用
		disable: {
			type: Boolean,
			default: () => false,
		},
		// 内容框默认 placeholder
		placeholder: {
			type: String,
			default: () => '请输入内容...',
		},
		// https://www.wangeditor.com/v5/getting-started.html#mode-%E6%A8%A1%E5%BC%8F
		// 模式，可选 <default|simple>，默认 default
		mode: {
			type: String,
			default: () => 'default',
		},
		// 高度
		height: {
			type: String,
			default: () => '310px',
		},
		// 双向绑定，用于获取 editor.getHtml()
		getHtml: String,
		// 双向绑定，用于获取 editor.getText()
		getText: String,
	},
	emits: ['update:getHtml', 'update:getText'],
	setup(props, { emit }) {
		const editorRef = shallowRef();
		const state = reactive({
			editorConfig: {
				placeholder: props.placeholder,
			},
			editorVal: props.getHtml,
		});
		// 编辑器回调函数
		const handleCreated = (editor: any) => {
			editorRef.value = editor;
		};
		// 编辑器内容改变时
		const handleChange = (editor: any) => {
			emit('update:getHtml', editor.getHtml());
			emit('update:getText', editor.getText());
		};
		// 监听是否禁用改变
		// https://gitee.com/lyt-top/vue-next-admin/issues/I4LM7I
		watch(
			() => props.disable,
			(bool) => {
				const editor = editorRef.value;
				if (editor == null) return;
				bool ? editor.disable() : editor.enable();
			},
			{
				deep: true,
			}
		);
		// 页面销毁时
		onBeforeUnmount(() => {
			const editor = editorRef.value;
			if (editor == null) return;
			editor.destroy();
		});
		return {
			editorRef,
			handleCreated,
			handleChange,
			...toRefs(state),
		};
	},
});
</script>
