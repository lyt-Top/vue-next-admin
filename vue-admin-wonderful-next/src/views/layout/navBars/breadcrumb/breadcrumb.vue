<template>
  <div class="layout-navbars-breadcrumb">
    <i class="layout-navbars-breadcrumb-icon" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="onThemeConfigChange"></i>
    <el-breadcrumb>
      <transition-group name="breadcrumb" mode="out-in">
        <el-breadcrumb-item v-for="(v,k) in breadcrumbList" :key="v.meta.title">
          <span v-if="k === breadcrumbList.length - 1" class="layout-navbars-breadcrumb-span">{{v.meta.title}}</span>
          <a v-else @click.prevent="onBreadcrumbClick(v)">{{v.meta.title}}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  onBeforeMount,
  computed,
  getCurrentInstance,
} from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useStore } from "/@/store/index.ts";
export default {
  name: "layoutBreadcrumb",
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      breadcrumbList: [{ meta: { title: "" } }], // 定义初始值，不能为空数组，否则 v-for 报错
    });
    const getBreadcrumbList = (matched: any) => {
      state.breadcrumbList = matched;
    };
    const onBreadcrumbClick = (v: object) => {
      const { redirect, path } = v;
      if (redirect) router.push(redirect);
      else router.push(path);
    };
    const onThemeConfigChange = () => {
      proxy.mittBus.emit("onMenuClick");
      store.state.themeConfig.isCollapse = !store.state.themeConfig.isCollapse;
      store.dispatch("setThemeConfig", store.state.themeConfig);
    };
    const isCollapse = computed(() => {
      return store.state.themeConfig.isCollapse;
    });
    onBeforeMount(() => {
      state.breadcrumbList = route.matched;
    });
    onBeforeRouteUpdate((to) => {
      getBreadcrumbList(to.matched);
    });
    return {
      onThemeConfigChange,
      isCollapse,
      onBreadcrumbClick,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb {
  flex: 1;
  height: inherit;
  display: flex;
  align-items: center;
  .layout-navbars-breadcrumb-icon {
    cursor: pointer;
    font-size: 18px;
    margin-right: 15px;
    color: var(--bg-topBarColor);
  }
  .layout-navbars-breadcrumb-span {
    opacity: 0.7;
    color: var(--bg-topBarColor);
  }
  ::v-deep(.el-breadcrumb__separator) {
    opacity: 0.7;
    color: var(--bg-topBarColor);
  }
}
</style>