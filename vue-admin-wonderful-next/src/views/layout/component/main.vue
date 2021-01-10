<template>
  <el-main>
    <el-scrollbar class="layout-scrollbar" ref="layoutScrollbarRef"
      :style="{minHeight: `calc(100vh - ${headerHeight}`}">
      <router-view v-slot="{ Component }">
        <transition :name="setTransitionName" mode="out-in">
          <div :key="key">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </div>
        </transition>
      </router-view>
      <Footer v-if="getThemeConfig.isFooter" />
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  toRefs,
  reactive,
  getCurrentInstance,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "/@/store/index.ts";
import Footer from "/@/views/layout/footer/index.vue";
export default defineComponent({
  name: "layoutMain",
  components: { Footer },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
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
    // 设置路由唯一 key 值，防止页面切换动画不生效
    const key = computed(() => route.path);
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
      key,
      ...toRefs(state),
    };
  },
});
</script>
