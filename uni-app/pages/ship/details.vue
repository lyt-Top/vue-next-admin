<template>
	<view class="warp">
		<view class="details">
			<view class="title">
				<text class="name font-weight">{{ msg.name }}</text>
				<view class="msg-box">
					<view class="msg">船舶类型：{{ msg.type }}</view>
					<view class="msg right">
						<view class="icon-box"><i class="iconfont icon">&#xe623;</i></view>
						船龄：5年
					</view>
				</view>
			</view>
		</view>

		<view class="details" v-for="(v, k) in detailsList" :key="k">
			<view class="title">
				<text class="name">{{ v.name }}</text>
				<view class="msg-box msg-padding" v-for="(val, key) in v.children" :key="key">
					<view class="msg" v-if="val.title != ''">
						<text class="msg-title">{{ val.title }}</text>
						：{{ val.start }}
					</view>
					<view class="msg" v-if="val.yearName != ''">
						<text class="msg-title">{{ val.yearName }}</text>
						：{{ val.year }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			msg: {},
			detailsList: [
				{
					name: '动态信息',
					children: [
						{
							title: '状态',
							start: '正常航行',
							yearName: '目的地',
							year: '江苏 南京'
						},
						{
							title: '航速',
							start: '70km/h',
							yearName: '经度',
							year: '155.23'
						},
						{
							title: '纬度',
							start: '215.255',
							yearName: '出发时间',
							year: '2019-08-08'
						},
						{
							title: '预计到达',
							start: '2019-08-10',
							yearName: '',
							year: ''
						}
					]
				},
				{
					name: '船舶信息',
					children: [
						{
							title: 'MMSI',
							start: '521521',
							yearName: '驾驶舱位置',
							year: '前置'
						},
						{
							title: '总吨',
							start: '5000t',
							yearName: '净重',
							year: '4000t'
						},
						{
							title: '船长',
							start: '300m',
							yearName: '船宽',
							year: '30m'
						},
						{
							title: '船高',
							start: '115m',
							yearName: '型深',
							year: '100m'
						},
						{
							title: '满载吃水',
							start: '100',
							yearName: '仓容',
							year: '200'
						},
						{
							title: '船口长',
							start: '无',
							yearName: '船口宽',
							year: '无'
						},
						{
							title: '船口深',
							start: '无',
							yearName: '封舱',
							year: '自动封舱'
						},
						{
							title: '打孔',
							start: '无',
							yearName: '建造日期',
							year: '2019-08-08'
						},
						{
							title: '定位导航',
							start: '北斗导航',
							yearName: '摄像头',
							year: '红外线'
						},
						{
							title: '备案',
							start: '无',
							yearName: '类型',
							year: '自由贸易'
						}
					]
				}
			]
		};
	},
	onLoad(option) {
		this.msg = JSON.parse(option.data);
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
}

.warp {
	padding: 28upx 28upx 0;

	.details {
		display: flex;
		background-color: white;
		font-size: $uni-font-size-lg;
		border-radius: 10upx;
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

		.title {
			width: 100%;

			.font-weight {
				font-weight: 700;
			}

			.name {
				height: 100upx;
				display: flex;
				align-items: center;
				border-bottom: 1px dotted #f5f3f3;
				padding: 0 28upx;
			}

			.msg-box {
				display: flex;
				padding: 28upx;

				.msg {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;

					.msg-title {
						color: $titleColor;
					}
				}

				.right {
					display: flex;
					justify-content: flex-end;

					.icon-box {
						background-color: #f9c215;
						margin-right: 10upx;
						width: 40upx;
						height: 40upx;
						border-radius: 100%;
						display: flex;

						.icon {
							margin: auto;
							color: white;
							font-size: $uni-font-size-sm;
						}
					}
				}
			}

			.msg-padding {
				padding: 0 28upx;
				margin: 28upx 0;
			}
		}
	}
}
</style>
