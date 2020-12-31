<template>
  <el-main>
    <el-scrollbar class="layout-scrollbar">
      <router-view v-slot="{ Component }">
        <transition appear :name="transitionName" mode="out-in">
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
import { computed, defineComponent, toRefs, reactive } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
export default defineComponent({
  name: "layoutMain",
  setup() {
    const route = useRoute();
    const state = reactive({
      transitionName: "slide-right",
    });
    const key = computed(() => route.path);
    onBeforeRouteUpdate((to, from) => {
      state.transitionName =
        to.meta.index > from.meta.index ? "slide-right" : "slide-left";
    });
    return { key, ...toRefs(state) };
  },
});
</script>
