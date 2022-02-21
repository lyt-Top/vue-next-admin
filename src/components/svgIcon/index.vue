<script lang="ts">
// 渲染函数：https://v3.cn.vuejs.org/guide/render-function.html
import { h, resolveComponent } from 'vue';

// 定义接口来定义对象的类型
interface SvgIconProps {
	name: string;
	size: number;
	color: string;
}

export default {
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
	setup(props: SvgIconProps) {
		// 定义变量
		const linesString: string[] = ['https', 'http', '/src', '/assets'];
		const onLineStyle: string = `font-size: ${props.size}px;color: ${props.color}`;
		const localsStyle: string = `width: ${props.size}px;height: ${props.size}px`;

		// 逻辑判断
		if (props.name?.startsWith('ele-')) return () => h('i', { class: 'el-icon', style: onLineStyle }, [h(resolveComponent(props.name))]);
		else if (linesString.find((str) => props.name?.startsWith(str))) return () => h('img', { src: props.name, style: localsStyle });
		else return () => h('i', { class: props.name, style: onLineStyle });
	},
};
</script>
