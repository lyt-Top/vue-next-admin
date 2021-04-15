<template>
	<view class="uni-padding-wrap">
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper
					class="swiper swiper-height"
					indicator-dots="true"
					autoplay="true"
					circular="true"
					indicator-color="rgba(255, 255, 255, .3)"
					indicator-active-color="#ffffff"
					interval="5000"
					duration="500"
				>
					<swiper-item v-for="(v, k) in swiperList" :key="k">
						<view class="swiper-item uni-bg-red">
							<image class="swiper-item-img" :src="v.imgPath"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			swiperList: [
				{
					imgPath: '../../static/index/swiper1.png'
				},
				{
					imgPath: '../../static/index/swiper2.png'
				},
				{
					imgPath: '../../static/index/swiper3.png'
				}
			]
		};
	},
	methods: {}
};
</script>

<style lang="scss">
.uni-padding-wrap {
	height: 400upx;

	.page-section-spacing {
		.swiper-height {
			height: 400upx;
		}

		.swiper-item {
			&-img {
				width: 100%;
				height: 400upx;
			}
		}
	}
}
</style>
