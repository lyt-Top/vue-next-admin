<template>
  <div class="layout-logo" v-if="setShowLogo" @click="onThemeConfigChange">
    <span>vue-admin-wonderful</span>
  </div>
  <div class="layout-logo-size" v-else @click="onThemeConfigChange">
    <img src="/@/assets/logo-docs-mini.svg" class="layout-logo-size-img" />
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance } from "vue";
import { useStore } from "/@/store/index.ts";
export default {
  name: "layoutLogo",
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    // 设置 logo 的显示。classic 经典布局默认显示 logo
    const setShowLogo = computed(() => {
      let { isCollapse, layout } = store.state.themeConfig;
      return !isCollapse || layout === "classic";
    });
    // logo 点击实现菜单展开/收起
    const onThemeConfigChange = () => {
      if (store.state.themeConfig.layout === "transverse") return false;
      proxy.mittBus.emit("onMenuClick");
      store.state.themeConfig.isCollapse = !store.state.themeConfig.isCollapse;
    };
    return {
      setShowLogo,
      onThemeConfigChange,
    };
  },
};
</script>

<style scoped lang="scss">
.layout-logo {
  width: 220px;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
  color: var(--color-primary);
  font-size: 16px;
  cursor: pointer;
  animation: logoAnimation 0.3s ease-in-out;
  &:hover {
    span {
      color: var(--color-primary-light-2);
    }
  }
}
.layout-logo-size {
  width: 100%;
  height: 50px;
  display: flex;
  cursor: pointer;
  animation: logoAnimation 0.3s ease-in-out;
  &-img {
    width: 30px;
    margin: auto;
  }
  &:hover {
    img {
      animation: logoAnimation 0.3s ease-in-out;
    }
  }
}
</style>