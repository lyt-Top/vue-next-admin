<template>
  <el-main>
    <el-scrollbar class="layout-scrollbar" :style="{minHeight: `calc(100vh - ${headerHeight}`}"
      ref="layoutScrollbarRef">
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
    const setTransitionName = computed(() => {
      let { animation } = store.state.themeConfig;
      if (animation === "slideRight")
        return (state.transitionName = "slide-right");
      else if (animation === "slideLeft")
        return (state.transitionName = "slide-left");
      else if (animation === "opacitys")
        return (state.transitionName = "opacitys");
    });
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    const key = computed(() => route.path);
    watch(store.state.themeConfig, (val) => {
      state.headerHeight = val.isTagsview ? "84px" : "50px";
      if (val.isFixedHeaderChange !== val.isFixedHeader) {
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
