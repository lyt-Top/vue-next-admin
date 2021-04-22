<template>
	<div>
		<el-card shadow="hover" header="在线签名演示">
			<el-alert
				title="感谢优秀的 `sign-canvas`，项目地址：https://github.com/langyuxiansheng/vue-sign-canvas"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<el-button type="primary" size="small" icon="el-icon-edit" @click="onSignCanvasClick">点击进行签名</el-button>
		</el-card>
		<el-dialog title="在线签名" :visible.sync="signVisible" :close-on-click-modal="true" :close-on-press-escape="true" :width="signDialogWidth">
			<sign-canvas class="sign-canvas" ref="SignCanvas" :options="signOptions" v-model="signValue" />
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="onCancelSign">取消</el-button>
				<el-button type="danger" size="small" @click="onCanvasClear">清空</el-button>
				<el-button type="primary" size="small" @click="onSaveAsImg">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import SignCanvas from 'sign-canvas';
export default {
	name: 'funSignCanvas',
	components: {
		SignCanvas,
	},
	data() {
		return {
			signVisible: false,
			signDialogWidth: '',
			signValue: '',
			signOptions: {
				lastWriteSpeed: 1,
				lastWriteWidth: 2,
				lineCap: 'round',
				lineJoin: 'round',
				canvasWidth: 729,
				canvasHeight: 460,
				isShowBorder: false,
				bgColor: '#E6E6E6',
				borderWidth: 1,
				borderColor: '#ff787f',
				writeWidth: 5,
				maxWriteWidth: 30,
				minWriteWidth: 5,
				writeColor: '#101010',
				isSign: true,
				imgType: 'png',
			},
		};
	},
	mounted() {
		this.initSignConfig();
		window.addEventListener('resize', this.initSignConfig);
	},
	methods: {
		// 初始化配置信息
		initSignConfig() {
			this.signDialogWidth = `${document.body.offsetWidth / 2 + 40}px`;
			this.signOptions.canvasWidth = document.body.offsetWidth / 2;
			this.signOptions.canvasHeight = document.body.offsetHeight / 2;
		},
		// 打开签名弹窗
		onSignCanvasClick() {
			this.signVisible = true;
		},
		// 取消签名
		onCancelSign() {
			this.signVisible = false;
			this.onCanvasClear();
		},
		// 清空签名
		onCanvasClear() {
			this.$refs.SignCanvas.canvasClear();
		},
		// 保存签名
		onSaveAsImg() {
			const img = this.$refs.SignCanvas.saveAsImg();
			console.log(img);
		},
	},
	destroyed() {
		window.removeEventListener('resize', this.initSignConfig);
	},
};
</script>
