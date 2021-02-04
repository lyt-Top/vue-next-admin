<template>
  <div class="h100">
    <router-view v-slot="{ Component }">
      <transition :name="setTransitionName" mode="out-in">
        <keep-alive :include="getCaches">
          <component :is="Component" :key="refreshRouterViewKey" class="w100" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  toRefs,
  reactive,
  getCurrentInstance,
  watch,
  onBeforeMount,
  onUnmounted,
  nextTick,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "/@/store/index.ts";
export default defineComponent({
  name: "layoutParentView",
  setup() {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      transitionName: "slide-right",
      refreshRouterViewKey: null,
    });
    // 设置主界面切换动画
    const setTransitionName = computed(() => {
      let { animation } = store.state.themeConfig;
      if (animation === "slideRight")
        return (state.transitionName = "slide-right");
      else if (animation === "slideLeft")
        return (state.transitionName = "slide-left");
      else if (animation === "opacitys")
        return (state.transitionName = "opacitys");
    });
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    // 获取组件缓存列表(name值)
    const getCaches = computed(() => {
      return store.state.caches;
    });
    // 页面加载前
    onBeforeMount(() => {
      proxy.mittBus.on("onTagsViewRefreshRouterView", (path: string) => {
        if (route.path !== path) return false;
        state.refreshRouterViewKey = route.path;
        nextTick(() => {
          state.refreshRouterViewKey = null;
        });
      });
    });
    // 页面卸载时
    onUnmounted(() => {
      proxy.mittBus.off("onTagsViewRefreshRouterView");
    });
    return {
      getThemeConfig,
      getCaches,
      setTransitionName,
      ...toRefs(state),
    };
  },
});
</script>

  