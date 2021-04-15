<template>
	<view>
		<view class="my-info">
			<view class="bg"></view>
			<view class="photo-box">
				<view class="photo-box-info">
					<image class="photo" src="../../static/my/user.png"></image>
					<view class="txt">
						<i class="iconfont icon">&#xe68b;</i>
						web前端工程师
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="warp" v-for="(v, k) in list" :key="k">
				<view class="title">{{ v.title }}</view>
				<view class="value">{{ v.value }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					title: '用户名',
					value: 'YY'
				},
				{
					title: '所在地',
					value: '广西-南宁-青秀区'
				},
				{
					title: '性別',
					value: '男'
				},
				{
					title: '手机号',
					value: '12345678910'
				},
				{
					title: '生日',
					value: '2019年1月1日'
				},
				{
					title: 'QQ',
					value: '2233506808'
				},
				{
					title: '邮箱',
					value: '2233506808@qq.com'
				}
			]
		};
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
}

.my-info {
	height: 300upx;
	display: flex;
	flex-direction: column;
	margin-bottom: 40upx;

	.bg {
		background-color: #198cff;
		flex: 1;
	}

	.photo-box {
		flex: 1;
		display: flex;

		&-info {
			margin: auto;
			display: flex;
			flex-direction: column;

			.photo {
				width: 150upx;
				height: 150upx;
				border-radius: 100%;
				margin: -110upx auto 28upx;
			}

			.txt {
				display: flex;
				font-size: $uni-font-size-lg;

				.icon {
					padding-right: 20upx;
					color: #ffb000;
				}
			}
		}
	}
}

.list {
	background-color: white;
	display: flex;
	flex-direction: column;
	font-size: $uni-font-size-lg;
	padding: 28upx;

	.warp {
		display: flex;
		border-bottom: 1px dotted $list-br-color;
		padding: 28upx 0;

		&:last-of-type {
			border-bottom: none;
		}

		.title {
			flex: 1;
		}

		.value {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			color: $titleColor;
		}
	}
}
</style>
