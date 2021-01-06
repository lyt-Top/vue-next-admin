<template>
  <div class="layout-navbars-breadcrumb-index">
    <Breadcrumb />
    <User />
  </div>
</template>

<script lang="ts">
import Breadcrumb from "/@/views/layout/navBars/breadcrumb/breadcrumb.vue";
import User from "/@/views/layout/navBars/breadcrumb/user.vue";
export default {
  name: "layoutBreadcrumbIndex",
  components: { Breadcrumb, User },
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-index {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background: var(--bg-topBar);
}
</style>