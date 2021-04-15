<template>
	<div class="layout-logo" v-if="setShowLogo" @click="onThemeConfigChange">
		<img src="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/vue2/logo-mini.svg" class="layout-logo-medium-img" />
		<span>{{ getThemeConfig.globalTitle }}</span>
	</div>
	<div class="layout-logo-size" v-else @click="onThemeConfigChange">
		<img src="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/vue2/logo-mini.svg" class="layout-logo-size-img" />
	</div>
</template>

<script>
export default {
	name: 'layoutLogo',
	computed: {
		// 获取布局配置信息
		getThemeConfig() {
			return this.$store.state.themeConfig.themeConfig;
		},
		// 设置 logo 是否显示
		setShowLogo() {
			let { isCollapse, layout } = this.$store.state.themeConfig.themeConfig;
			return !isCollapse || layout === 'classic' || document.body.clientWidth < 1000;
		},
	},
	methods: {
		// logo 点击实现菜单展开/收起
		onThemeConfigChange() {
			if (this.$store.state.themeConfig.themeConfig.layout === 'transverse') return false;
			this.$store.state.themeConfig.themeConfig.isCollapse = !this.$store.state.themeConfig.themeConfig.isCollapse;
		},
	},
};
</script>

<style scoped lang="scss">
.layout-logo {
	width: 220px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
	color: var(--color-primary);
	font-size: 16px;
	cursor: pointer;
	animation: logoAnimation 0.3s ease-in-out;
	&:hover {
		span {
			opacity: 0.9;
		}
	}
	&-medium-img {
		width: 20px;
		margin-right: 5px;
		position: relative;
		top: 2px;
	}
}
.layout-logo-size {
	width: 100%;
	height: 50px;
	display: flex;
	cursor: pointer;
	&-img {
		width: 20px;
		margin: auto;
		animation: logoAnimation 0.3s ease-in-out;
	}
}
</style>
