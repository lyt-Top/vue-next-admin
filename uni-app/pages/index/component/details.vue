<template>
	<view>
		<view class="details">
			<image class="img" :src="list.cover"></image>
			<view class="title">
				<text class="txt">{{ list.title }}</text>
			</view>
		</view>
		<view class="msg-box">
			<text class="date">{{ list.author_name }} 发表于 {{ list.published_at }}</text>
			<view class="msg"><view v-html="list.content"></view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: {}
		};
	},
	onLoad(option) {
		uni.request({
			url: this.apiUrl + 'api/news/36kr/' + option.post_id,
			data: {},
			success: res => {
				if (res.statusCode == 200) {
					this.list = res.data;
					uni.setNavigationBarTitle({
						title: res.data.summary
					});
				}
			}
		});
	}
};
</script>

<style lang="scss">
.details {
	height: 400upx;
	position: relative;
	overflow: hidden;

	.img {
		width: 100%;
		height: 420upx;
	}

	.title {
		position: absolute;
		color: white;
		padding: 28upx;
		font-size: $uni-font-size-lg;
		bottom: 0;
	}
}

.msg-box {
	padding: 28upx;

	.date {
		font-size: $uni-spacing-row-lg;
		line-height: 70upx;
		color: $titleColor;
	}

	.msg {
		font-size: $uni-spacing-row-lg;
		line-height: 60upx;
	}
}
</style>
