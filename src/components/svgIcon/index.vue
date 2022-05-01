<template>
	<i v-if="isShowIconSvg" class="el-icon" :style="setIconSvgStyle">
		<component :is="getIconName" />
	</i>
	<img v-else-if="isShowIconImg" :src="getIconName" :style="setIconImgStyle" />
	<i v-else :class="getIconName" :style="setIconSvgStyle" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
	name: 'svgIcon',
	props: {
		// svg 图标组件名字
		name: {
			type: String,
		},
		// svg 大小
		size: {
			type: Number,
			default: () => 14,
		},
		// svg 颜色
		color: {
			type: String,
		},
	},
	setup(props) {
		// 在线链接、本地引入地址前缀
		const linesString = ['https', 'http', '/src', '/assets', import.meta.env.VITE_PUBLIC_PATH];

		// 获取 icon 图标名称
		const getIconName = computed(() => {
			return props?.name;
		});
		// 用于判断 element plus 自带 svg 图标的显示、隐藏
		const isShowIconSvg = computed(() => {
			return props?.name?.startsWith('ele-');
		});
		// 用于判断在线链接、本地引入等图标显示、隐藏
		const isShowIconImg = computed(() => {
			return linesString.find((str) => props.name?.startsWith(str));
		});
		// 设置图标样式
		const setIconSvgStyle = computed(() => {
			return `font-size: ${props.size}px;color: ${props.color};`;
		});
		// 设置图片样式
		const setIconImgStyle = computed(() => {
			return `width: ${props.size}px;height: ${props.size}px`;
		});
		return {
			getIconName,
			isShowIconSvg,
			isShowIconImg,
			setIconSvgStyle,
			setIconImgStyle,
		};
	},
});
</script>
