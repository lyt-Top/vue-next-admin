<template>
	<div>
		<screen-short v-if="screenshotStatus" @destroy-component="destroyComponent" @get-image-data="getImageData"></screen-short>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, onUnmounted } from 'vue';
export default defineComponent({
	name: 'screenShortComponent',
	setup(props, { emit }) {
		const state = reactive({
			screenshotStatus: false,
		});
		// 打开截屏
		const openScreenshot = () => {
			state.screenshotStatus = true;
			onMonitorKeyup();
		};
		// 销毁组件函数
		const destroyComponent = (status: boolean) => {
			state.screenshotStatus = status;
		};
		// 获取裁剪区域图片信息
		const getImageData = (base64: string) => {
			emit('getBase64', base64);
		};
		// 监听键盘 `esc` 按下
		const onMonitorKeyup = () => {
			if (!state.screenshotStatus) return false;
			window.addEventListener('keydown', (e: any) => {
				if (e.keyCode === 27) destroyComponent();
			});
		};
		// 页面销毁时
		onUnmounted(() => {
			window.removeEventListener('keydown', () => {});
		});
		return {
			openScreenshot,
			destroyComponent,
			getImageData,
			onMonitorKeyup,
			...toRefs(state),
		};
	},
});
</script>
