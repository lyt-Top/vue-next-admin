<template>
	<Defaults v-if="getThemeConfig.layout === 'defaults'" />
	<Classic v-else-if="getThemeConfig.layout === 'classic'" />
	<Transverse v-else-if="getThemeConfig.layout === 'transverse'" />
	<Columns v-else-if="getThemeConfig.layout === 'columns'" />
</template>

<script>
import { getLocal, setLocal } from '@/utils/storage.js';
export default {
	name: 'layout',
	components: {
		Defaults: () => import('@/views/layout/main/defaults.vue'),
		Classic: () => import('@/views/layout/main/classic.vue'),
		Transverse: () => import('@/views/layout/main/transverse.vue'),
		Columns: () => import('@/views/layout/main/columns.vue'),
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
			if (!getLocal('oldLayout')) setLocal('oldLayout', this.$store.state.themeConfig.themeConfig.layout);
			const clientWidth = document.body.clientWidth;
			if (clientWidth < 1000) {
				this.$store.state.themeConfig.themeConfig.isCollapse = false;
				this.bus.$emit('layoutMobileResize', {
					layout: 'defaults',
					clientWidth,
				});
			} else {
				this.bus.$emit('layoutMobileResize', {
					layout: getLocal('oldLayout') ? getLocal('oldLayout') : this.$store.state.themeConfig.themeConfig.layout,
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
