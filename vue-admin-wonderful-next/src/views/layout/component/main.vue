<template>
  <el-main :class="getThemeConfig.isFixedHeader ? 'el-main-overflow-auto' : 'el-main-overflow-unset'">
    <!-- <el-main> -->
    <el-scrollbar class="layout-scrollbar" style="min-height: calc(100vh - 84px);" ref="layoutScrollbarRef">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in">
          <div :key="key">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </div>
        </transition>
      </router-view>
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
export default defineComponent({
  name: "layoutMain",
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const state = reactive({
      transitionName: "slide-right",
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
      proxy.$refs.layoutScrollbarRef.update();
    });
    return {
      getThemeConfig,
      key,
      ...toRefs(state),
    };
  },
});
</script>
