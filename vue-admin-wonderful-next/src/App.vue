<template>
  <router-view />
  <LockScreen />
</template>

<script lang="ts">
import { onBeforeMount } from "vue";
import { useStore } from "/@/store/index.ts";
import { setIconfont } from "/@/utils/setIconfont.ts";
import LockScreen from "/@/views/layout/lockScreen/index.vue";
export default {
  name: "app",
  components: { LockScreen },
  setup() {
    const store = useStore();
    console.log(store);
    // 设置批量第三方 icon 图标
    onBeforeMount(() => {
      setIconfont(["//at.alicdn.com/t/font_2298093_0fmefamqzj4a.css"]);
    });
  },
};
</script>