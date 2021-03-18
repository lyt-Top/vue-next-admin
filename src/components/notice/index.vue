<template>
	<div class="notice-container">
		<ul class="notice-ul" :class="directionStyle">
			<li v-for="(v, k) in noticeList" :key="k" class="notice-li">
				{{ v }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onBeforeMount, onUnmounted } from 'vue';
export default {
	name: 'notice',
	props: {
		// 滚动方向 可选值"<upper|right|lower|left>"
		direction: {
			type: String,
			default: () => 'lower',
		},
	},
	setup(props) {
		console.log(props);
		const state = reactive({
			noticeList: ['asdasds', 'bbbbb'],
			isScroll: false,
			directionStyle: '',
		});
		// 初始化通知滚动
		const initNoticeScroll = () => {
			window.setInterval(onNoticeScroll, 2000);
		};
		// 处理通知滚动数据
		const onNoticeScroll = () => {
			const { direction } = props;
			if (direction === 'upper') setDirectionStyle();
			state.isScroll = true;
			if (direction === 'lower') setDirectionStyle();
			window.setTimeout(() => {
				if (direction === 'upper') {
					state.noticeList.push(state.noticeList[0]);
					state.noticeList.shift();
				} else if (direction === 'lower') {
					state.noticeList.unshift(state.noticeList[state.noticeList.length - 1]);
					state.noticeList.pop();
				}
				state.isScroll = false;
				setDirectionStyle();
			}, 500);
		};
		// 动态设置方向样式
		const setDirectionStyle = () => {
			const { direction } = props;
			if (direction === 'upper') {
				state.isScroll ? (state.directionStyle = 'notice-ul-upper') : (state.directionStyle = '');
				console.log(1111);
			} else if (direction === 'lower') {
				state.isScroll ? (state.directionStyle = 'notice-ul-lower') : (state.directionStyle = '');
			}
			console.log(state.directionStyle);
		};
		// 页面加载前
		onBeforeMount(() => {
			initNoticeScroll();
		});
		// 页面卸载时
		onUnmounted(() => {
			window.clearInterval();
		});
		return {
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.notice-container {
	position: relative;
	height: 40px;
	display: block;
	position: relative;
	overflow: hidden;
	.notice-ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: block;
		position: absolute;
		width: 100%;
		.notice-li {
			height: 40px;
			line-height: 40px;
			color: #3a3a3a;
			background-color: #ffe4ca;
			padding: 0 15px;
			cursor: pointer;
		}
	}
	.notice-ul-upper {
		transition: all 0.5s;
		margin-top: -40px;
		top: 0;
		left: 0;
	}
	.notice-ul-lower {
		transition: all 0.5s;
		margin-bottom: -40px;
		bottom: 0;
		left: 0;
	}
}
</style>
