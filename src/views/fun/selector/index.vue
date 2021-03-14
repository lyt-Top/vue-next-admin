<template>
	<div class="selector-container">
		<el-card shadow="hover" header="1、图标选择器(宽度自动)：简单版本">
			<IconSelector @get="ongetCurrentIcon" />
		</el-card>
		<el-card shadow="hover" header="2、图标选择器(宽度自动)：高级版本" class="mt15">
			<IconSelector @get="ongetCurrentIcon" :isAllOn="true" />
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive } from 'vue';
import IconSelector from '/@/components/iconSelector/index.vue';
export default {
	name: 'selector',
	components: { IconSelector },
	setup() {
		const state = reactive({});
		// 获取当前点击的 icon 图标
		const ongetCurrentIcon = (v: string) => {
			console.log(v);
		};
		return {
			ongetCurrentIcon,
			...toRefs(state),
		};
	},
};
</script>
