<template>
	<view>
		<view class="all" v-if="order.length > 0">
			<view class="all-warp" v-for="(v, k) in order" :key="k">
				<view class="all-flex">
					<view class="item">货物：{{ v.type }}</view>
					<view class="item">重量：{{ v.weight }}</view>
					<view
						class="item right"
						:class="{
							red: v.status == '待装货',
							orange: v.status == '未发货',
							green: v.status == '已到达'
						}"
					>
						{{ v.status }}
					</view>
				</view>
				<view class="all-content">
					<view class="all-box" v-for="(val, key) in v.children" :key="key">
						<view class="title">{{ val.title }}</view>
						<view class="msg">{{ val.msg }}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else><noMore :no-more="noMore" /></view>
	</view>
</template>

<script>
// 不支持 `vue` filters
import noMore from '@/components/no-more/no-more';
export default {
	props: {
		order: {
			type: Array,
			default: () => []
		}
	},
	components: {
		noMore
	},
	data() {
		return {
			noMore: {
				imgPath: '../../static/index/update.png',
				msg: '暂时还没有相关订单呦~'
			}
		};
	}
};
</script>

<style lang="scss">
.all {
	padding: 28upx;

	&-warp {
		background-color: white;
		border-radius: 10upx;
		display: flex;
		flex-direction: column;
		margin-bottom: 28upx;
		position: relative;

		&::after {
			content: '';
			border: 1px solid $border-size-color;
			position: absolute;
			width: 200%;
			height: 200%;
			left: 0;
			top: 0;
			transform: scale(0.5);
			box-sizing: border-box;
			transform-origin: left top;
			border-radius: 10upx;
		}

		.all-flex {
			height: 100upx;
			display: flex;
			align-items: center;
			border-bottom: 1px dotted #f5f3f3;
			padding: 0 28upx;

			.item {
				flex: 1;
				font-size: $uni-font-size-lg;
			}

			.right {
				display: flex;
				justify-content: flex-end;
			}

			.red {
				color: red;
			}

			.orange {
				color: orange;
			}

			.green {
				color: green;
			}
		}
	}

	&-warp:last-of-type {
		margin-bottom: 0;
	}

	&-content {
		padding: 28upx;

		.all-box {
			display: flex;
			font-size: $uni-font-size-lg;
			line-height: 64upx;

			.title {
				flex-basis: 230upx;
			}

			.msg {
				flex: 1;
			}
		}
	}
}
</style>
