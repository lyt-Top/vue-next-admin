<template>
  <Defaults v-if="getThemeConfig.layout === 'defaults'" />
  <Classic v-else-if="getThemeConfig.layout === 'classic'" />
  <Transverse v-else-if="getThemeConfig.layout === 'transverse'" />
  <Columns v-else-if="getThemeConfig.layout === 'columns'" />
</template>

<script lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted } from "vue";
import { useStore } from "/@/store/index.ts";
import {
  setLocal,
  getLocal,
  setSession,
  getSession,
  removeSession,
} from "/@/utils/storage.ts";
import Defaults from "/@/views/layout/main/defaults.vue";
import Classic from "/@/views/layout/main/classic.vue";
import Transverse from "/@/views/layout/main/transverse.vue";
import Columns from "/@/views/layout/main/columns.vue";
export default {
  name: "layout",
  components: { Defaults, Classic, Transverse, Columns },
  setup() {
    const store = useStore();
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    // 窗口大小改变时
    const onLayoutResize = () => {
      const clientWidth = document.body.clientWidth;
      console.log(clientWidth);
      if (clientWidth < 1000) {
        if (getLocal("themeConfig").layout === "defaults") return false;
        setSession("oldThemeConfig", getLocal("themeConfig"));
        const config = getLocal("themeConfig");
        config.layout = "defaults";
        console.log(config);
        setLocal("themeConfig", config);
      } else {
        if (
          getLocal("themeConfig").layout === getSession("oldThemeConfig").layout
        )
          return false;
        setLocal("themeConfig", getSession("oldThemeConfig"));
      }
    };
    // 页面加载前
    onBeforeMount(() => {
      window.addEventListener("resize", onLayoutResize);
    });
    // 页面加载时
    onMounted(() => {
      onLayoutResize();
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