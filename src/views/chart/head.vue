<template>
	<div class="big-data-up mb15">
		<div class="up-left">
			<i class="el-icon-time mr5"></i>
			<span>{{ state.time.txt }}</span>
		</div>
		<div class="up-center">
			<span>智慧农业系统平台</span>
		</div>
	</div>
</template>

<script setup lang="ts" name="chartHead">
import { reactive, onBeforeMount, onUnmounted } from 'vue';
import { formatDate } from '/@/utils/formatTime';

// 定义变量内容
const state = reactive({
	time: {
		txt: '',
		fun: 0,
	},
});

// 初始化时间
const initTime = () => {
	state.time.txt = formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS WWW QQQQ');
	state.time.fun = window.setInterval(() => {
		state.time.txt = formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS WWW QQQQ');
	}, 1000);
};
// 页面加载前
onBeforeMount(() => {
	initTime();
});
// 页面卸载时
onUnmounted(() => {
	window.clearInterval(state.time.fun);
});
</script>

<style scoped lang="scss">
.big-data-up {
	height: 55px;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0 15px;
	color: var(--el-color-primary);
	overflow: hidden;
	position: relative;
	.up-left {
		position: absolute;
	}
	.up-center {
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 18px;
		letter-spacing: 5px;
		background-image: -webkit-linear-gradient(
			left,
			var(--el-color-primary),
			var(--el-color-primary-light-3) 25%,
			var(--el-color-primary) 50%,
			var(--el-color-primary-light-3) 75%,
			var(--el-color-primary)
		);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
		background-size: 200% 100%;
		-webkit-animation: masked-animation-data-v-b02d8052 4s linear infinite;
		animation: masked-animation-data-v-b02d8052 4s linear infinite;
		-webkit-box-reflect: below -2px -webkit-gradient(linear, left top, left bottom, from(transparent), to(hsla(0, 0%, 100%, 0.1)));
		position: relative;
		@keyframes masked-animation {
			0% {
				background-position: 0 0;
			}
			100% {
				background-position: -100% 0;
			}
		}
		position: relative;
		&::after {
			content: '';
			width: 250px;
			position: absolute;
			bottom: -15px;
			left: 50%;
			transform: translateX(-50%);
			border: 1px transparent solid;
			border-image: linear-gradient(to right, var(--el-color-primary-light-9), var(--el-color-primary)) 1 10;
		}
		span {
			cursor: pointer;
		}
	}
}
</style>
