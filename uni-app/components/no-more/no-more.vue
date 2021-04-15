<template>
	<view class="no-more">
		<view class="no-more-img">
			<image class="img" :src="noMore.imgPath"></image>
			<text class="msg">{{ noMore.msg }}</text>
		</view>
	</view>
</template>

<script>
export default {
	props: ['noMore']
};
</script>

<style lang="scss">
.no-more {
	margin: 100upx 0 28upx;
	padding: 28upx;

	&-img {
		height: 300upx;
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
	}
}
</style>
