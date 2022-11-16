<template>
	<el-config-provider :size="getGlobalComponentSize" :locale="getGlobalI18n">
		<router-view v-show="themeConfig.lockScreenTime > 1" />
		<LockScreen v-if="themeConfig.isLockScreen" />
		<Setings ref="setingsRef" v-show="themeConfig.lockScreenTime > 1" />
		<CloseFull v-if="!themeConfig.isLockScreen" />
	</el-config-provider>
</template>

<script lang="ts">
import { defineAsyncComponent, computed, ref, onBeforeMount, onMounted, onUnmounted, nextTick, defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { useThemeConfig } from '/@/stores/themeConfig';
import other from '/@/utils/other';
import { Local, Session } from '/@/utils/storage';
import mittBus from '/@/utils/mitt';
import setIntroduction from '/@/utils/setIconfont';

export default defineComponent({
	name: 'app',
	components: {
		LockScreen: defineAsyncComponent(() => import('/@/layout/lockScreen/index.vue')),
		Setings: defineAsyncComponent(() => import('/@/layout/navBars/breadcrumb/setings.vue')),
		CloseFull: defineAsyncComponent(() => import('/@/layout/navBars/breadcrumb/closeFull.vue')),
	},
	setup() {
		const { messages, locale } = useI18n();
		const setingsRef = ref();
		const route = useRoute();
		const stores = useTagsViewRoutes();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		// 获取全局组件大小
		const getGlobalComponentSize = computed(() => {
			return other.globalComponentSize();
		});
		// 获取全局 i18n
		const getGlobalI18n = computed(() => {
			return messages.value[locale.value];
		});
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
				mittBus.on('openSetingsDrawer', () => {
					setingsRef.value.openDrawer();
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
			mittBus.off('openSetingsDrawer', () => {});
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
			getGlobalI18n,
		};
	},
});
</script>
