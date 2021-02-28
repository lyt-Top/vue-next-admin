<template>
  <div :style="{height: `calc(100vh - ${initTagViewHeight}`}">
    <div class="layout-view-bg-white">
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, onMounted } from "vue";
import { useStore } from "/@/store/index.ts";
export default {
  name: "Graph",
  setup() {
    const store = useStore();
    const state = reactive({
      tagViewHeight: "",
    });
    // 设置主内容的高度
    const initTagViewHeight = computed(() => {
      let { isTagsview } = store.state.themeConfig;
      if (isTagsview) return `114px`;
      else return `80px`;
    });
    // 初始化数据
    const initGraph = () => {};
    // 页面加载时
    onMounted(() => {
      initGraph();
    });
    return {
      initTagViewHeight,
      ...toRefs(state),
    };
  },
};
</script>