<template>
	<view>
		<view class="info-details" v-for="(v, k) in infoDetailsList" :key="k">
			<view class="time-box">
				<text class="time">{{ v.time }}</text>
			</view>
			<view class="content">
				<view class="msg-box">
					<view class="icon-box">
						<view class="icon" :style="'color:' + v.fontColor">
							<i class="iconfont">{{ v.icon }}</i>
						</view>
						<view class="title">
							<text class="title-txt ellipsis">{{ v.title }}</text>
						</view>
					</view>
					<view class="msg">
						<text class="txt ellipsis">{{ v.msg }}</text>
					</view>
				</view>
				<view class="btn">
					<view class="btn-value" @click="see(v)">立即查看</view>
					<view class="arrow"><i class="iconfont">&#xe644;</i></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			infoDetailsList: [
				{
					icon: '\ue604',
					fontColor: 'white',
					title: '客服101 消息提醒',
					time: '2018-08-18 18:15:55',
					msg: '您刚刚发布了一条找船盘信息'
				},
				{
					icon: '\ue794',
					fontColor: 'white',
					title: '客服102 消息提醒',
					time: '2019-08-18 18:15:55',
					msg: '我刚刚发布了一条应聘信息'
				}
			]
		};
	},
	methods: {
		see(data) {
			uni.showToast({
				icon: 'none',
				title: JSON.stringify(data),
				duration: 2000
			});
		}
	},
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: option.title
		});
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f8fe;
}

.info-details {
	display: flex;
	flex-direction: column;
	height: 400upx;
	padding: 60upx 28upx 0;

	.time-box {
		display: flex;
		margin-bottom: 28upx;

		.time {
			width: 300upx;
			height: 38upx;
			background-color: #cddaee;
			border-radius: 28upx;
			font-size: $uni-font-size-base;
			text-align: center;
			color: #fcfdfe;
			padding: 10upx;
			margin: auto;
		}
	}

	.content {
		flex: 1;
		border-radius: 7upx;
		background-color: white;
		display: flex;
		flex-direction: column;

		.msg-box {
			border-bottom: 1px dotted #f5f3f3;
			flex: 1;
			padding: 40upx 28upx;
			display: flex;
			flex-direction: column;

			.icon-box {
				flex: 1;
				display: flex;

				.icon {
					margin: auto;
					width: 80upx;
					height: 80upx;
					line-height: 80upx;
					text-align: center;
					border-radius: 100%;
					background-color: #f9c215;
				}

				.title {
					flex: 1;
					display: flex;
					align-items: center;
					padding: 0 28upx;

					.title-txt {
						font-size: $uni-font-size-lg;
					}
				}
			}

			.msg {
				flex-basis: 60upx;
				display: flex;
				align-items: flex-end;

				.txt {
					font-size: $uni-font-size-base;
					color: $uni-text-color-grey;
				}
			}

			.ellipsis {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}

		.btn {
			height: 100upx;
			line-height: 100upx;
			padding: 0 28upx;
			display: flex;

			&-value {
				flex: 1;
				font-size: $uni-font-size-lg;
			}

			.arrow {
				margin: auto;
				flex-basis: 50upx;
				text-align: right;
				color: $titleColor;

				i {
					font-size: 30upx;
				}
			}
		}
	}
}
</style>
