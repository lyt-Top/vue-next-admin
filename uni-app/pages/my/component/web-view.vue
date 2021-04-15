<!-- web-view 是一个 web 浏览器组件，可以用来承载网页的容器，会自动铺满整个页面。 -->
<template>
	<view><web-view :webview-styles="webviewStyles" :src="path"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			path: null,
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			}
		};
	},
	onLoad(option) {
		this.path = option.path;
	}
};
</script>
