<template>
  <el-header :height="getThemeConfig.isTagsview ? '84px' : '50px'">
    <NavBarsIndex />
  </el-header>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "/@/store/index.ts";
import NavBarsIndex from "/@/views/layout/navBars/index.vue";
export default {
  name: "layoutHeader",
  components: { NavBarsIndex },
  setup() {
    const store = useStore();
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    return {
      getThemeConfig,
    };
  },
};
</script>