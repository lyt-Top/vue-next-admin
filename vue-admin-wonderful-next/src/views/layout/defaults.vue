<template>
  <el-container class="layout-container">
    <Aside />
    <el-container>
      <el-scrollbar>
        <div class="layout-container-header-main" :class="{'vh100': getThemeConfig.isFixedHeader}">
          <Header />
          <Main />
        </div>
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
  name: 'layoutFashion',
  components: { Aside, Header, Main },
  setup() {
    const store = useStore();
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    return {
      getThemeConfig
    }
  }
}
</script>