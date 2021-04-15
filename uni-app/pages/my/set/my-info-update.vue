<template>
	<view>
		<view class="my-info">
			<view class="bg"></view>
			<view class="photo-box">
				<view class="photo-box-info">
					<image class="photo" src="../../../static/my/user.png"></image>
					<view class="txt">
						<i class="iconfont icon">&#xe68b;</i>
						未认证
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="warp" v-for="(v, k) in list" :key="k" @click="listClick(v, k)">
				<view class="title">{{ v.title }}</view>
				<view class="value">
					<view v-if="v.type == 1" class="flex">
						{{ v.value }}
						<i class="iconfont icon">&#xe644;</i>
					</view>
					<view v-if="v.type == 0" class="flex">
						<input
							class="uni-input"
							placeholder="请输入内容"
							:value="v.value"
							maxlength="18"
							placeholder-style="color:#c0c0c0"
						/>
						<i class="iconfont icon">&#xe671;</i>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" class="btn-color" @click="confirm">保存</button>
		</view>

		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			@onCancel="onCancel"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
		<mpvue-city-picker
			:themeColor="themeColor"
			ref="mpvueCityPicker"
			:pickerValueDefault="cityPickerValueDefault"
			@onCancel="onCancel"
			@onConfirm="onConfirm"
		></mpvue-city-picker>
	</view>
</template>

<script>
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
import cityData from '../../../common/city.data.js';
export default {
	components: {
		mpvuePicker,
		mpvueCityPicker
	},
	data() {
		return {
			list: [
				{
					title: '用户名',
					value: 'YY',
					type: 0
				},
				{
					title: '所在地',
					value: '广西壮族自治区-南宁-青秀区',
					type: 1
				},
				{
					title: '性別',
					value: '男',
					type: 1
				},
				{
					title: '手机号',
					value: '12345678910',
					type: 0
				},
				{
					title: '生日',
					value: '2019 年1 月1 日',
					type: 1
				},
				{
					title: 'QQ',
					value: '2233506808',
					type: 0
				},
				{
					title: '邮箱',
					value: '2233506808@qq.com',
					type: 0
				}
			],
			listClickIndex: null,

			pickerSingleArray: [
				{
					label: '男',
					value: 1
				},
				{
					label: '女',
					value: 2
				}
			],
			mulLinkageTwoPicker: cityData,
			cityPickerValueDefault: [12, 0, 1],
			themeColor: '#007AFF',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: []
		};
	},
	methods: {
		showToast(msg, type) {
			uni.showToast({
				icon: type,
				title: msg,
				duration: 2000
			});
		},
		confirm() {
			this.showToast('修改成功', 'success');
			setTimeout(() => {
				uni.navigateBack({
					url: '/pages/my/set'
				});
			}, 700);
		},
		listClick(data, index) {
			this.listClickIndex = index;
			switch (index) {
				case 1:
					this.showMulLinkageThreePicker();
					break;
				case 2:
					this.showSinglePicker();
					break;
				case 4:
					this.showMulLinkageTwoPicker();
					break;
			}
		},

		// 单列
		showSinglePicker() {
			this.pickerValueArray = this.pickerSingleArray;
			this.mode = 'selector';
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.$refs.mpvuePicker.show();
		},
		// 二级联动选择
		showMulLinkageTwoPicker() {
			this.mode = 'timeSelector';
			this.deepLength = 3;
			this.pickerValueDefault = [0, 0, 0];
			this.$refs.mpvuePicker.show();
		},
		// 三级联动选择
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show();
		},
		onConfirm(e) {
			this.list[this.listClickIndex].value = e.label;
			console.log(e.label);
		},
		onCancel(e) {
			console.log(e);
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
}

.my-info {
	height: 300upx;
	display: flex;
	flex-direction: column;
	margin-bottom: 40upx;

	.bg {
		background-color: #198cff;
		flex: 1;
	}

	.photo-box {
		flex: 1;
		display: flex;

		&-info {
			margin: auto;
			display: flex;
			flex-direction: column;

			.photo {
				width: 150upx;
				height: 150upx;
				border-radius: 100%;
				margin: -110upx auto 28upx;
			}

			.txt {
				display: flex;
				font-size: $uni-font-size-lg;

				.icon {
					padding-right: 20upx;
					color: #ffb000;
				}
			}
		}
	}
}

.list {
	background-color: white;
	display: flex;
	flex-direction: column;
	font-size: $uni-font-size-lg;
	padding: 28upx;

	.warp {
		display: flex;
		border-bottom: 1px dotted $list-br-color;
		padding: 28upx 0;

		&:last-of-type {
			border-bottom: none;
		}

		.title {
			flex-basis: 100upx;
		}

		.value {
			flex: 1;
			color: $uni-text-color-grey;

			.flex {
				align-items: center;
				display: flex;
				justify-content: flex-end;

				.uni-input {
					width: 100%;
					text-align: right;
				}

				.icon {
					font-size: $uni-font-size-lg;
					padding-left: 28upx;
				}
			}
		}
	}
}

.uni-padding-wrap {
	margin-top: 56upx;
	padding: 0 28upx;

	.btn-color {
		color: #fff;
		background-color: #198cff;
	}
}
</style>
