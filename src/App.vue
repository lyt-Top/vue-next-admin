<template>
	<div id="app">
		<router-view />
		<Setings ref="setingsRef" />
	</div>
</template>

<script>
import setIntroduction from '@/utils/setIconfont.js';
import { Local } from '@/utils/storage.js';
import Setings from '@/layout/navBars/breadcrumb/setings.vue';
export default {
	name: 'App',
	components: { Setings },
	mounted() {
		this.initSetIconfont();
		this.openSetingsDrawer();
		this.getLayoutThemeConfig();
	},
	methods: {
		// 设置初始化，防止刷新时恢复默认
		initSetIconfont() {
			// 设置批量第三方 icon 图标
			setIntroduction.cssCdn();
			// 设置批量第三方 js
			setIntroduction.jsCdn();
		},
		// 布局配置弹窗打开
		openSetingsDrawer() {
			this.bus.$on('openSetingsDrawer', () => {
				this.$refs.setingsRef.openDrawer();
			});
		},
		// 获取缓存中的布局配置
		getLayoutThemeConfig() {
			if (Local.get('themeConfigPrev')) {
				this.$store.dispatch('themeConfig/setThemeConfig', Local.get('themeConfigPrev'));
				document.documentElement.style.cssText = Local.get('themeConfigStyle');
			} else {
				Local.set('themeConfigPrev', this.$store.state.themeConfig.themeConfig);
			}
		},
	},
	watch: {
		// 监听路由的变化
		$route: {
			handler(to) {
				this.$nextTick(() => {
					let webTitle = '';
					let { globalTitle } = this.$store.state.themeConfig.themeConfig;
					to.path === '/login' ? (webTitle = to.meta.title) : (webTitle = this.$t(to.meta.title));
					document.title = `${webTitle} - ${globalTitle}` || globalTitle;
				});
			},
			deep: true,
			immediate: true,
		},
	},
	destroyed() {
		this.bus.$off('openSetingsDrawer');
	},
};
</script>
