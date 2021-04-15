<template>
	<view>
		<view class="logo"><image class="photo" src="../../../static/my/logo.png"></image></view>
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
			<view class="uni-form-item uni-column">
				<view class="uni-input">
					<view class="title">用户名</view>
					<input
						class="input"
						type="text"
						placeholder="请输入您的用户名"
						maxlength="6"
						placeholder-style="color:#c0c0c0"
					/>
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" class="btn-color" @click="confirm">注册</button>
			<view class="btn-msg" @click="protocolClick">
				<view class="checkbox">
					<text class="isCheckbox" :class="isCheckbox ? 'active' : ''"></text>
				</view>
				我同意用户注册
				<text class="protocol" @click="goToProtocol">《服务条款》</text>
				协议
			</view>
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
			isShow1: true,
			isCheckbox: false
		};
	},
	methods: {
		protocolClick() {
			this.isCheckbox = !this.isCheckbox;
		},
		goToProtocol() {
			this.navigateGoTo('/pages/my/about/clause');
		},
		eventHandle(e) {
			this.value = e.detail.value;
		},
		navigateGoTo(url) {
			uni.navigateTo({
				url: url
			});
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
				this.showToast('请您输入用户名', 'none');
				return;
			}
			this.navigateGoTo('/pages/my/login/register-success');
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

.logo {
	height: 350upx;
	display: flex;

	.photo {
		margin: auto;
		width: 299upx;
		height: 168upx;
	}
}

.form-warp {
	margin: 0upx 0 80upx;

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

	.btn-msg {
		font-size: $uni-font-size-base;
		padding: 28upx 0;
		color: $uni-text-color-grey;
		display: flex;
		align-items: center;

		.protocol {
			color: #198cff;
		}

		.checkbox {
			border: 1px solid #198cff;
			border-radius: 100%;
			width: 34upx;
			height: 34upx;
			box-sizing: border-box;
			margin-right: 10upx;
			padding: 3upx;

			.isCheckbox {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
		}

		.active {
			background-color: #198cff;
		}
	}
}
</style>
