<template>
	<div class="qrcode-container">
		<el-card shadow="hover" header="qrcodejs2 二维码生成">
			<el-alert
				title="感谢优秀的 `qrcodejs2`，项目地址：https://github.com/davidshimjs/qrcodejs"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<div class="qrcode-img-warp">
				<div class="mb30 mt30 qrcode-img">
					<div class="qrcode" ref="qrcodeRef"></div>
				</div>
				<el-button type="primary" size="default" @click="onInitQrcode">
					<el-icon>
						<ele-Refresh />
					</el-icon>
					重新生成
				</el-button>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, getCurrentInstance, defineComponent } from 'vue';
import QRCode from 'qrcodejs2-fixes';

export default defineComponent({
	name: 'funQrcode',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			qrcode: '',
		});
		// 初始化生成二维码
		const initQrcode = () => {
			new QRCode(proxy.$refs.qrcodeRef, {
				text: `https://lyt-top.gitee.io/vue-next-admin-preview/#/login?t=${new Date().getTime()}`,
				width: 125,
				height: 125,
				colorDark: '#000000',
				colorLight: '#ffffff',
			});
		};
		// 重新生成
		const onInitQrcode = () => {
			proxy.$refs.qrcodeRef.innerHTML = '';
			initQrcode();
		};
		// 页面加载时
		onMounted(() => {
			initQrcode();
		});
		return {
			onInitQrcode,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.qrcode-container {
	.qrcode-img-warp {
		text-align: center;
		.qrcode-img {
			display: flex;
			width: 100%;
			height: 125px;
			.qrcode {
				margin: auto;
				width: 125px;
				height: 125px;
			}
		}
	}
}
</style>
