<script lang="ts">
// 渲染函数：https://v3.cn.vuejs.org/guide/render-function.html
import { h, resolveComponent } from 'vue';

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
	setup(props) {
		// 定义变量
		const linesString = ['https', 'http', '/src', '/assets', import.meta.env.VITE_PUBLIC_PATH];
		const onLineStyle = `font-size: ${props.size}px;color: ${props.color}`;
		const localsStyle = `width: ${props.size}px;height: ${props.size}px`;
		const eleSetStyle = { class: 'el-icon', style: onLineStyle };

		// 逻辑判断
		if (props.name?.startsWith('ele-')) return () => h('i', eleSetStyle, [props.name === 'ele-' ? '' : h(resolveComponent(props.name))]);
		else if (linesString.find((str) => props.name?.startsWith(str))) return () => h('img', { src: props.name, style: localsStyle });
		else return () => h('i', { class: props.name, style: onLineStyle });
	},
};
</script>
