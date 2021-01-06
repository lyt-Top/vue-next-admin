<template>
  <el-container class="layout-container">
    <Aside />
    <el-container class="flex-center">
      <Header v-if="isFixedHeader" />
      <el-scrollbar>
        <Header v-if="!isFixedHeader" />
        <Main />
      </el-scrollbar>
    </el-container>
  </el-container>
  <Setings ref="setingsRef" />
</template>

<script>
import { computed, ref, getCurrentInstance, onBeforeMount, onUnmounted } from 'vue'
import { useStore } from "/@/store/index.ts";
import Aside from '/@/views/layout/component/aside.vue';
import Header from '/@/views/layout/component/header.vue';
import Main from '/@/views/layout/component/main.vue';
import Setings from "/@/views/layout/navBars/breadcrumb/setings.vue";
export default {
  name: 'layoutFashion',
  components: { Aside, Header, Main, Setings },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const setingsRef = ref();
    const isFixedHeader = computed(() => {
      return store.state.themeConfig.isFixedHeader;
    });
    const openSetingsDrawer = () => {
      setingsRef.value.openDrawer();
    }
    onBeforeMount(() => {
      proxy.mittBus.on("openSetingsDrawer", () => {
        openSetingsDrawer();
      });
    });
    onUnmounted(() => {
      proxy.mittBus.off("openSetingsDrawer", () => { });
    });
    return {
      setingsRef,
      isFixedHeader
    }
  }
}
</script>