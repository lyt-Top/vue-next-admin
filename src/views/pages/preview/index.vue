<template>
	<div class="preview-container layout-pd">
		<el-card shadow="hover" header="element-plus 大图预览">
			<el-image style="width: 100px; height: 100px; border-radius: 5px" :src="state.url" :preview-src-list="state.srcList" title="点击查看大图预览" />
		</el-card>
	</div>
</template>

<script setup lang="ts" name="pagesPreview">
import { reactive } from 'vue';

// 定义变量内容
const state = reactive({
	url: 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500',
	srcList: [
		'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500',
		'https://img2.baidu.com/it/u=2370931438,70387529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
		'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F0%2F582fc47531494.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671617723&t=024966ede9f71fb7c39f6b06a712c1e3',
	],
});
</script>
