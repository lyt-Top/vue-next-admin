<template>
	<el-config-provider :size="getGlobalComponentSize" :locale="zhCn">
		<router-view v-show="getThemeConfig.lockScreenTime !== 0" />
		<LockScreen v-if="getThemeConfig.isLockScreen" />
		<Setings ref="setingsRef" v-show="getThemeConfig.lockScreenTime !== 0" />
		<CloseFull />
	</el-config-provider>
</template>

<script lang="ts">
import { computed, ref, getCurrentInstance, onBeforeMount, onMounted, nextTick, defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
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
		const store = useStore();
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 获取全局组件大小
		const getGlobalComponentSize = computed(() => {
			return other.globalComponentSize;
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
				// 获取缓存中的全屏配置
				if (Session.get('isTagsViewCurrenFull')) {
					store.dispatch('tagsViewRoutes/setCurrenFullscreen', Session.get('isTagsViewCurrenFull'));
				}
			});
		});
		// 监听路由的变化，设置网站标题
		watch(
			() => route.path,
			() => {
				other.useTitle();
			}
		);
		return {
			zhCn,
			setingsRef,
			getGlobalComponentSize,
			getThemeConfig,
		};
	},
});
</script>
