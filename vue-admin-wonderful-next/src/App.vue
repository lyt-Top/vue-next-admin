<template>
  <router-view />
</template>

<script lang="ts">
import { onBeforeMount } from "vue";
import { setIconfont } from "/@/utils/setIconfont.ts";
export default {
  name: "app",
  setup() {
    // 设置批量第三方 icon 图标
    onBeforeMount(() => {
      setIconfont(["//at.alicdn.com/t/font_2298093_0fmefamqzj4a.css"]);
    });
  },
};
</script>