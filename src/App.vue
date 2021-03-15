<template>
	<router-view v-show="getThemeConfig.lockScreenTime !== 0" />
	<LockScreen v-if="getThemeConfig.isLockScreen" />
	<Setings ref="setingsRef" v-show="getThemeConfig.lockScreenTime !== 0" />
</template>

<script lang="ts">
import { computed, ref, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, nextTick, defineComponent } from 'vue';
import { useStore } from '/@/store/index.ts';
import { getLocal } from '/@/utils/storage.ts';
import setIntroduction from '/@/utils/setIconfont.ts';
import LockScreen from '/@/views/layout/lockScreen/index.vue';
import Setings from '/@/views/layout/navBars/breadcrumb/setings.vue';
export default defineComponent({
	name: 'app',
	components: { LockScreen, Setings },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const setingsRef = ref();
		const store = useStore();
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 布局配置弹窗打开
		const openSetingsDrawer = () => {
			setingsRef.value.openDrawer();
		};
		// 设置初始化，防止刷新时恢复默认
		onBeforeMount(() => {
			// 设置批量第三方 icon 图标
			setIntroduction.cssCdn();
			// 设置批量第三方 js
			setIntroduction.jsCdn();
		});
		// 页面加载时
		onMounted(() => {
			nextTick(() => {
				// 监听布局配置弹窗点击打开
				proxy.mittBus.on('openSetingsDrawer', () => {
					openSetingsDrawer();
				});
				// 获取缓存中的布局配置
				if (getLocal('themeConfig')) {
					store.dispatch('themeConfig/setThemeConfig', getLocal('themeConfig'));
					document.documentElement.style.cssText = getLocal('themeConfigStyle');
				}
			});
		});
		// 页面销毁时，关闭监听布局配置
		onUnmounted(() => {
			proxy.mittBus.off('openSetingsDrawer', () => {});
		});
		return {
			setingsRef,
			getThemeConfig,
		};
	},
});
</script>
