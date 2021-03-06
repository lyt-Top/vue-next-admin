<template>
  <el-container class="layout-container flex-center">
    <Header />
    <el-container class="layout-mian-height-50">
      <Aside />
      <div class="flex-center layout-backtop">
        <TagsView />
        <Main />
      </div>
    </el-container>
    <el-backtop target=".layout-backtop .el-main .el-scrollbar__wrap"></el-backtop>
  </el-container>
</template>

<script>
import Aside from '/@/views/layout/component/aside.vue';
import Header from '/@/views/layout/component/header.vue';
import Main from '/@/views/layout/component/main.vue';
import TagsView from "/@/views/layout/navBars/tagsView/tagsView.vue";
export default {
  name: 'layoutClassic',
  components: { Aside, Header, Main, TagsView }
}
</script>