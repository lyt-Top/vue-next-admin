<template>
	<view class="info">
		<view class="info-list" v-for="(v, k) in infoList" :key="k" @click="goToDetails(v)">
			<view class="flex-left">
				<view class="flex-left-icon" :style="'color:' + v.color">
					<i class="iconfont">{{ v.icon }}</i>
				</view>
				<view class="badge" v-if="v.value != ''">{{ v.value }}</view>
			</view>
			<view class="flex-centent">
				<view class="flex-centent-txt">
					<text class="txt ellipsis">{{ v.title }}</text>
					<text class="txt-msg ellipsis">{{ v.msg }}</text>
				</view>
			</view>
			<view class="flex-right">
				<view class="arrow"><i class="iconfont">&#xe644;</i></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			infoList: [
				{
					icon: '\ue604',
					color: '#f9c215',
					value: 7,
					title: '客服消息提醒',
					msg: '您有一条新的消息通知'
				},
				{
					icon: '\ue794',
					color: '#198CFF',
					value: '',
					title: '平台消息提醒',
					msg: '暂无最新消息'
				},
				{
					icon: '\ue68f',
					color: 'red',
					value: '10',
					title: '应聘消息提醒',
					msg: '您有一条新的消息通知'
				}
			]
		};
	},
	methods: {
		goToDetails(data) {
			uni.navigateTo({
				url: '/pages/my/info-details?title=' + data.title
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f8fe;
}

.info {
	&-list {
		background-color: #ffffff;
		display: flex;
		height: 126upx;
		margin: 28upx 0;
		padding: 0 28upx;

		.flex-left {
			flex-basis: 77upx;
			display: flex;
			position: relative;

			&-icon {
				background-color: #eef7ff;
				width: 77upx;
				height: 77upx;
				line-height: 77upx;
				text-align: center;
				border-radius: 100%;
				margin: auto;
			}

			.badge {
				position: absolute;
				width: 32upx;
				height: 32upx;
				background-color: red;
				right: -15upx;
				top: 30upx;
				border-radius: 100%;
				font-size: 24upx;
				color: white;
				text-align: center;
			}
		}

		.flex-centent {
			flex: 1;
			padding: 0 28upx;
			display: flex;
			align-items: center;

			&-txt {
				display: flex;
				flex-direction: column;

				.ellipsis {
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.txt {
					font-size: $uni-font-size-lg;
				}

				.txt-msg {
					font-size: $uni-font-size-base;
					color: $uni-text-color-grey;
				}
			}
		}

		.flex-right {
			flex-basis: 50upx;
			display: flex;

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
