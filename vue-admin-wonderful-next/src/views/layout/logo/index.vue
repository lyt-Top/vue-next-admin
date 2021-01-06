<template>
  <div class="layout-logo" v-if="!getThemeConfig.isCollapse">vue-admin-wonderful</div>
  <div class="layout-logo-size" v-else>
    <img src="/@/assets/logo-docs-mini.svg" class="layout-logo-size-img" />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "/@/store/index.ts";
export default {
  name: "layoutLogo",
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

<style scoped lang="scss">
.layout-logo {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(0 21 41 / 3%) 0px 1px 4px;
  color: var(--color-primary);
  font-size: 16px;
  animation: logoAnimation 0.3s ease-in-out;
}
.layout-logo-size {
  width: 100%;
  height: 50px;
  display: flex;
  animation: logoAnimation 0.3s ease-in-out;
  &-img {
    width: 30px;
    margin: auto;
  }
}
</style>