<template>
	<el-card shadow="hover" header="复制剪切演示">
		<el-alert
			title="感谢优秀的 `vue-clipboard3`，项目地址：https://github.com/JamieCurnow/vue-clipboard3`"
			type="success"
			:closable="false"
			class="mb15"
		></el-alert>
		<el-input placeholder="请输入内容" v-model="copyVal">
			<template #append>
				<el-button @click="copyText(copyVal)">复制链接</el-button>
			</template>
		</el-input>
		<el-input placeholder="先点击上方 `复制链接` 按钮，然后 `Ctrl + V` 进行粘贴！ " v-model="shearVal" class="mt15"> </el-input>
	</el-card>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent } from 'vue';
import commonFunction from '/@/utils/commonFunction';

export default defineComponent({
	name: 'funClipboard',
	setup() {
		const { copyText } = commonFunction();
		const state = reactive({
			copyVal: 'https://gitee.com/lyt-top/vue-next-admin',
			shearVal: '',
		});
		// 页面加载时
		onMounted(() => {});
		return {
			copyText,
			...toRefs(state),
		};
	},
});
</script>
