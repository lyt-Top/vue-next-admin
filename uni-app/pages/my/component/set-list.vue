<template>
	<view>
		<view class="set-function" v-for="(v, k) in selData" :key="k" @click="setClick(v, k)">
			<view class="set-function-list">
				<text class="title">{{ v.title }}</text>
				<view class="arrow"><i class="iconfont">&#xe644;</i></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		selData: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		navigateGoTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		setClick(data, index) {
			this.navigateGoTo(data.path);
		}
	}
};
</script>

<style lang="scss">
.set-function {
	height: 100upx;
	display: flex;
	align-items: center;
	padding: 0 28upx;

	&:first-of-type {
		margin-top: 28upx;
	}

	&-list {
		display: flex;
		width: 100%;

		.title {
			flex: 1;
			font-size: $uni-font-size-lg;
		}

		.arrow {
			flex-basis: 50upx;
			text-align: right;
			color: $titleColor;

			i {
				font-size: 30upx;
			}
		}
	}
}
</style>
