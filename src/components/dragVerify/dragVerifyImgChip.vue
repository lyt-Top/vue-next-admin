<template>
	<div class="drag-verify-container">
		<div :style="dragVerifyImgStyle">
			<img ref="checkImg" crossOrigin="anonymous" :src="imgsrc" @load="checkimgLoaded" style="width: 100%" alt="" />
			<canvas ref="maincanvas" class="main-canvas"></canvas>
			<canvas ref="movecanvas" :class="{ goFirst: isOk, goKeep: isKeep }" class="move-canvas"></canvas>
			<div class="refresh" v-if="showRefresh && !isPassing">
				<i :class="refreshIcon" @click="refreshimg"></i>
			</div>
			<div class="tips success" v-if="showTips && isPassing">{{ successTip }}</div>
			<div class="tips danger" v-if="showTips && !isPassing && showErrorTip">{{ failTip }}</div>
		</div>
		<div
			ref="dragVerify"
			class="drag_verify"
			:style="dragVerifyStyle"
			@mousemove="dragMoving"
			@mouseup="dragFinish"
			@mouseleave="dragFinish"
			@touchmove="dragMoving"
			@touchend="dragFinish"
		>
			<div class="dv_progress_bar" :class="{ goFirst2: isOk }" ref="progressBar" :style="progressBarStyle">
				{{ successMessage }}
			</div>
			<div class="dv_text" :style="textStyle" ref="message">
				{{ message }}
			</div>

			<div
				class="dv_handler dv_handler_bg"
				:class="{ goFirst: isOk }"
				@mousedown="dragStart"
				@touchstart="dragStart"
				ref="handler"
				:style="handlerStyle"
			>
				<i :class="handlerIcon"></i>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'dragVerifyImgChip',
	props: {
		isPassing: {
			type: Boolean,
			default: false,
		},
		width: {
			type: Number,
			default: 250,
		},
		height: {
			type: Number,
			default: 40,
		},
		text: {
			type: String,
			default: 'swiping to the right side',
		},
		successText: {
			type: String,
			default: 'success',
		},
		background: {
			type: String,
			default: '#eee',
		},
		progressBarBg: {
			type: String,
			default: '#76c61d',
		},
		completedBg: {
			type: String,
			default: '#76c61d',
		},
		circle: {
			type: Boolean,
			default: false,
		},
		radius: {
			type: String,
			default: '4px',
		},
		handlerIcon: {
			type: String,
		},
		successIcon: {
			type: String,
		},
		handlerBg: {
			type: String,
			default: '#fff',
		},
		textSize: {
			type: String,
			default: '14px',
		},
		textColor: {
			type: String,
			default: '#333',
		},
		imgsrc: {
			type: String,
		},
		barWidth: {
			type: Number,
			default: 40,
		},
		barRadius: {
			type: Number,
			default: 8,
		},
		showRefresh: {
			type: Boolean,
			default: false,
		},
		refreshIcon: {
			type: String,
		},
		showTips: {
			type: Boolean,
			default: true,
		},
		successTip: {
			type: String,
			default: '验证通过，超过80%用户',
		},
		failTip: {
			type: String,
			default: '验证未通过，拖动滑块将悬浮图像正确合并',
		},
		diffWidth: {
			type: Number,
			default: 20,
		},
	},
	mounted: function () {
		const dragEl = this.$refs.dragVerify;
		dragEl.style.setProperty('--textColor', this.textColor);
		dragEl.style.setProperty('--width', Math.floor(this.width / 2) + 'px');
		dragEl.style.setProperty('--pwidth', -Math.floor(this.width / 2) + 'px');
	},
	computed: {
		handlerStyle: function () {
			return {
				width: this.height + 'px',
				height: this.height + 'px',
				background: this.handlerBg,
			};
		},
		message: function () {
			return this.isPassing ? '' : this.text;
		},
		successMessage: function () {
			return this.isPassing ? this.successText : '';
		},
		dragVerifyStyle: function () {
			return {
				width: this.width + 'px',
				height: this.height + 'px',
				lineHeight: this.height + 'px',
				background: this.background,
				borderRadius: this.circle ? this.height / 2 + 'px' : this.radius,
			};
		},
		dragVerifyImgStyle: function () {
			return {
				width: this.width + 'px',
				position: 'relative',
				overflow: 'hidden',
			};
		},
		progressBarStyle: function () {
			return {
				background: this.progressBarBg,
				height: this.height + 'px',
				borderRadius: this.circle ? this.height / 2 + 'px 0 0 ' + this.height / 2 + 'px' : this.radius,
			};
		},
		textStyle: function () {
			return {
				height: this.height + 'px',
				width: this.width + 'px',
				fontSize: this.textSize,
			};
		},
	},
	data() {
		return {
			isMoving: false,
			x: 0,
			isOk: false,
			isKeep: false,
			clipBarx: 0,
			showErrorTip: false,
		};
	},
	methods: {
		draw: function (ctx, x, y, operation) {
			var l = this.barWidth;
			var r = this.barRadius;
			const PI = Math.PI;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
			ctx.lineTo(x + l, y);
			ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
			ctx.lineTo(x + l, y + l);
			ctx.lineTo(x, y + l);
			ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
			ctx.lineTo(x, y);
			ctx.lineWidth = 2;
			ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
			ctx.stroke();
			ctx[operation]();
			ctx.globalCompositeOperation = 'destination-over';
		},
		checkimgLoaded: function () {
			// 生成图片缺失位置
			var barWidth = this.barWidth;
			var imgHeight = this.$refs.checkImg.height;
			var imgWidth = this.$refs.checkImg.width;
			var halfWidth = Math.floor(this.width / 2);
			var refreshHeigth = 25;
			var tipHeight = 20;
			var x = halfWidth + Math.ceil(Math.random() * (halfWidth - barWidth - this.barRadius - 5));
			var y = refreshHeigth + Math.floor(Math.random() * (imgHeight - barWidth - refreshHeigth - tipHeight));
			this.$refs.maincanvas.setAttribute('width', imgWidth);
			this.$refs.maincanvas.setAttribute('height', imgHeight);
			this.$refs.maincanvas.style.display = 'block';
			var canvasCtx = this.$refs.maincanvas.getContext('2d');
			this.draw(canvasCtx, x, y, 'fill');
			this.clipBarx = x;
			var moveCanvas = this.$refs.movecanvas;
			moveCanvas.setAttribute('width', imgWidth);
			moveCanvas.setAttribute('height', imgHeight);
			this.$refs.movecanvas.style.display = 'block';
			const L = barWidth + this.barRadius * 2 + 3; //实际宽度
			var moveCtx = this.$refs.movecanvas.getContext('2d');
			moveCtx.clearRect(0, 0, imgWidth, imgHeight);
			this.draw(moveCtx, x, y, 'clip');
			moveCtx.drawImage(this.$refs.checkImg, 0, 0, imgWidth, imgHeight);
			var y = y - this.barRadius * 2 - 1;
			const ImageData = moveCtx.getImageData(x, y, L, L);
			moveCanvas.setAttribute('width', L);
			moveCanvas.setAttribute('height', imgHeight);
			moveCtx.putImageData(ImageData, 0, y);
		},
		dragStart: function (e) {
			if (!this.isPassing) {
				this.isMoving = true;
				this.x = e.pageX || e.touches[0].pageX;
			}
			this.showBar = true;
			this.showErrorTip = false;
			this.$emit('handlerMove');
		},
		dragMoving: function (e) {
			if (this.isMoving && !this.isPassing) {
				var _x = (e.pageX || e.touches[0].pageX) - this.x;
				var handler = this.$refs.handler;
				handler.style.left = _x + 'px';
				this.$refs.progressBar.style.width = _x + this.height / 2 + 'px';
				this.$refs.movecanvas.style.left = _x + 'px';
			}
		},
		dragFinish: function (e) {
			if (this.isMoving && !this.isPassing) {
				var _x = (e.pageX || e.changedTouches[0].pageX) - this.x;
				if (Math.abs(_x - this.clipBarx) > this.diffWidth) {
					this.isOk = true;
					var that = this;
					setTimeout(function () {
						that.$refs.handler.style.left = '0';
						that.$refs.progressBar.style.width = '0';
						that.$refs.movecanvas.style.left = '0';
						that.isOk = false;
					}, 500);
					this.$emit('passfail');
					this.showErrorTip = true;
				} else {
					this.passVerify();
				}
				this.isMoving = false;
			}
		},
		passVerify: function () {
			this.$emit('update:isPassing', true);
			this.isMoving = false;
			var handler = this.$refs.handler;
			handler.children[0].className = this.successIcon;
			this.$refs.progressBar.style.background = this.completedBg;
			this.$refs.message.style['-webkit-text-fill-color'] = 'unset';
			this.$refs.message.style.animation = 'slidetounlock2 3s infinite';
			this.$refs.progressBar.style.color = '#fff';
			this.$refs.progressBar.style.fontSize = this.textSize;
			this.isKeep = true;
			setTimeout(() => {
				this.$refs.movecanvas.style.left = this.clipBarx + 'px';
				setTimeout(() => {
					this.isKeep = false;
					this.$refs.maincanvas.style.display = 'none';
					this.$refs.movecanvas.style.display = 'none';
				}, 200);
			}, 100);
			this.$emit('passcallback');
		},
		reset: function () {
			this.reImg();
			this.checkimgLoaded();
		},
		reImg: function () {
			this.$emit('update:isPassing', false);
			const oriData = this.$options.data();
			for (const key in oriData) {
				if (Object.prototype.hasOwnProperty.call(oriData, key)) {
					this[key] = oriData[key];
				}
			}
			var handler = this.$refs.handler;
			var message = this.$refs.message;
			handler.style.left = '0';
			this.$refs.progressBar.style.width = '0';
			handler.children[0].className = this.handlerIcon;
			message.style['-webkit-text-fill-color'] = 'transparent';
			message.style.animation = 'slidetounlock 3s infinite';
			message.style.color = this.background;
			this.$refs.movecanvas.style.left = '0px';
		},
		refreshimg: function () {
			this.$emit('refresh');
		},
	},
	watch: {
		imgsrc: {
			immediate: false,
			handler: function () {
				this.reImg();
			},
		},
	},
};
</script>
<style scoped>
.drag_verify {
	position: relative;
	background-color: #e8e8e8;
	text-align: center;
	overflow: hidden;
}
.drag_verify .dv_handler {
	position: absolute;
	top: 0px;
	left: 0px;
	cursor: move;
}
.drag_verify .dv_handler i {
	color: #666;
	padding-left: 0;
	font-size: 16px;
}
.drag_verify .dv_handler .el-icon-circle-check {
	color: #6c6;
	margin-top: 9px;
}
.drag_verify .dv_progress_bar {
	position: absolute;
	height: 34px;
	width: 0px;
}
.drag_verify .dv_text {
	position: absolute;
	top: 0px;
	color: transparent;
	-moz-user-select: none;
	-webkit-user-select: none;
	user-select: none;
	-o-user-select: none;
	-ms-user-select: none;
	background: -webkit-gradient(
		linear,
		left top,
		right top,
		color-stop(0, var(--textColor)),
		color-stop(0.4, var(--textColor)),
		color-stop(0.5, #fff),
		color-stop(0.6, var(--textColor)),
		color-stop(1, var(--textColor))
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-text-size-adjust: none;
	animation: slidetounlock 3s infinite;
}
.drag_verify .dv_text * {
	-webkit-text-fill-color: var(--textColor);
}
.goFirst {
	left: 0px !important;
	transition: left 0.5s;
}
.goKeep {
	transition: left 0.2s;
}
.goFirst2 {
	width: 0px !important;
	transition: width 0.5s;
}
.drag-verify-container {
	position: relative;
	line-height: 0;
}
.refresh {
	position: absolute;
	right: 5px;
	top: 5px;
	cursor: pointer;
	font-size: 20px;
	z-index: 200;
}
.tips {
	position: absolute;
	bottom: 0;
	height: 20px;
	line-height: 20px;
	text-align: center;
	width: 100%;
	font-size: 12px;
	z-index: 200;
}
.tips.success {
	background: rgba(255, 255, 255, 0.6);
	color: green;
}
.tips.danger {
	background: rgba(0, 0, 0, 0.6);
	color: yellow;
}
.main-canvas {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
.move-canvas {
	position: absolute;
	top: 0;
	left: 0;
}
</style>
<style>
@-webkit-keyframes slidetounlock {
	0% {
		background-position: var(--pwidth) 0;
	}
	100% {
		background-position: var(--width) 0;
	}
}
@-webkit-keyframes slidetounlock2 {
	0% {
		background-position: var(--pwidth) 0;
	}
	100% {
		background-position: var(--pwidth) 0;
	}
}
</style>
