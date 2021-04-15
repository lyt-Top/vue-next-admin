<template>
	<view>
		<view class="form-warp">
			<view class="uni-form-item uni-column">
				<view class="uni-input">
					<view class="title">账号</view>
					<input
						class="input"
						type="text"
						placeholder="请输入手机号或用户名"
						maxlength="6"
						@input="eventHandle"
						placeholder-style="color:#c0c0c0"
					/>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="uni-input">
					<view class="title">密码</view>
					<input
						class="input"
						type="password"
						placeholder="请输入密码"
						maxlength="18"
						@input="eventHandle"
						placeholder-style="color:#c0c0c0"
					/>
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" class="btn-color" @click="confirm">登录</button>
			<text class="btn-msg" @click="updatePassword">忘记密码？</text>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
export default {
	data() {
		return {
			value: '',
			code: '获取验证码',
			disabled: false
		};
	},
	methods: {
		...mapActions(['setUserInfo']),
		eventHandle(e) {
			this.value = e.detail.value;
		},
		showToast(msg, type) {
			uni.showToast({
				icon: type,
				title: msg,
				duration: 2000
			});
		},
		navigateBack(url) {
			uni.navigateBack({
				delta: 7
			});
		},
		navigateGoTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		confirm() {
			if (this.value == '') {
				this.showToast('请您填写相关信息', 'none');
				return;
			}
			this.showToast('登录成功', 'success');
			let info = {
				photo: '../../static/my/user.png',
				name: '黎颖图(密码登录跳转)',
				isRenz: '去认证',
				badge: 7
			};
			this.setUserInfo(info);
			setTimeout(() => {
				this.navigateBack();
			}, 700);
		},
		updatePassword() {
			this.navigateGoTo('/pages/my/login/update-password')
		}
	}
};
</script>
