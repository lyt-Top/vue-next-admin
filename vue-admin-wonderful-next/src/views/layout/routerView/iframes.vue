<template>
  <div class="layout-scrollbar">
    <div class="layout-view-bg-white flex h100" v-loading="iframeLoading">
      <iframe :src="currentRouteMeta.isLink" frameborder="0" height="100%" width="100%" id="iframe"></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
  onMounted,
  nextTick,
} from "vue";
export default defineComponent({
  name: "layoutIfameView",
  props: {
    meta: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      iframeLoading: true,
    });
    // 获取父级菜单数据
    const currentRouteMeta = computed(() => {
      return props.meta;
    });
    // 页面加载时
    onMounted(() => {
      nextTick(() => {
        const iframe = document.getElementById("iframe");
        iframe.onload = () => {
          state.iframeLoading = false;
        };
      });
    });
    return {
      currentRouteMeta,
      ...toRefs(state),
    };
  },
});
</script>