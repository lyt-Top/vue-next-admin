<template>
	<div class="editor-container layout-pd">
		<el-card shadow="hover" header="wangeditor富文本编辑器">
			<el-alert
				title="感谢优秀的 `wangeditor`，项目地址：https://github.com/wangeditor-team/wangEditor"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<Editor v-model="editor.value" :disable="editor.disable" />
		</el-card>
	</div>
</template>

<script lang="ts">
import { defineAsyncComponent, toRefs, reactive, defineComponent } from 'vue';

export default defineComponent({
	name: 'funWangEditor',
	components: {
		Editor: defineAsyncComponent(() => import('/@/components/editor/index.vue')),
	},
	setup() {
		const state = reactive({
			editor: {
				value: '<p><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">胡歌，1982年9月20日出生于上海市徐汇区，中国内地影视男演员、流行乐歌手，</span><a href="https://baike.baidu.com/item/%E6%B0%91%E7%9B%9F/1971441?fromModule=lemma_inlink" target="_blank" style="text-indent: 28px; text-align: start;">民盟</a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">盟员</span><span style="color: rgb(51, 102, 204); background-color: rgb(255, 255, 255); font-size: 12px;"><sup> [1]</sup></span><a href="" target="" style="text-indent: 28px; text-align: start;"> </a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;"> ，毕业于</span><a href="https://baike.baidu.com/item/%E4%B8%8A%E6%B5%B7%E6%88%8F%E5%89%A7%E5%AD%A6%E9%99%A2/1736818?fromModule=lemma_inlink" target="_blank" style="text-indent: 28px; text-align: start;">上海戏剧学院</a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">表演系。</span></p>',
				disable: false,
			},
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
