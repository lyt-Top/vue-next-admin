<template>
	<div>
		<el-card shadow="hover" header="web端自定义截屏演示">
			<el-alert
				title="感谢优秀的 `vue-web-screen-shot`，项目地址：https://github.com/likaia/screen-shot"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<ScreenShort ref="screenShortRef" @getBase64="onGetBase64" />
			<el-button type="primary" size="small" @click="onScreenShortClick">
				<SvgIcon name="elementCrop" />
				点击截屏
			</el-button>
		</el-card>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, ref } from 'vue';
import ScreenShort from '/@/components/screenShort/index.vue';
export default {
	name: 'screenShort',
	components: { ScreenShort },
	setup() {
		const screenShortRef = ref();
		const state = reactive({});
		// 截屏点击
		const onScreenShortClick = () => {
			screenShortRef.value.openScreenshot();
		};
		// 获取截屏数据
		const onGetBase64 = (base64: string) => {
			console.log(base64);
		};
		return {
			screenShortRef,
			onScreenShortClick,
			onGetBase64,
			...toRefs(state),
		};
	},
};
</script>
