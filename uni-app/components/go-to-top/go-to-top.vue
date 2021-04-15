<template>
	<view v-show="isShow">
		<view class="top" @tap="goTop">
			<view class="flex">
				<i class="iconfont">&#xe691;</i>
				<text>顶部</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isShow: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		goTop() {
			this.$emit('gotop', 0);
		}
	}
};
</script>

<style lang="scss">
.top {
	position: fixed;
	bottom: 70upx;
	right: 28upx;
	font-size: $uni-font-size-sm;
	background-color: rgba(255, 255, 255, 0.9);
	border: 1px solid #eeeeee;
	border-radius: 100%;
	width: 90upx;
	height: 90upx;
	display: flex;
	flex-direction: column;
	text-align: center;

	.flex {
		margin: auto;
		display: flex;
		flex-direction: column;
	}
}
</style>
