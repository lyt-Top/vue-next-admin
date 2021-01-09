<template>
  <div class="layout-navbars-breadcrumb-user">
    <div class="layout-navbars-breadcrumb-user-icon">
      <i class="el-icon-search" title="菜单搜索"></i>
    </div>
    <div class="layout-navbars-breadcrumb-user-icon" @click="onLayoutSetingClick">
      <i class="icon-skin iconfont" title="布局配置"></i>
    </div>
    <div class="layout-navbars-breadcrumb-user-icon"><i class="el-icon-bell" title="消息"></i></div>
    <div class="layout-navbars-breadcrumb-user-icon mr10"><i class="icon-fullscreen iconfont" title="开全屏"></i></div>
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
import { ref, getCurrentInstance } from "vue";
export default {
  name: "layoutBreadcrumbUser",
  setup() {
    const { proxy } = getCurrentInstance();
    const onLayoutSetingClick = () => {
      proxy.mittBus.emit("openSetingsDrawer");
    };
    return {
      onLayoutSetingClick,
    };
  },
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
    padding: 0 10px;
    cursor: pointer;
    color: var(--bg-topBarColor);
    height: 50px;
    line-height: 50px;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
      i {
        display: inline-block;
        animation: logoAnimation 0.3s ease-in-out;
      }
    }
  }
  ::v-deep(.el-dropdown) {
    color: var(--bg-topBarColor);
  }
}
</style>