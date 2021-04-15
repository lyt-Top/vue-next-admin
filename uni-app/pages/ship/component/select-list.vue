<template>
	<view class="sel" v-show="isShow">
		<view v-for="(v, k) in selData" :key="k" @click="selClick(v, k)">
			<view class="title" :class="{ 'font-color': shipSelClickData == v.title }">
				<text class="txt">{{ v.title }}</text>
				<view class="icon" v-if="shipSelClickData == v.title">
					<i class="iconfont">&#xe676;</i>
				</view>
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
		},
		isShow: {
			type: Boolean,
			default: false
		},
		shipSelClickData: {
			type: String,
			default: null
		}
	},
	methods: {
		selClick(data, index) {
			this.$emit('selclick', data);
			this.shipSelClickData = data.title;
		}
	}
};
</script>

<style lang="scss">
.sel {
	font-size: $uni-font-size-lg;
	background-color: white;
	position: fixed;
	top: 100upx;
	width: 100%;
	z-index: 1999;
	padding: 28upx 0;

	.title {
		line-height: 74upx;
		display: flex;
		width: 100%;

		.txt {
			flex: 1;
			padding: 0 28upx;
		}

		.icon {
			flex-basis: 74upx;
			display: flex;
			justify-content: flex-end;
			padding: 0 28upx;
		}
	}

	.font-color {
		color: #188bfe;
	}
}
</style>
