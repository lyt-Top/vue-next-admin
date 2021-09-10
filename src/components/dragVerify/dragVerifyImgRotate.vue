<template>
	<div class="drag-verify-container">
		<div :style="dragVerifyImgStyle">
			<img ref="checkImg" :src="imgsrc" class="check-img" :class="{ goOrigin: isOk }" @load="checkimgLoaded" :style="imgStyle" alt="" />
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
	name: 'dragVerify',
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
		showTips: {
			type: Boolean,
			default: true,
		},
		successTip: {
			type: String,
			default: '验证通过',
		},
		failTip: {
			type: String,
			default: '验证失败',
		},
		diffDegree: {
			type: Number,
			default: 10,
		},
		minDegree: {
			type: Number,
			default: 90,
		},
		maxDegree: {
			type: Number,
			default: 270,
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
				height: this.width + 'px',
				position: 'relative',
				overflow: 'hidden',
				'border-radius': '50%',
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
		factor: function () {
			//避免指定旋转角度时一直拖动到最右侧才验证通过
			if (this.minDegree == this.maxDegree) {
				return Math.floor(1 + Math.random() * 6) / 10 + 1;
			}
			return 1;
		},
	},
	data() {
		return {
			isMoving: false,
			x: 0,
			isOk: false,
			showBar: false,
			showErrorTip: false,
			ranRotate: 0,
			cRotate: 0,
			imgStyle: {},
		};
	},
	methods: {
		checkimgLoaded: function () {
			//生成旋转角度
			var minDegree = this.minDegree;
			var maxDegree = this.maxDegree;
			var ranRotate = Math.floor(minDegree + Math.random() * (maxDegree - minDegree)); //生成随机角度
			this.ranRotate = ranRotate;
			console.log('旋转' + ranRotate);
			this.imgStyle = {
				transform: `rotateZ(${ranRotate}deg)`,
			};
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
				console.log(_x, '_x');
				var handler = this.$refs.handler;
				handler.style.left = _x + 'px';
				this.$refs.progressBar.style.width = _x + this.height / 2 + 'px';
				var cRotate = Math.ceil((_x / (this.width - this.height)) * this.maxDegree * this.factor);
				console.log(cRotate, 'cRotate');
				this.cRotate = cRotate;
				var rotate = this.ranRotate - cRotate;
				this.imgStyle = {
					transform: `rotateZ(${rotate}deg)`,
				};
			}
		},
		dragFinish: function (e) {
			if (this.isMoving && !this.isPassing) {
				if (Math.abs(this.ranRotate - this.cRotate) > this.diffDegree) {
					this.isOk = true;
					this.imgStyle = {
						transform: `rotateZ(${this.ranRotate}deg)`,
					};
					var that = this;
					setTimeout(function () {
						that.$refs.handler.style.left = '0';
						that.$refs.progressBar.style.width = '0';
						that.isOk = false;
					}, 500);
					this.showErrorTip = true;
					this.$emit('passfail');
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
.goOrigin {
	transition: transform 0.5s;
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
	border-radius: 50%;
}
.move-bar {
	position: absolute;
	z-index: 100;
}
.clip-bar {
	position: absolute;
	background: rgba(255, 255, 255, 0.8);
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
	bottom: 25px;
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
.check-img {
	width: 100%;
	border-radius: 50%;
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
