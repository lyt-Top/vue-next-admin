<template>
	<view>
		<view class="feedback">
			<view class="uni-textarea">
				<textarea @input="bindTextAreaBlur" :placeholder="placeholder" />
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<input
				class="uni-input"
				type="number"
				placeholder="请留下您的联系方式(选填)"
				maxlength="11"
			/>
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
			placeholder: '感谢您使用XXX，使用过程中有任何服务意见或者问题，请反馈给我们。',
			value: ''
		};
	},
	methods: {
		bindTextAreaBlur(e) {
			this.value = e.detail.value;
		},
		showToast(msg, type) {
			uni.showToast({
				icon: type,
				title: msg,
				duration: 2000
			});
		},
		confirm() {
			if (this.value == '') {
				this.showToast('请您填写相关信息', 'none');
				return;
			}
			this.showToast('反馈成功', 'success');
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/my/my'
				});
			}, 2000);
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
}

.feedback {
	padding: 28upx;
	display: flex;

	.uni-textarea {
		width: 100%;
		font-size: $uni-font-size-lg;
		display: flex;

		textarea {
			flex: 1;
			padding: 28upx;
			height: 350upx;
			background-color: white;
			border-radius: 10upx;
		}
	}
}

.uni-form-item {
	padding: 0 28upx 28upx;

	.uni-input {
		border-radius: 10upx;
		padding: 28upx;
		background-color: white;
		font-size: $uni-font-size-lg;
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
