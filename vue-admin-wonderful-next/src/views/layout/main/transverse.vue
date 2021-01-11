<template>
  <el-container class="layout-container flex-center">
    <Header />
    <Main />
  </el-container>
</template>

<script>
import Header from '/@/views/layout/component/header.vue';
import Main from '/@/views/layout/component/main.vue';
export default {
  name: 'layoutTransverse',
  components: { Header, Main }
}
</script>