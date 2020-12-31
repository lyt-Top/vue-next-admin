<template>
  <el-header height="84px">
    <NavBarsIndex />
  </el-header>
</template>

<script lang="ts">
import NavBarsIndex from "/@/views/layout/navBars/index.vue";
export default {
  name: "layoutHeader",
  components: { NavBarsIndex },
};
</script>