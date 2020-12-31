<template>
  <div class="layout-navbars-container">
    <BreadcrumbIndex />
    <TagsView />
  </div>
</template>

<script lang="ts">
import BreadcrumbIndex from "/@/views/layout/navBars/breadcrumb/index.vue";
import TagsView from "/@/views/layout/navBars/tagsView/tagsView.vue";
export default {
  name: "layoutNavBars",
  components: { BreadcrumbIndex, TagsView },
};
</script>

<style scoped lang="scss">
.layout-navbars-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>