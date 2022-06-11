<template>
	<Defaults v-if="themeConfig.layout === 'defaults'" />
	<Classic v-else-if="themeConfig.layout === 'classic'" />
	<Transverse v-else-if="themeConfig.layout === 'transverse'" />
	<Columns v-else-if="themeConfig.layout === 'columns'" />
</template>

<script setup name="layout">
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Local } from '/@/utils/storage';

const Defaults = defineAsyncComponent(() => import('/@/layout/main/defaults.vue'));
const Classic = defineAsyncComponent(() => import('/@/layout/main/classic.vue'));
const Transverse = defineAsyncComponent(() => import('/@/layout/main/transverse.vue'));
const Columns = defineAsyncComponent(() => import('/@/layout/main/columns.vue'));

const { proxy } = getCurrentInstance();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
// 窗口大小改变时(适配移动端)
const onLayoutResize = () => {
	if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout);
	const clientWidth = document.body.clientWidth;
	if (clientWidth < 1000) {
		themeConfig.value.isCollapse = false;
		proxy.mittBus.emit('layoutMobileResize', {
			layout: 'defaults',
			clientWidth,
		});
	} else {
		proxy.mittBus.emit('layoutMobileResize', {
			layout: Local.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
			clientWidth,
		});
	}
};
// 页面加载前
onBeforeMount(() => {
	onLayoutResize();
	window.addEventListener('resize', onLayoutResize);
});
// 页面卸载时
onUnmounted(() => {
	window.removeEventListener('resize', onLayoutResize);
});
</script>
