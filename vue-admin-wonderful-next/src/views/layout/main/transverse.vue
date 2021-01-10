<template>
  <el-container class="layout-container flex-center">
    <Header />
    <Main />
  </el-container>
</template>

<script>
import Aside from '/@/views/layout/component/aside.vue';
import Header from '/@/views/layout/component/header.vue';
import Main from '/@/views/layout/component/main.vue';
import TagsView from "/@/views/layout/navBars/tagsView/tagsView.vue";
export default {
  name: 'layoutTransverse',
  components: { Aside, Header, Main, TagsView }
}
</script>