<template>
  <el-main>
    <el-scrollbar class="layout-scrollbar" :style="{minHeight: `calc(100vh - ${headerHeight}`}"
      ref="layoutScrollbarRef">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in">
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
import { useRoute, onBeforeRouteUpdate } from "vue-router";
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
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    const key = computed(() => route.path);
    onBeforeRouteUpdate((to, from) => {
      state.transitionName =
        to.meta.index > from.meta.index ? "slide-right" : "slide-left";
    });
    watch(store.state.themeConfig, (val) => {
      state.headerHeight = val.isTagsview ? "84px" : "50px";
      if (val.isFixedHeaderChange !== val.isFixedHeader) {
        proxy.$refs.layoutScrollbarRef.update();
      }
    });
    return {
      getThemeConfig,
      key,
      ...toRefs(state),
    };
  },
});
</script>
