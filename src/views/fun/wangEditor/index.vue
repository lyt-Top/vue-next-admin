<template>
	<div class="editor-container layout-pd">
		<el-card shadow="hover" header="wangeditor富文本编辑器">
			<el-alert
				title="感谢优秀的 `wangeditor`，项目地址：https://github.com/wangeditor-team/wangEditor"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<Editor v-model:get-html="state.editor.htmlVal" v-model:get-text="state.editor.textVal" :disable="state.editor.disable" />
		</el-card>
	</div>
</template>

<script setup lang="ts" name="funWangEditor">
import { defineAsyncComponent, reactive } from 'vue';

// 引入组件
const Editor = defineAsyncComponent(() => import('/@/components/editor/index.vue'));

// 定义变量内容
const state = reactive({
	editor: {
		htmlVal:
			'<p><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">胡歌，1982年9月20日出生于上海市徐汇区，中国内地影视男演员、流行乐歌手，</span><a href="https://baike.baidu.com/item/%E6%B0%91%E7%9B%9F/1971441?fromModule=lemma_inlink" target="_blank" style="text-indent: 28px; text-align: start;">民盟</a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">盟员</span><span style="color: rgb(51, 102, 204); background-color: rgb(255, 255, 255); font-size: 12px;"><sup> [1]</sup></span><a href="" target="" style="text-indent: 28px; text-align: start;"> </a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;"> ，毕业于</span><a href="https://baike.baidu.com/item/%E4%B8%8A%E6%B5%B7%E6%88%8F%E5%89%A7%E5%AD%A6%E9%99%A2/1736818?fromModule=lemma_inlink" target="_blank" style="text-indent: 28px; text-align: start;">上海戏剧学院</a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">表演系。</span></p>',
		textVal: '胡歌，1982年9月20日出生于上海市徐汇区，中国内地影视男演员、流行乐歌手，民盟盟员 [1]  ，毕业于上海戏剧学院表演系。',
		disable: false,
	},
});
</script>
