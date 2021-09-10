<template>
	<div class="dragVerify-container">
		<el-card shadow="hover" header="验证器：基本滑块验证组件">
			<el-alert
				title="感谢优秀的 `vue-drag-verify`，项目地址：https://github.com/yimijianfang/vue-drag-verify"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<DragVerify
				v-model:isPassing="isPassingOne"
				text="请按住滑块拖动"
				successText="验证通过"
				handlerIcon="el-icon-d-arrow-right"
				successIcon="el-icon-circle-check"
			/>
		</el-card>

		<el-card shadow="hover" header="验证器：图片滑块组件" class="mt15">
			<el-alert
				title="感谢优秀的 `vue-drag-verify`，项目地址：https://github.com/yimijianfang/vue-drag-verify"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<DragVerifyImg
				:imgsrc="imgTwo"
				v-model:isPassing="isPassingTwo"
				:showRefresh="true"
				text="请按住滑块拖动"
				successText="验证通过"
				handlerIcon="el-icon-d-arrow-right"
				successIcon="el-icon-circle-check"
			/>
		</el-card>

		<el-card shadow="hover" header="验证器：图片滑块组件(拼图)" class="mt15">
			<el-alert
				title="感谢优秀的 `vue-drag-verify`，项目地址：https://github.com/yimijianfang/vue-drag-verify"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<DragVerifyImgChip
				:imgsrc="imgThree"
				v-model:isPassing="isPassingThree"
				:showRefresh="true"
				text="请按住滑块拖动"
				successText="验证通过"
				handlerIcon="el-icon-d-arrow-right"
				successIcon="el-icon-circle-check"
			/>
		</el-card>

		<el-card shadow="hover" header="验证器：旋转图片滑块组件" class="mt15">
			<el-alert
				title="感谢优秀的 `vue-drag-verify`，项目地址：https://github.com/yimijianfang/vue-drag-verify"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<DragVerifyImgRotate
				:imgsrc="imgThree"
				v-model:isPassing="isPassingFour"
				:showRefresh="true"
				text="请按住滑块拖动"
				successText="验证通过"
				handlerIcon="el-icon-d-arrow-right"
				successIcon="el-icon-circle-check"
			/>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive } from 'vue';
// 基本滑块验证组件
import DragVerify from '/@/components/dragVerify/dragVerify.vue';
// 图片滑块组件
import DragVerifyImg from '/@/components/dragVerify/dragVerifyImg.vue';
// 图片滑块组件(拼图)
import DragVerifyImgChip from '/@/components/dragVerify/dragVerifyImgChip.vue';
// 旋转图片滑块组件
import DragVerifyImgRotate from '/@/components/dragVerify/dragVerifyImgRotate.vue';
export default {
	name: 'funDragVerify',
	components: {
		DragVerify,
		DragVerifyImg,
		DragVerifyImgChip,
		DragVerifyImgRotate,
	},
	setup() {
		const state = reactive({
			isPassingOne: false,
			isPassingTwo: false,
			isPassingThree: false,
			isPassingFour: false,
			imgTwo: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
			imgThree: 'https://img1.baidu.com/it/u=2813520958,2218166536&fm=26&fmt=auto&gp=0.jpg',
		});
		return {
			...toRefs(state),
		};
	},
};
</script>
