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
						placeholder-style="color:#c0c0c0"
					/>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="uni-input">
					<view class="title">新密码</view>
					<input
						class="input"
						type="password"
						placeholder="输入6-16位密码"
						maxlength="16"
						placeholder-style="color:#c0c0c0"
					/>
					<view class="see">
						<view class="del-icon" v-if="isShow">
							<i class="iconfont" @click="isShow = !isShow">&#xe7ac;</i>
						</view>
						<view class="del-icon" v-else>
							<i class="iconfont" @click="isShow = !isShow">&#xe7af;</i>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="uni-input">
					<view class="title">确认密码</view>
					<input
						class="input"
						type="password"
						placeholder="再次输入6-16位密码"
						maxlength="6"
						placeholder-style="color:#c0c0c0"
					/>
					<view class="see">
						<view class="del-icon" v-if="isShow1">
							<i class="iconfont" @click="isShow1 = !isShow1">&#xe7ac;</i>
						</view>
						<view class="del-icon" v-else>
							<i class="iconfont" @click="isShow1 = !isShow1">&#xe7af;</i>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" class="btn-color" @click="confirm">确认</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			code: '获取验证码',
			disabled: false,
			isShow: true,
			isShow1: true
		};
	},
	methods: {
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
				delta: 1
			});
		},
		confirm() {
			if (this.value == '') {
				this.showToast('请您填写相关信息', 'none');
				return;
			}
			this.showToast('密码找回成功', 'success');
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
page {
	background-color: $page-bg-color;
	height: 100%;
}

.form-warp {
	padding: 60upx 0 80upx;

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
				transform: scaleY(0.5);
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

			.see {
				flex-basis: 30upx;
				display: flex;
				justify-content: flex-end;

				.del-icon {
					color: #198cff;

					i {
						font-size: 47upx;
					}
				}
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
}
</style>
