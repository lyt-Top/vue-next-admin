<template>
  <Defaults v-if="getThemeConfig.layout === 'defaults'" />
  <Classic v-else-if="getThemeConfig.layout === 'classic'" />
  <Transverse v-else-if="getThemeConfig.layout === 'transverse'" />
  <Columns v-else-if="getThemeConfig.layout === 'columns'" />
</template>

<script lang="ts">
import {
  computed,
  onBeforeMount,
  onUnmounted,
  getCurrentInstance,
  defineAsyncComponent,
} from "vue";
import { useStore } from "/@/store/index.ts";
import { getLocal } from "/@/utils/storage.ts";
export default {
  name: "layout",
  components: {
    Defaults: defineAsyncComponent(
      () => import("/@/views/layout/main/defaults.vue")
    ),
    Classic: defineAsyncComponent(
      () => import("/@/views/layout/main/classic.vue")
    ),
    Transverse: defineAsyncComponent(
      () => import("/@/views/layout/main/transverse.vue")
    ),
    Columns: defineAsyncComponent(
      () => import("/@/views/layout/main/columns.vue")
    ),
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    // 窗口大小改变时(适配移动端)
    const onLayoutResize = () => {
      const clientWidth = document.body.clientWidth;
      if (clientWidth < 1000) {
        getThemeConfig.value.isCollapse = false;
        proxy.mittBus.emit("layoutMobileResize", {
          layout: "defaults",
          clientWidth,
        });
      } else {
        proxy.mittBus.emit("layoutMobileResize", {
          layout: getLocal("oldLayout") ? getLocal("oldLayout") : "defaults",
          clientWidth,
        });
      }
    };
    // 页面加载前
    onBeforeMount(() => {
      onLayoutResize();
      window.addEventListener("resize", onLayoutResize);
    });
    // 页面卸载时
    onUnmounted(() => {
      window.removeEventListener("resize", onLayoutResize);
    });
    return {
      getThemeConfig,
    };
  },
};
</script>