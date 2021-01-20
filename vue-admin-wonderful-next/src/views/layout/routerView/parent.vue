<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <transition :name="setTransitionName" mode="out-in">
        <keep-alive include="home,systemMenu">
          <component :is="Component" />
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
} from "vue";
import { useStore } from "/@/store/index.ts";
export default defineComponent({
  name: "layoutParentView",
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const state = reactive({
      transitionName: "slide-right",
      headerHeight: "84px",
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
    // 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
    watch(store.state.themeConfig, (val) => {
      state.headerHeight = val.isTagsview ? "84px" : "50px";
      if (val.isFixedHeaderChange !== val.isFixedHeader) {
        if (!proxy.$refs.layoutScrollbarRef) return false;
        proxy.$refs.layoutScrollbarRef.update();
      }
    });
    return {
      getThemeConfig,
      setTransitionName,
      ...toRefs(state),
    };
  },
});
</script>

  