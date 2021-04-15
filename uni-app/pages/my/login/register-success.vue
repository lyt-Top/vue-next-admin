<template>
	<view class="no-more">
		<view class="no-more-img">
			<image class="img" :src="noMore.imgPath"></image>
			<text class="msg">{{ noMore.msg }}</text>
			<view class="time-box">
				<text class="time">{{ noMore.time }} S</text>
				后自动跳转至登录页
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			noMore: {
				imgPath: '../../../static/index/update.png',
				msg: '您已成功注册账号',
				time: 3
			}
		};
	},
	mounted() {
		this.time();
	},
	methods: {
		navigateBack(url) {
			uni.navigateBack({
				delta: 2
			});
		},
		time() {
			let t = setInterval(() => {
				this.noMore.time--;
				if (this.noMore.time === 0) {
					clearInterval(t);
				}
			}, 1000);
			setTimeout(() => {
				this.navigateBack();
			}, 3000);
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
	height: 100%;
}

.no-more {
	height: 100%;

	&-img {
		height: 600upx;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 100upx 0 0 0;

		.img {
			margin: auto;
			width: 203upx;
			height: 190upx;
		}

		.msg {
			font-size: $uni-font-size-lg;
			color: $titleColor;
			text-align: center;
		}

		.time-box {
			font-size: $uni-font-size-lg;
			text-align: center;
			padding: 100upx 0;

			.time {
				color: #198cff;
			}
		}
	}
}
</style>
