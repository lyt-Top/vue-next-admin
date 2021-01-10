<template>
  <el-container class="layout-container">
    <ColumnsAside />
    <div style="flex:1;display: flex;">
      <Aside />
      <el-container class="flex-center">
        <Header v-if="isFixedHeader" />
        <el-scrollbar>
          <Header v-if="!isFixedHeader" />
          <Main />
        </el-scrollbar>
      </el-container>
    </div>
  </el-container>
</template>

<script>
import { computed } from 'vue'
import { useStore } from "/@/store/index.ts";
import Aside from '/@/views/layout/component/aside.vue';
import Header from '/@/views/layout/component/header.vue';
import Main from '/@/views/layout/component/main.vue';
import ColumnsAside from '/@/views/layout/component/columnsAside.vue';
export default {
  name: 'layoutColumns',
  components: { Aside, Header, Main, ColumnsAside },
  setup() {
    const store = useStore();
    const isFixedHeader = computed(() => {
      return store.state.themeConfig.isFixedHeader;
    });
    return {
      isFixedHeader
    }
  }
}
</script>