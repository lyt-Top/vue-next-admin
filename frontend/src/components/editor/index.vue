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
			default: () => true,
		},
		// 内容框默认 placeholder
		placeholder: {
			type: String,
			default: () => '请输入内容...',
		},
		// 双向绑定：双向绑定值，字段名为固定，改了之后将不生效
		// 参考：https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
		modelValue: String,
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
	},
	setup(props, { emit }) {
		const editorRef = shallowRef();
		const state = reactive({
			editorConfig: {
				placeholder: props.placeholder,
			},
			editorVal: props.modelValue,
		});
		// 编辑器回调函数
		const handleCreated = (editor: any) => {
			editorRef.value = editor;
		};
		// 编辑器内容改变时
		const handleChange = (editor: any) => {
			// console.log(editor.getText());
			// console.log(editor.getHtml());
			emit('update:modelValue', editor.getHtml());
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
