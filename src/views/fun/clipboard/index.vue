<template>
	<div id="printRref">
		<el-card shadow="hover" header="复制剪切演示">
			<el-alert
				title="感谢优秀的 `clipboard`，项目地址：https://github.com/zenorocha/clipboard.js`"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<el-input placeholder="请输入内容" v-model="copyVal">
				<template #append>
					<el-button @click="onCopyClick($event.target)" ref="copyBtnRef">复制链接</el-button>
				</template>
			</el-input>
			<el-input placeholder="先点击上方 `复制链接` 按钮，然后 `Ctrl + V` 进行粘贴！ " v-model="shearVal" class="mt15"> </el-input>
		</el-card>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, ref, onMounted, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import ClipboardJS from 'clipboard';
import { useI18n } from 'vue-i18n';
export default {
	name: 'funClipboard',
	setup() {
		const { t } = useI18n();
		const copyBtnRef = ref();
		const state = reactive({
			copyVal: 'https://gitee.com/lyt-top/vue-next-admin',
			shearVal: '',
		});
		// 复制链接点击
		const onCopyClick = (target: any) => {
			const clipboard = new ClipboardJS(target, {
				text: () => state.copyVal,
			});
			clipboard.on('success', () => {
				ElMessage.success(t('message.layout.copyTextSuccess'));
				clipboard.destroy();
			});
			clipboard.on('error', () => {
				ElMessage.error(t('message.layout.copyTextError'));
				clipboard.destroy();
			});
		};
		// 页面加载时
		onMounted(() => {
			nextTick(() => {
				// 初始化复制功能，防止点击两次才可以复制
				onCopyClick(copyBtnRef.value.$el);
			});
		});
		return {
			copyBtnRef,
			onCopyClick,
			...toRefs(state),
		};
	},
};
</script>
