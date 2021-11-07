<template>
	<Defaults v-if="getThemeConfig.layout === 'defaults'" />
	<Classic v-else-if="getThemeConfig.layout === 'classic'" />
	<Transverse v-else-if="getThemeConfig.layout === 'transverse'" />
	<Columns v-else-if="getThemeConfig.layout === 'columns'" />
</template>

<script>
import { Local } from '@/utils/storage.js';
export default {
	name: 'layout',
	components: {
		Defaults: () => import('@/layout/main/defaults.vue'),
		Classic: () => import('@/layout/main/classic.vue'),
		Transverse: () => import('@/layout/main/transverse.vue'),
		Columns: () => import('@/layout/main/columns.vue'),
	},
	computed: {
		// 获取布局配置信息
		getThemeConfig() {
			return this.$store.state.themeConfig.themeConfig;
		},
	},
	created() {
		this.onLayoutResize();
		window.addEventListener('resize', this.onLayoutResize);
	},
	methods: {
		// 窗口大小改变时(适配移动端)
		onLayoutResize() {
			if (!Local.get('oldLayout')) Local.set('oldLayout', this.$store.state.themeConfig.themeConfig.layout);
			const clientWidth = document.body.clientWidth;
			if (clientWidth < 1000) {
				this.$store.state.themeConfig.themeConfig.isCollapse = false;
				this.bus.$emit('layoutMobileResize', {
					layout: 'defaults',
					clientWidth,
				});
			} else {
				this.bus.$emit('layoutMobileResize', {
					layout: Local.get('oldLayout') ? Local.get('oldLayout') : this.$store.state.themeConfig.themeConfig.layout,
					clientWidth,
				});
			}
		},
	},
	distroyed() {
		window.removeEventListener('resize', this.onLayoutResize);
	},
};
</script>
