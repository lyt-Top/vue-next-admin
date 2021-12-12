<template>
	<div class="editor-container">
		<div :id="id"></div>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, watch } from 'vue';
import wangeditor from 'wangeditor';
export default {
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
		// 双向绑定
		// 双向绑定值，字段名为固定，改了之后将不生效
		// 参考：https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
		modelValue: String,
	},
	setup(props, { emit }) {
		const state = reactive({
			editor: null,
		});
		// 初始化富文本
		// https://doc.wangeditor.com/
		const initWangeditor = () => {
			state.editor = new wangeditor(`#${props.id}`);
			state.editor.config.zIndex = 1;
			state.editor.config.placeholder = props.placeholder;
			state.editor.config.uploadImgShowBase64 = true;
			state.editor.config.showLinkImg = false;
			onWangeditorChange();
			state.editor.create();
			state.editor.txt.html(props.modelValue);
			props.isDisable ? state.editor.disable() : state.editor.enable();
		};
		// 内容改变时
		const onWangeditorChange = () => {
			state.editor.config.onchange = (html: string) => {
				emit('update:modelValue', html);
			};
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
				state.editor.txt.html(value);
			}
		);
		return {
			...toRefs(state),
		};
	},
};
</script>
