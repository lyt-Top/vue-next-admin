<template>
  <div class="layout-navbars-breadcrumb-user">
    <i class="el-icon-search layout-navbars-breadcrumb-user-icon" title="菜单搜索"></i>
    <i class="el-icon-setting layout-navbars-breadcrumb-user-icon" title="布局配置"></i>
    <i class="el-icon-bell layout-navbars-breadcrumb-user-icon" title="消息"></i>
    <i class="icon-fullscreen iconfont layout-navbars-breadcrumb-user-icon mr10" title="开全屏"></i>
    <el-dropdown :show-timeout="70" :hide-timeout="50">
      <span class="layout-navbars-breadcrumb-user-link">
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg"
          class="layout-navbars-breadcrumb-user-link-photo mr5" /> small@小柒
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item>文档</el-dropdown-item>
          <el-dropdown-item>404</el-dropdown-item>
          <el-dropdown-item>401</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
export default {
  name: "layoutBreadcrumbUser",
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
  display: flex;
  align-items: center;
  &-link {
    height: 100%;
    display: flex;
    align-items: center;
    &-photo {
      width: 25px;
      height: 25px;
      border-radius: 100%;
    }
  }
  &-icon {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    transition: all 0.3s;
    color: #000000;
    height: 50px;
    line-height: 50px;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }
  }
}
</style>