<template>
  <router-view />
  <LockScreen v-if="getThemeConfig.isLockScreen" />
</template>

<script lang="ts">
import { onBeforeMount, computed } from "vue";
import { useStore } from "/@/store/index.ts";
import { setIconfont } from "/@/utils/setIconfont.ts";
import LockScreen from "/@/views/layout/lockScreen/index.vue";
export default {
  name: "app",
  components: { LockScreen },
  setup() {
    const store = useStore();
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    // 设置批量第三方 icon 图标
    onBeforeMount(() => {
      setIconfont(["//at.alicdn.com/t/font_2298093_0fmefamqzj4a.css"]);
    });
    return {
      getThemeConfig,
    };
  },
};
</script>