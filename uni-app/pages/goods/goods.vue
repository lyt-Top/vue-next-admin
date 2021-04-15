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
							<text class="msg">货物：{{ v.name }}</text>
						</view>
						<view class="top-left">
							<text class="msg">重量：{{ v.tonnage }}</text>
						</view>
					</view>
					<view class="bottom">
						<view class="time">
							<view class="time-flex color">{{ v.startTime }}</view>
							<view class="time-flex"><text class="border"></text></view>
							<view class="time-flex color">{{ v.endTime }}</view>
						</view>
						<view class="content">
							<view class="content-left">
								<text class="msg">装载日期：{{ v.surplusTime }}</text>
							</view>
							<view class="content-left right">
								<text class="msg">有效天数：{{ v.type }}</text>
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
		></select-list>
	</view>
</template>

<script>
import selectList from '../ship/component/select-list';
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
					title: '所属分类',
					isClick: false
				},
				{
					title: '排列方式',
					isClick: false
				},
				{
					title: '装载日期',
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
					title: '黄金'
				},
				{
					title: '木材'
				},
				{
					title: '碳钎维'
				},
				{
					title: '石头'
				},
				{
					title: '重金属'
				}
			],
			selData2: [
				{
					title: '综合排序'
				},
				{
					title: '好评优先'
				},
				{
					title: '配送最快'
				},
				{
					title: '配送费最低'
				},
				{
					title: '人均从低到高'
				},
				{
					title: '人均从高到低'
				},
				{
					title: '通用排序'
				}
			],
			isShow: false,
			shipSelClickData: null,

			// 列表数据
			list: [
				{
					name: '木材',
					tonnage: '10000吨',
					startTime: '广西 南宁',
					endTime: '广东 深圳',
					surplusTime: '2019-01-01',
					type: '2天'
				},
				{
					name: '石头',
					tonnage: '2000吨',
					startTime: '江苏 南京',
					endTime: '广东 广州',
					surplusTime: '2019-02-01',
					type: '20天'
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

					.color {
						color: #198cff;
					}

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

					.right {
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
}
</style>
