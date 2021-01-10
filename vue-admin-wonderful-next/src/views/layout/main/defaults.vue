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
</template>

<script>
import { computed } from 'vue'
import { useStore } from "/@/store/index.ts";
import Aside from '/@/views/layout/component/aside.vue';
import Header from '/@/views/layout/component/header.vue';
import Main from '/@/views/layout/component/main.vue';
export default {
  name: 'layoutDefaults',
  components: { Aside, Header, Main },
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