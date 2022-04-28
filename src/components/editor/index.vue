<template>
	<div class="editor-container">
		<div id="editor-toolbar"></div>
		<div :id="id" :style="{ height }"></div>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, watch, defineComponent } from 'vue';
import { createEditor, createToolbar, IEditorConfig, IToolbarConfig, IDomEditor } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';
import { toolbarKeys } from './toolbar';

// 定义接口来定义对象的类型
interface WangeditorState {
	editor: any;
}

export default defineComponent({
	name: 'wngEditor',
	props: {
		// 节点 id
		id: {
			type: String,
			default: () => 'wangeditor',
		},
		// 是否禁用
		isDisable: {
			type: Boolean,
			default: () => false,
		},
		// 内容框默认 placeholder
		placeholder: {
			type: String,
			default: () => '请输入内容',
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
		const state = reactive<WangeditorState>({
			editor: null,
		});
		// 富文本配置
		const wangeditorConfig = () => {
			const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} };
			props.isDisable ? (editorConfig.readOnly = true) : (editorConfig.readOnly = false);
			editorConfig.placeholder = props.placeholder;
			editorConfig.onChange = (editor: IDomEditor) => {
				// console.log('content', editor.children);
				// console.log('html', editor.getHtml());
				emit('update:modelValue', editor.getHtml());
			};
			(<any>editorConfig).MENU_CONF['uploadImage'] = {
				base64LimitSize: 10 * 1024 * 1024,
			};
			return editorConfig;
		};
		//
		const toolbarConfig = () => {
			const toolbarConfig: Partial<IToolbarConfig> = {};
			toolbarConfig.toolbarKeys = toolbarKeys;
			return toolbarConfig;
		};
		// 初始化富文本
		// https://www.wangeditor.com/
		const initWangeditor = () => {
			state.editor = createEditor({
				html: props.modelValue,
				selector: `#${props.id}`,
				config: wangeditorConfig(),
				mode: props.mode,
			});
			createToolbar({
				editor: state.editor,
				selector: '#editor-toolbar',
				mode: props.mode,
				config: toolbarConfig(),
			});
		};
		// 页面加载时
		onMounted(() => {
			initWangeditor();
		});
		// 监听双向绑定值的改变
		// https://gitee.com/lyt-top/vue-next-admin/issues/I4LM7I
		watch(
			() => props.modelValue,
			(value) => {
				state.editor.clear();
				state.editor.dangerouslyInsertHtml(value);
			}
		);
		return {
			...toRefs(state),
		};
	},
});
</script>
