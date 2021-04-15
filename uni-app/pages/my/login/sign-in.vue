<template>
	<view class="flex">
		<view class="logo"><image class="photo" src="../../../static/my/logo.png"></image></view>
		<view class="nav">
			<view class="nav-flex" v-for="(v, k) in navList" :key="k" @click="navClick(v, k)">
				<text class="title" :class="{ active: orderIndex == k }">{{ v.title }}</text>
				<view class="border" v-show="v.isShow"></view>
			</view>
		</view>
		<view class="swiper-box">
			<view class="swiper overflow">
				<swiper
					duration="300"
					class="overflow"
					:current="orderIndex"
					@change="swiperChange"
				>
					<swiper-item>
						<scroll-view class="overflow" scroll-y><signCode /></scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="overflow" scroll-y><signPassword /></scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
import signCode from './sign-code';
import signPassword from './sign-password';
export default {
	components: {
		signCode,
		signPassword
	},
	data() {
		return {
			navList: [
				{
					title: '验证码登录',
					isShow: true
				},
				{
					title: '密码登录',
					isShow: false
				}
			],
			orderIndex: 0
		};
	},
	methods: {
		navigateGoTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		isShow(index) {
			this.orderIndex = index;
			for (let item of this.navList) {
				item.isShow = false;
			}
			this.navList[index].isShow = true;
		},
		navClick(data, index) {
			this.isShow(index);
		},
		swiperChange(e) {
			this.isShow(e.detail.current);
		}
	},
	onNavigationBarButtonTap(e) {
		this.navigateGoTo('/pages/my/login/register');
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
	height: 100%;
}

.flex {
	display: flex;
	flex-direction: column;
	height: 100%;

	.logo {
		flex-basis: 350upx;
		display: flex;

		.photo {
			margin: auto;
			width: 299upx;
			height: 168upx;
		}
	}

	.nav {
		flex-basis: 100upx;
		display: flex;
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
		
		&-flex {
			font-size: $uni-font-size-lg;
			display: flex;
			flex: 1;
			margin: auto;
			align-items: center;
			position: relative;

			.title {
				flex: 1;
				text-align: center;
			}

			.border {
				position: absolute;
				width: 70upx;
				height: 5upx;
				background: #198cff;
				top: 68upx;
				left: 50%;
				transform: translateX(-50%);
			}

			.active {
				color: #198cff;
			}
		}
	}

	.swiper-box {
		flex: 1;
	}

	.overflow {
		overflow: auto;
		height: 100%;
	}
}
</style>
