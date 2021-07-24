<template>
	<div class="login-scan-container">
		<div class="login-scan-qrcode" ref="qrcodeRef"></div>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted, getCurrentInstance } from 'vue';
import QRCode from 'qrcodejs2-fixes';
export default defineComponent({
	name: 'login11',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({});
		// 初始化生成二维码
		const initQrcode = () => {
			proxy.$refs.qrcodeRef.innerHTML = '';
			new QRCode(proxy.$refs.qrcodeRef, {
				text: `https://qm.qq.com/cgi-bin/qm/qr?k=RdUY97Vx0T0vZ_1OOu-X1yFNkWgDwbjC&jump_from=webapi`,
				width: 260,
				height: 260,
				colorDark: '#000000',
				colorLight: '#ffffff',
			});
		};
		// 页面加载时
		onMounted(() => {
			initQrcode();
		});
		return {
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.login-scan-container {
	.login-scan-qrcode {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -40%);
	}
}
</style>
