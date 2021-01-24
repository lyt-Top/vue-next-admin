<template>
  <div class="h100">
    <router-view v-slot="{ Component }">
      <transition :name="setTransitionName" mode="out-in">
        <keep-alive :include="getCaches">
          <component :is="Component" :key="refreshRouterViewKey" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  toRefs,
  reactive,
  getCurrentInstance,
  watch,
  onBeforeMount,
  onUnmounted,
  nextTick,
} from "vue";
import {
  useRoute,
  useRouter,
  RouteRecordRaw,
  onBeforeRouteUpdate,
} from "vue-router";
import { useStore } from "/@/store/index.ts";
export default defineComponent({
  name: "layoutParentView",
  setup() {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      transitionName: "slide-right",
      headerHeight: "84px",
      refreshRouterViewKey: route.path,
    });
    // 设置主界面切换动画
    const setTransitionName = computed(() => {
      let { animation } = store.state.themeConfig;
      if (animation === "slideRight")
        return (state.transitionName = "slide-right");
      else if (animation === "slideLeft")
        return (state.transitionName = "slide-left");
      else if (animation === "opacitys")
        return (state.transitionName = "opacitys");
    });
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    // 获取组件缓存列表(name值)
    const getCaches = computed(() => {
      return store.state.caches;
    });
    // 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
    watch(store.state.themeConfig, (val) => {
      state.headerHeight = val.isTagsview ? "84px" : "50px";
      if (val.isFixedHeaderChange !== val.isFixedHeader) {
        if (!proxy.$refs.layoutScrollbarRef) return false;
        proxy.$refs.layoutScrollbarRef.update();
      }
    });
    // 路由更新时
    onBeforeRouteUpdate((to) => {
      state.refreshRouterViewKey = to.path;
    });
    // 页面加载时
    onBeforeMount(() => {
      proxy.mittBus.on("onTagsViewRefreshRouterView", (path: string) => {
        if (route.path !== path) return false;
        state.refreshRouterViewKey = Math.random();
        nextTick(() => {
          state.refreshRouterViewKey = path;
        });
      });
    });
    // 页面卸载时
    onUnmounted(() => {
      proxy.mittBus.off("onTagsViewRefreshRouterView");
    });
    return {
      getThemeConfig,
      getCaches,
      setTransitionName,
      ...toRefs(state),
    };
  },
});
</script>

  