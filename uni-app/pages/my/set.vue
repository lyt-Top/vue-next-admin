<template>
	<view>
		<view v-if="isShow != '去登录'">
			<setList :sel-data="setListData" />
			<view class="uni-padding-wrap uni-common-mt">
				<button type="primary" class="btn-color" @click="singOut">退出登录</button>
			</view>
		</view>
		<view v-else>
			<view class="phone">
				<image class="img" src="../../static/my/phone.png"></image>
			</view>
			<view class="text"><text class="txt color">您还未登录，登录查看更多功能</text></view>
			<view class="btn"><text class="btn-msg" @click="goToSignIn">去登录</text></view>
		</view>
	</view>
</template>

<script>
import setList from './component/set-list';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
export default {
	components: {
		setList
	},
	data() {
		return {
			setListData: [
				{
					title: '资料修改',
					path: '/pages/my/set/my-info-update'
				},
				{
					title: '修改密码',
					path: '/pages/my/set/password'
				},
				{
					title: '手机号绑定',
					path: '/pages/my/set/phone'
				},
				{
					title: '昵称修改',
					path: '/pages/my/set/nickname'
				}
			],
			isShow: ''
		};
	},
	methods: {
		...mapActions(['setUserInfo']),
		navigateGoTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		singOut() {
			uni.showModal({
				title: '提示',
				content: '是否退出登录？',
				success: res => {
					if (res.confirm) {
						let info = {
							photo: '../../static/my/logo.png',
							name: '去登录',
							isRenz: '未认证',
							badge: 10
						};
						this.setUserInfo(info);
						uni.navigateBack({
							delta: 1
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		goToSignIn() {
			this.navigateGoTo('/pages/my/login/sign-in');
		}
	},
	onLoad(option) {
		this.isShow = option.title;
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
}

.uni-padding-wrap {
	margin-top: 28upx;
	padding: 0 28upx;

	.btn-color {
		color: #fff;
		background-color: #198cff;
	}
}

.phone {
	display: flex;
	margin-top: 174upx;

	.img {
		margin: auto;
		width: 243upx;
		height: 274upx;
	}
}

.text {
	display: flex;
	flex-direction: column;
	font-size: $uni-font-size-lg;
	padding: 28upx 0;

	.txt {
		margin: auto;
		line-height: 64upx;
	}

	.color {
		color: $titleColor;
	}
}

.btn {
	display: flex;

	&-msg {
		border: 1px solid #198cff;
		color: #198cff;
		margin: auto;
		padding: 20upx 70upx;
		border-radius: 10upx;
		font-size: $uni-font-size-lg;
	}
}
</style>
