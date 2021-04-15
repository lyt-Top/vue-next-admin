<template>
	<view>
		<view class="uni-form-item uni-column">
			<input
				class="uni-input"
				type="number"
				placeholder="请输入您的手机号"
				maxlength="11"
				@input="eventHandle"
			/>
		</view>
		<view class="uni-form-item uni-column flex">
			<input class="uni-input input" type="number" placeholder="请输入验证码" maxlength="6" />
			<view class="btn" @click="getCode" :class="disabled ? 'btn-color' : ''">
				{{ code }}
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" class="btn-color" @click="confirm">确定</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			code: '获取验证码',
			disabled: false
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
		navigateBack() {
			uni.navigateBack({
				delta: 2
			});
		},
		confirm() {
			if (this.value == '') {
				this.showToast('请您填写相关信息', 'none');
				return;
			}
			this.showToast('修改成功', 'success');
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
}

.uni-form-item {
	padding: 28upx 28upx 0 28upx;
	position: relative;

	.uni-input {
		padding: 28upx 0;
		font-size: $uni-font-size-lg;
		border-bottom: 1px dotted #e1e7f0;
	}

	.input {
		border-bottom: none;
	}

	.btn {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background-color: #198cff;
		color: white;
		border-radius: 10upx;
		padding: 20upx;
		font-size: $uni-font-size-lg;
	}

	.btn-color {
		background-color: #e1e7f0;
		color: #a0a0a0;
	}
}

.flex {
	display: flex;
	border-bottom: 1px dotted #e1e7f0;
	margin: 0 28upx;
	padding: 28upx 0 0 0;
}

.uni-padding-wrap {
	margin-top: 28upx;
	padding: 0 28upx;

	.btn-color {
		color: #fff;
		background-color: #198cff;
	}
}
</style>
