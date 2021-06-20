<template>
	<router-view v-show="getThemeConfig.lockScreenTime !== 0" />
	<LockScreen v-if="getThemeConfig.isLockScreen" />
	<Setings ref="setingsRef" v-show="getThemeConfig.lockScreenTime !== 0" />
</template>

<script lang="ts">
import { computed, ref, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, nextTick, defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import { Local } from '/@/utils/storage';
import setIntroduction from '/@/utils/setIconfont';
import LockScreen from '/@/layout/lockScreen/index.vue';
import Setings from '/@/layout/navBars/breadcrumb/setings.vue';
export default defineComponent({
	name: 'app',
	components: { LockScreen, Setings },
	setup() {
		const { t } = useI18n();
		const { proxy } = getCurrentInstance() as any;
		const setingsRef = ref();
		const route = useRoute();
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
				if (Local.get('themeConfig')) {
					store.dispatch('themeConfig/setThemeConfig', Local.get('themeConfig'));
					document.documentElement.style.cssText = Local.get('themeConfigStyle');
				}
			});
		});
		// 页面销毁时，关闭监听布局配置
		onUnmounted(() => {
			proxy.mittBus.off('openSetingsDrawer', () => {});
		});
		// 监听路由的变化，设置网站标题
		watch(
			() => route.path,
			() => {
				nextTick(() => {
					let webTitle = '';
					route.path === '/login' ? (webTitle = route.meta.title) : (webTitle = t(route.meta.title));
					document.title = `${webTitle} - ${getThemeConfig.value.globalTitle}` || getThemeConfig.value.globalTitle;
				});
			}
		);
		return {
			setingsRef,
			getThemeConfig,
		};
	},
});
</script>
