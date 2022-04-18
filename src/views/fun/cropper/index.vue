<template>
	<div class="croppers-container">
		<el-card shadow="hover" header="cropper 图片裁剪">
			<el-alert
				title="感谢优秀的 `cropperjs`，项目地址：https://github.com/fengyuanchen/cropperjs"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<div class="cropper-img-warp">
				<div class="mb15 mt15">
					<img class="cropper-img" :src="cropperImg" />
				</div>
				<el-button type="primary" size="default" @click="onCropperDialogOpen">
					<el-icon>
						<ele-Crop />
					</el-icon>
					更换头像
				</el-button>
			</div>
		</el-card>
		<CropperDialog ref="cropperDialogRef" />
	</div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, defineComponent } from 'vue';
import CropperDialog from '/@/components/cropper/index.vue';

export default defineComponent({
	name: 'funCropper',
	components: { CropperDialog },
	setup() {
		const cropperDialogRef = ref();
		const state = reactive({
			cropperImg: 'https://img1.baidu.com/it/u=2813520958,2218166536&fm=26&fmt=auto&gp=0.jpg',
		});
		// 打开裁剪弹窗
		const onCropperDialogOpen = () => {
			cropperDialogRef.value.openDialog(state.cropperImg);
		};
		return {
			cropperDialogRef,
			onCropperDialogOpen,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.croppers-container {
	.cropper-img-warp {
		text-align: center;
		.cropper-img {
			margin: auto;
			width: 150px;
			height: 150px;
			border-radius: 100%;
		}
	}
}
</style>
