<template>
	<el-config-provider :size="getGlobalComponentSize" :locale="i18nLocale">
		<router-view v-show="themeConfig.lockScreenTime > 1" />
		<LockScreen v-if="themeConfig.isLockScreen" />
		<Setings ref="setingsRef" v-show="themeConfig.lockScreenTime > 1" />
		<CloseFull v-if="!themeConfig.isLockScreen" />
	</el-config-provider>
</template>

<script lang="ts">
import { computed, ref, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, nextTick, defineComponent, watch, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { useThemeConfig } from '/@/stores/themeConfig';
import other from '/@/utils/other';
import { Local, Session } from '/@/utils/storage';
import setIntroduction from '/@/utils/setIconfont';
import LockScreen from '/@/layout/lockScreen/index.vue';
import Setings from '/@/layout/navBars/breadcrumb/setings.vue';
import CloseFull from '/@/layout/navBars/breadcrumb/closeFull.vue';

export default defineComponent({
	name: 'app',
	components: { LockScreen, Setings, CloseFull },
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const setingsRef = ref();
		const route = useRoute();
		const stores = useTagsViewRoutes();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const state = reactive({
			i18nLocale: null,
		});
		// 获取全局组件大小
		const getGlobalComponentSize = computed(() => {
			return other.globalComponentSize();
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
				// 设置 i18n，App.vue 中的 el-config-provider
				proxy.mittBus.on('getI18nConfig', (locale: string) => {
					(state.i18nLocale as string | null) = locale;
				});
				// 获取缓存中的布局配置
				if (Local.get('themeConfig')) {
					storesThemeConfig.setThemeConfig(Local.get('themeConfig'));
					document.documentElement.style.cssText = Local.get('themeConfigStyle');
				}
				// 获取缓存中的全屏配置
				if (Session.get('isTagsViewCurrenFull')) {
					stores.setCurrenFullscreen(Session.get('isTagsViewCurrenFull'));
				}
			});
		});
		// 页面销毁时，关闭监听布局配置/i18n监听
		onUnmounted(() => {
			proxy.mittBus.off('openSetingsDrawer', () => {});
			proxy.mittBus.off('getI18nConfig', () => {});
		});
		// 监听路由的变化，设置网站标题
		watch(
			() => route.path,
			() => {
				other.useTitle();
			},
			{
				deep: true,
			}
		);
		return {
			themeConfig,
			setingsRef,
			getGlobalComponentSize,
			...toRefs(state),
		};
	},
});
</script>
