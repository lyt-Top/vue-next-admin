<template>
	<view class="flex-warp">
		<view class="order">
			<view class="flex" v-for="(v, k) in orderNav" :key="k" @click="orderNavClick(v, k)">
				<text class="nav" :class="{ active: orderIndex == k }">{{ v.title }}</text>
				<view class="nav-border" v-show="v.isShow"></view>
			</view>
		</view>
		<view class="swiper overflow">
			<swiper duration="300" class="overflow" :current="orderIndex" @change="swiperChange">
				<swiper-item>
					<scroll-view class="overflow" scroll-y>
						<view><navAll /></view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view class="overflow" scroll-y>
						<view><navShip /></view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view class="overflow" scroll-y>
						<view><navGoods /></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import navAll from './order/nav-all';
import navShip from './order/nav-ship';
import navGoods from './order/nav-goods';
export default {
	// 不支持 `vue` 的动态组件写法，测试未成功, 改用 swiper 组件
	components: {
		navAll,
		navShip,
		navGoods
	},
	data() {
		return {
			orderNav: [
				{
					title: '所有订单',
					isShow: true
				},
				{
					title: '船盘订单',
					isShow: false
				},
				{
					title: '货盘订单',
					isShow: false
				}
			],
			orderIndex: 0
		};
	},
	methods: {
		isShow(index) {
			this.orderIndex = index;
			for (let item of this.orderNav) {
				item.isShow = false;
			}
			this.orderNav[index].isShow = true;
		},
		orderNavClick(data, index) {
			this.isShow(index);
		},
		swiperChange(e) {
			this.isShow(e.detail.current);
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
	height: 100%;
	overflow: hidden;
}

.flex-warp {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;

	.order {
		display: flex;
		height: 100upx;
		background-color: white;
		font-size: $uni-font-size-lg;
		position: relative;

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
			flex: 1;
			display: flex;
			position: relative;

			.nav {
				margin: auto;
			}

			.nav-border {
				position: absolute;
				width: 40upx;
				height: 5upx;
				background: #198cff;
				top: 90upx;
				left: 50%;
				transform: translateX(-50%);
			}

			.active {
				color: #198cff;
			}
		}
	}

	.swiper {
		flex: 1;
	}

	.overflow {
		overflow: auto;
		height: 100%;
	}
}
</style>
