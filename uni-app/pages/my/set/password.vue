<template>
	<view>
		<view class="uni-form-item uni-column">
			<input
				class="uni-input"
				type="password"
				placeholder="请输入当前密码"
				maxlength="18"
				@input="eventHandle"
			/>
		</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" type="password" placeholder="请输入新的密码" maxlength="18" />
		</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" type="password" placeholder="请再次输入密码" maxlength="18" />
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
			value: ''
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
				url: url
			});
		},
		confirm() {
			if (this.value == '') {
				this.showToast('请您填写相关信息', 'none');
				return;
			}
			this.showToast('修改成功', 'success');
			setTimeout(() => {
				this.navigateBack('/pages/my/set');
			}, 700);
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

	.uni-input {
		padding: 28upx 0;
		font-size: $uni-font-size-lg;
		border-bottom: 1px dotted #e1e7f0;
	}
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
