<template>
	<view id="demo">
		<view>
			<scroll-view
				:scroll-top="scrollTop"
				scroll-y="true"
				@scroll="scroll"
				:lower-threshold="50"
				:style="{ height: height }"
			>
				<view class="scroll-view-item uni-bg-red" ref="bbb">A</view>
			</scroll-view>
		</view>
		<view class="uni-link uni-center uni-common-mt" @tap="goTop" v-show="isShow">
			点我跳到对应的锚点
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			height: null,
			isShow: false
		};
	},
	mounted() {
		this.getSystem();
	},
	methods: {
		// https://uniapp.dcloud.io/api/system/info
		getSystem() {
			uni.getSystemInfo({
				success: res => {
					console.log(res.windowHeight);
					this.height = res.windowHeight + 50 + 'px';
				}
			});
		},
		scroll: function(e) {
			console.log(e);
			this.old.scrollTop = e.detail.scrollTop;
			if (e.detail.scrollTop > 100) {
				this.isShow = true;
			} else {
				this.isShow = false;
			}
		},
		// @tap="goTop"
		goTop: function(e) {
			this.scrollTop = this.old.scrollTop;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
			uni.showToast({
				icon: 'none',
				title: '纵向滚动 scrollTop 值已被修改为 ' + this.scrollTop
			});
		}
	}
};
</script>

<style lang="scss">
page {
	position: fixed;
	height: 100%;
	width: 100%;
	overflow: hidden;

	#demo {
		height: 100%;
		overflow: auto;

		.scroll-view-item {
			height: 1200px;
		}

		.uni-bg-red {
			background-color: red;
		}
	}
}
</style>
