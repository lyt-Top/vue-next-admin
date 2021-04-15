<template>
	<view class="content">
		<view class="user">
			<view class="user-content">
				<view class="user-content-warp">
					<view class="user-photo"><image class="photo" :src="userInfo.photo"></image></view>
					<view class="user-info">
						<view class="user-info-nane" @click="goToMyInfo">
							<text>{{ userInfo.name }}</text>
							<i class="iconfont name-arrow">&#xe644;</i>
						</view>
						<view class="user-info-nane authentication">
							<i class="iconfont">&#xe68b;</i>
							<text class="txt">{{ userInfo.isRenz }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tabs">
			<view class="tabs-warp" v-for="(v, k) in tabsList" :key="k" @click="handleTabs(v, k)">
				<view class="tabs-warp-item">
					<text class="value">{{ v.value }}</text>
					<text class="title">{{ v.title }}</text>
				</view>
			</view>
		</view>
		<view class="table-list">
			<view class="table-list-warp" v-for="(v, k) in tableList" :key="k" @click="handleTable(v, k)">
				<view class="icon" :style="'color:' + v.color">
					<i class="iconfont">{{ v.icon }}</i>
				</view>
				<view class="title">
					<text>{{ v.title }}</text>
				</view>
				<view class="arrow"><i class="iconfont">&#xe644;</i></view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			tabsList: [],
			tableList: [],
			userInfo: {}
		};
	},
	computed: {
		...mapState(['usersInfo', 'tabssList', 'tablesList'])
	},
	created() {
		this.userInfo = this.usersInfo.info;
		this.tabsList = this.tabssList.list;
		this.tableList = this.tablesList.list;
	},

	// https://uniapp.dcloud.io/frame?id=应用生命周期
	/*
	 * 监听页面显示（可使用此方法监听页面数据的刷新）
	 */
	onShow() {
		this.setTimeoutFn();
	},
	methods: {
		setTimeoutFn() {
			this.userInfo = this.usersInfo.info;
		},
		handleTabs(data, index) {
			switch (index) {
				case 0:
					this.switchTab('/pages/ship/ship');
					break;
				case 1:
					this.switchTab('/pages/goods/goods');
					break;
				case 2:
					this.navigateGoTo('/pages/index/order');
					break;
			}
		},
		handleTable(data, index) {
			this.navigateGoTo(data.path);
		},
		navigateGoTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		switchTab(url) {
			uni.switchTab({
				url: url
			});
		},
		goToMyInfo() {
			this.userInfo.name == '去登录' ? this.navigateGoTo('/pages/my/login/sign-in') : this.navigateGoTo('/pages/my/my-info');
		}
	},
	onNavigationBarButtonTap: function(e) {
		JSON.stringify(e.index) == '1' ? this.navigateGoTo('/pages/my/set?title=' + this.userInfo.name) : this.navigateGoTo('/pages/my/info');
	}
};
</script>

<style lang="scss">
.content {
	height: 380upx;
	background: url(../../static/my/banner.png) no-repeat;
	background-size: 100% 380upx;

	.user {
		height: 380upx;
		padding: 0 28upx;
		display: flex;

		&-content {
			margin: auto;
			display: flex;
			width: 100%;
			padding-top: 28upx;

			&-warp {
				width: 100%;
				display: flex;

				.user-photo {
					width: 133upx;
					height: 133upx;
					border-radius: 100%;
					border: 2px solid #a3d1ff;

					.photo {
						width: 133upx;
						height: 133upx;
						border-radius: 100%;
					}
				}

				.user-info {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding-left: 28upx;
					color: #d3e4ff;

					&-nane {
						display: flex;
						align-items: center;

						.name-arrow {
							flex: 1;
							display: flex;
							justify-content: flex-end;
						}
					}

					.authentication {
						i {
							color: #ffb000;
						}

						.txt {
							padding-left: 20upx;
							font-size: 28upx;
						}
					}
				}
			}
		}
	}

	.tabs {
		height: 200upx;
		display: flex;
		justify-content: space-around;
		width: 80%;
		margin: auto;

		&-warp {
			flex: 1;
			display: flex;

			&-item {
				display: flex;
				flex-direction: column;
				margin: auto;
				text-align: center;
				font-size: $uni-font-size-lg;

				.value {
					color: #198cff;
					font-weight: bold;
					padding-bottom: 10upx;
				}

				.title {
					color: $titleColor;
				}
			}
		}
	}

	.table-list {
		border-top: 1px solid #edf6ff;

		&-warp {
			height: 100upx;
			padding: 0 28upx;
			display: flex;
			align-items: center;

			.icon {
				flex-basis: 40upx;
				margin-right: 20upx;
			}

			.title {
				flex: 1;
				font-size: $uni-font-size-lg;
			}

			.arrow {
				flex-basis: 50upx;
				text-align: right;
				color: $titleColor;

				i {
					font-size: 30upx;
				}
			}
		}

		&-warp:first-of-type {
			margin-top: 28upx;
		}
	}
}
</style>
