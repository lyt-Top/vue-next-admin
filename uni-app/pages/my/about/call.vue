<template>
	<view>
		<view class="logo"><image class="photo" src="../../../static/my/logo.png"></image></view>
		<view class="call" v-for="(v, k) in callList" :key="k" @click="callClick(v, k)">
			<view class="left">
				<text class="txt">{{ v.title }}</text>
			</view>
			<view class="left">
				<text class="txt right">{{ v.msg }}</text>
			</view>
		</view>
		<view class="tips">小提示：内容点击可以复制呦~</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			callList: [
				{
					title: '官方微信',
					msg: 'lyt'
				},
				{
					title: '官方电话',
					msg: '0516-5201234'
				},
				{
					title: '官方邮箱',
					msg: 'lyt1105290566@qq.com'
				},
				{
					title: '官方网站',
					msg: 'www.lytSoftware.com'
				}
			]
		};
	},
	methods: {
		callClick(data, index) {
			uni.setClipboardData({
				data: data.msg,
				success: () => {
					if (index == 1) {
						uni.makePhoneCall({
							phoneNumber: data.title
						});
						return;
					}
					uni.showToast({
						title: '复制成功了呦~',
						duration: 2000
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
}
.logo {
	height: 370upx;
	display: flex;

	.photo {
		margin: auto;
		width: 299upx;
		height: 168upx;
	}
}

.call {
	padding: 0 28upx;
	display: flex;
	height: 100upx;

	.left {
		flex: 1;
		display: flex;
		align-items: center;

		.txt {
			font-size: $uni-font-size-lg;
			width: 100%;
		}

		.right {
			display: flex;
			justify-content: flex-end;
		}
	}
}

.tips {
	font-size: $uni-font-size-sm;
	padding: 15upx 28upx;
	color: $titleColor;
}
</style>
