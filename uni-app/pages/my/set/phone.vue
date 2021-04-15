<template>
	<view>
		<view class="phone"><image class="img" src="../../../static/my/phone.png"></image></view>
		<view class="text">
			<text class="txt color">您已绑定手机号</text>
			<text class="txt">{{ phone }}</text>
		</view>
		<view class="btn"><text class="btn-msg" @click="goToSetPhone">更换手机号</text></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phone: '12345678910'
		};
	},
	methods: {
		navigateGoTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		goToSetPhone() {
			this.navigateGoTo('/pages/my/set/phone-update');
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
}

.phone {
	display: flex;
	margin-top: 174upx;

	.img {
		margin: auto;
		width: 243upx;
		height: 274upx;
	}
}

.text {
	display: flex;
	flex-direction: column;
	font-size: $uni-font-size-lg;
	padding: 28upx 0;

	.txt {
		margin: auto;
		line-height: 64upx;
	}

	.color {
		color: $titleColor;
	}
}

.btn {
	display: flex;

	&-msg {
		border: 1px solid #198cff;
		color: #198cff;
		margin: auto;
		padding: 20upx 70upx;
		border-radius: 10upx;
		font-size: $uni-font-size-lg;
	}
}
</style>
