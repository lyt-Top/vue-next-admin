<template>
	<view>
		<view class="form-warp">
			<view class="uni-form-item uni-column">
				<view class="uni-input">
					<view class="title">手机号</view>
					<input
						class="input"
						type="number"
						placeholder="请输入手机号"
						maxlength="11"
						@input="eventHandle"
						placeholder-style="color:#c0c0c0"
					/>
					<view class="br-left" @click="getCode" :class="disabled ? 'btn-color' : ''">
						{{ code }}
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="uni-input">
					<view class="title">验证码</view>
					<input
						class="input"
						type="number"
						placeholder="请输入验证码"
						maxlength="6"
						@input="eventHandle"
						placeholder-style="color:#c0c0c0"
					/>
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" class="btn-color" @click="confirm">登录</button>
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
		confirm() {
			if (this.value == '') {
				this.showToast('请您填写相关信息', 'none');
				return;
			}
			this.showToast('登录成功', 'success');

			let info = {
				photo: '../../static/my/user.png',
				name: '黎颖图(验证码登录跳转)',
				isRenz: '去认证',
				badge: 7
			};
			this.setUserInfo(info);
			setTimeout(() => {
				this.navigateBack();
			}, 700);
		},
		getCode() {
			if (this.value == '') {
				this.showToast('请输入您的手机号码', 'none');
				return;
			}
			if (this.disabled == false) {
				let num = 60,
					time = setInterval(() => {
						num--;
						this.code = '剩余 ' + num + ' s';
						if (num == 0) {
							this.code = '获取验证码';
							clearInterval(time);
							this.disabled = false;
						}
					}, 1000);
				this.disabled = true;
			}
		}
	}
};
</script>

<style lang="scss">
.form-warp {
	margin: 60upx 0 80upx;

	.uni-form-item {
		padding: 10upx 28upx;

		.uni-input {
			padding: 28upx 0;
			font-size: $uni-font-size-lg;
			display: flex;
			align-items: center;
			position: relative;
			
			&::after {
				content: '';
				background: $border-size-color;
				position: absolute;
				width: 100%;
				height: 1px;
				left: 0;
				bottom: 0;
				transform: scaleY(0.6);
			}

			.title {
				flex-basis: 170upx;
			}

			.br-left {
				flex-basis: 170upx;
				border-left: 1px solid #e1e7f0;
				padding-left: 28upx;
				display: flex;
				justify-content: flex-end;
			}

			.btn-color {
				color: #a0a0a0;
			}

			.input {
				flex: 1;
			}
		}
	}
}

.uni-padding-wrap {
	padding: 0 28upx;

	.btn-color {
		color: #fff;
		background-color: #198cff;
	}
	
	.btn-msg {
		display: flex;
		justify-content: flex-end;
		font-size: $uni-font-size-lg;
		padding: 28upx 0;
	}
}
</style>
