<template>
	<view>
		<view
			class="model"
			@click="modelClick"
			v-show="isShow"
			@touchmove.stop.prevent="moveHandle"
		></view>
		<view class="ship">
			<view class="flex" v-for="(v, k) in shipSel" :key="k" @click="shipSelClick(v, k)">
				<view class="title-icon" :class="{ 'font-color': shipSelIndex == k }">
					<view v-if="k != 2">
						<text class="title">{{ v.title }}</text>
					</view>
					<view v-else><pickerType :sel="picker" @gettime="getTime" /></view>
					<i class="iconfont icon" :class="v.isClick ? 'rotate' : ''">&#xe600;</i>
				</view>
			</view>
		</view>

		<view class="list-margin-top">
			<view class="list" v-for="(v, k) in list" :key="k" @click="goToDetails(v)">
				<view class="list-warp">
					<view class="top">
						<view class="top-left">
							<text class="msg">船港：{{ v.address }}</text>
						</view>
						<view class="top-left">
							<text class="msg">载重：{{ v.tonnage }}</text>
						</view>
					</view>
					<view class="bottom">
						<view class="time">
							<view class="time-flex">
								<text class="msg-time start">开始</text>
								{{ v.startTime }}
							</view>
							<view class="time-flex">
								<text class="border"></text>
								<text class="date">{{ v.surplusTime }}</text>
							</view>
							<view class="time-flex">
								<text class="msg-time end">结束</text>
								{{ v.endTime }}
							</view>
						</view>
						<view class="content">
							<view class="content-left">
								<text class="msg">船型：{{ v.type }}</text>
							</view>
							<view class="content-left">
								<text class="msg">船名：{{ v.name }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<select-list
			:sel-data="selDataList"
			@selclick="selclick"
			:is-show="isShow"
			:ship-sel-click-data="shipSelClickData"
		/>
	</view>
</template>

<script>
import selectList from './component/select-list';
import pickerType from '@/components/picker/picker';
export default {
	components: {
		selectList,
		pickerType
	},
	data() {
		return {
			picker: {
				date: 'date'
			},
			shipSel: [
				{
					title: '始发地',
					isClick: false
				},
				{
					title: '装重吨',
					isClick: false
				},
				{
					title: '空船日期',
					isClick: false
				}
			],
			shipSelIndex: null,
			selDataList: [],
			selData1: [
				{
					title: '不限'
				},
				{
					title: '南非'
				},
				{
					title: '中国'
				},
				{
					title: '美国'
				},
				{
					title: '俄罗斯'
				},
				{
					title: '日本'
				}
			],
			selData2: [
				{
					title: '不限'
				},
				{
					title: '1000吨'
				},
				{
					title: '2000吨'
				},
				{
					title: '3000吨'
				},
				{
					title: '4000吨'
				},
				{
					title: '5000吨'
				},
				{
					title: '5000吨以上'
				}
			],
			isShow: false,
			shipSelClickData: null,

			// 列表数据
			list: [
				{
					address: '江苏 南京',
					tonnage: '2000吨',
					startTime: '8.01',
					endTime: '8.20',
					surplusTime: '20天',
					type: '散货船',
					name: '蛟龙号'
				},
				{
					address: '北京',
					tonnage: '20000吨',
					startTime: '8.02',
					endTime: '8.20',
					surplusTime: '18天',
					type: '集装箱船',
					name: '飞天号'
				},
				{
					address: '广西 南宁',
					tonnage: '10000吨',
					startTime: '8.20',
					endTime: '8.21',
					surplusTime: '1天',
					type: '货船',
					name: '上天号'
				},
				{
					address: '模拟位置',
					tonnage: '200吨',
					startTime: '8.02',
					endTime: '8.20',
					surplusTime: '108天',
					type: '散货船02',
					name: '模拟号'
				},
				{
					address: '广西 南宁',
					tonnage: '10000吨',
					startTime: '8.20',
					endTime: '8.21',
					surplusTime: '1天',
					type: '货船',
					name: '上天号'
				}
			]
		};
	},
	methods: {
		navigateGoTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		shipSelClick(data, index) {
			for (let item of this.shipSel) {
				item.isClick = false;
			}
			data.isClick = true;
			this.shipSelIndex = index;
			this.shipSelClickData = data.title;

			if (index == 0) {
				this.isShow = true;
				this.selDataList = this.selData1;
			} else if (index == 1) {
				this.isShow = true;
				this.selDataList = this.selData2;
			} else {
				this.isShow = false;
			}
		},
		modelClick() {
			this.isShow = false;
		},
		moveHandle() {},
		selclick(data) {
			this.shipSel[this.shipSelIndex].title = data.title;
			this.isShow = !this.isShow;
			uni.showToast({
				icon: 'none',
				title: '数据刷新成功！',
				duration: 2000
			});
		},
		goToDetails(data) {
			this.navigateGoTo('/pages/ship/details?data=' + JSON.stringify(data));
		},

		// 获取子组件日期值
		getTime(date) {
			console.log(date);
		}
	},
	onNavigationBarButtonTap: function(e) {
		this.navigateGoTo('/components/search/search');
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
}

.model {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.1);
	top: 0;
	left: 0;
	z-index: 999;
}

.ship {
	height: 100upx;
	background-color: white;
	display: flex;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 1000;

	&::after {
		content: '';
		background: $border-size-color;
		position: absolute;
		width: 100%;
		height: 1px;
		left: 0;
		bottom: 0;
		transform: scaleY(0.5);
	}

	.flex {
		display: flex;
		align-items: center;
		flex: 1;

		.title-icon {
			margin: auto;
			display: flex;
			align-items: center;

			.title {
				font-size: $uni-font-size-lg;
			}

			.icon {
				font-size: 16upx;
				margin-left: 10upx;
				transition: 0.2s ease;
			}

			.rotate {
				transform: rotate(180deg);
				transform-origin: center;
				transition: 0.2s ease;
			}
		}

		.font-color {
			color: #188bfe;
		}
	}
}

.list-margin-top {
	margin: 100upx 0 28upx;

	.list {
		height: 260upx;
		display: flex;
		padding: 28upx 28upx 0;

		&-warp {
			display: flex;
			flex-direction: column;
			width: 100%;
			background-color: white;
			border-radius: 10upx;
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

			.top {
				flex-basis: 74upx;
				display: flex;

				&-left {
					flex: 1;
					display: flex;
					align-items: center;
					padding: 0 22upx;

					.msg {
						font-size: $uni-font-size-lg;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}
			}

			.bottom {
				border-top: 1px dotted #f5f3f3;
				flex: 1;
				display: flex;
				flex-direction: column;

				.time {
					padding: 0 22upx;
					flex: 1;
					display: flex;

					&-flex {
						display: flex;
						font-size: $uni-font-size-lg;
						align-items: center;

						.msg-time {
							border-radius: 10upx;
							color: white;
						}

						.start {
							background-color: greenyellow;
							margin-right: 10upx;
						}

						.end {
							background-color: red;
							margin-right: 10upx;
						}
					}

					&-flex:first-of-type {
						flex-basis: 147upx;
					}

					&-flex:nth-of-type(2) {
						flex: 1;
						display: flex;
						align-items: center;
						position: relative;
						padding: 0 15upx;

						.border {
							border-top: 1px solid $border-size-color;
							width: 100%;
							height: 1px;

							&::after {
								content: '';
								position: absolute;
								width: 10upx;
								height: 10upx;
								border-radius: 100%;
								border: 1px solid $border-size-color;
								left: 2px;
								top: 50%;
								transform: translateY(-50%);
							}

							&::before {
								content: '';
								width: 10upx;
								height: 10upx;
								border-radius: 100%;
								position: absolute;
								border: 1px solid $border-size-color;
								right: 2px;
								top: 50%;
								transform: translateY(-50%);
							}
						}

						.date {
							position: absolute;
							left: 50%;
							top: 70%;
							transform: translateX(-50%) translateY(-50%);
							color: #cccccc;
						}
					}

					&-flex:last-of-type {
						flex-basis: 147upx;
						justify-content: flex-end;
					}
				}

				.content {
					flex-basis: 74upx;
					display: flex;

					&-left {
						flex: 1;
						display: flex;
						align-items: center;
						padding: 0 22upx;

						.msg {
							font-size: $uni-font-size-base;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
					}
				}
			}
		}
	}
}
</style>
