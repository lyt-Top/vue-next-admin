<template>
	<div class="login-scan-container">
		<div ref="qrcodeRef"></div>
		<div class="font12 mt20 login-msg">{{ $t('message.scan.text') }}</div>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import QRCode from 'qrcodejs2-fixes';

export default defineComponent({
	name: 'loginScan',
	setup() {
		const qrcodeRef = ref<HTMLElement | null>(null);
		// 初始化生成二维码
		const initQrcode = () => {
			(qrcodeRef.value as HTMLElement).innerHTML = '';
			new QRCode(qrcodeRef.value, {
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
		return { qrcodeRef };
	},
});
</script>

<style scoped lang="scss">
.login-scan-animation {
	opacity: 0;
	animation-name: error-num;
	animation-duration: 0.5s;
	animation-fill-mode: forwards;
}
.login-scan-container {
	padding: 20px;
	display: flex;
	flex-direction: column;
	text-align: center;
	@extend .login-scan-animation;
	animation-delay: 0.1s;
	::v-deep(img) {
		margin: auto;
	}
	.login-msg {
		color: var(--el-text-color-placeholder);
		@extend .login-scan-animation;
		animation-delay: 0.2s;
	}
}
</style>
