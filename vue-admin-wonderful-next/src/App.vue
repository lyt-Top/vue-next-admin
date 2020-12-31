<template>
  <router-view />
</template>

<script lang="ts">
import { onBeforeMount } from "vue";
import { setIconfont } from "/@/utils/setIconfont.ts";
export default {
  name: "app",
  setup() {
    onBeforeMount(() => {
      setIconfont(["//at.alicdn.com/t/font_2298093_8wsrw2zw3rg.css"]);
    });
  },
};
</script>