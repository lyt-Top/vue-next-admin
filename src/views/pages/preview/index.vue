<template>
	<div class="preview-container">
		<el-card shadow="hover" header="element-plus 大图预览">
			<el-image style="width: 100px; height: 100px; border-radius: 5px" :src="url" :preview-src-list="srcList" title="点击查看大图预览"> </el-image>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent } from 'vue';

export default defineComponent({
	name: 'pagesPreview',
	setup() {
		const state = reactive({
			url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
			srcList: [
				'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
				'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg',
				'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
			],
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
