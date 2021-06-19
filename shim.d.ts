/* eslint-disable */

// 声明文件，*.vue 后缀的文件交给 vue 模块来处理
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// 声明文件，定义全局变量。其它 app.config.globalProperties.xxx，使用 getCurrentInstance() 来获取
interface Window {
	nextLoading: boolean;
}
