<template>
  <el-container class="layout-container">
    <Aside />
    <el-container>
      <el-scrollbar>
        <div class="layout-container-header-main">
          <Header />
          <Main />
        </div>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '/@/views/layout/component/aside.vue';
import Header from '/@/views/layout/component/header.vue';
import Main from '/@/views/layout/component/main.vue';
export default {
  name: 'layoutFashion',
  components: { Aside, Header, Main }
}
</script>