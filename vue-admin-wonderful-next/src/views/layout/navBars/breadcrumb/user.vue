<template>
  <div class="layout-navbars-breadcrumb-user" :style="setFlexAutoStyle">
    <div class="layout-navbars-breadcrumb-user-icon" @click="onSearchClick">
      <i class="el-icon-search" title="菜单搜索"></i>
    </div>
    <div class="layout-navbars-breadcrumb-user-icon" @click="onLayoutSetingClick">
      <i class="icon-skin iconfont" title="布局配置"></i>
    </div>
    <div class="layout-navbars-breadcrumb-user-icon" @click="onUserNewsPopoverClick">
      <el-popover placement="bottom" trigger="click" v-model:visible="isShowUserNewsPopover" :width="300">
        <template #reference>
          <el-badge :is-dot="true">
            <i class="el-icon-bell" title="消息"></i>
          </el-badge>
        </template>
        <UserNews />
      </el-popover>
    </div>
    <div class="layout-navbars-breadcrumb-user-icon mr10" @click="onScreenfullClick"><i class="iconfont"
        :title="isScreenfull ? '开全屏' : '关全屏'" :class="!isScreenfull?'icon-fullscreen':'icon-tuichuquanping'"></i></div>
    <el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
      <span class="layout-navbars-breadcrumb-user-link">
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg"
          class="layout-navbars-breadcrumb-user-link-photo mr5" /> small@小柒
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="/home">首页</el-dropdown-item>
          <el-dropdown-item command="/personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="/404">404</el-dropdown-item>
          <el-dropdown-item command="/401">401</el-dropdown-item>
          <el-dropdown-item divided command="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <Search ref="searchRef" />
  </div>
</template>

<script lang="ts">
import {
  ref,
  getCurrentInstance,
  computed,
  reactive,
  toRefs,
  toRef,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import screenfull from "screenfull";
import { resetRoute } from "/@/router/index.ts";
import { useStore } from "/@/store/index.ts";
import { clearSession } from "/@/utils/storage.ts";
import UserNews from "/@/views/layout/navBars/breadcrumb/userNews.vue";
import Search from "/@/views/layout/navBars/breadcrumb/search.vue";
export default {
  name: "layoutBreadcrumbUser",
  components: { UserNews, Search },
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const searchRef = ref();
    const state = reactive({
      isScreenfull: false,
      isShowUserNewsPopover: false,
    });
    // 设置布局
    const setFlexAutoStyle = computed(() => {
      if (
        !store.state.themeConfig.isBreadcrumb &&
        store.state.themeConfig.layout !== "transverse" &&
        !store.state.themeConfig.isClassicSplitMenu
      )
        return { flex: 1 };
    });
    // 全屏点击时
    const onScreenfullClick = () => {
      if (!screenfull.isEnabled) {
        ElMessage.warning("暂不不支持全屏");
        return false;
      }
      screenfull.toggle();
      state.isScreenfull = !state.isScreenfull;
    };
    // 布局配置 icon 点击时
    const onLayoutSetingClick = () => {
      proxy.mittBus.emit("openSetingsDrawer");
    };
    // 下拉菜单点击时
    const onHandleCommandClick = (path) => {
      if (path === "logOut") {
        ElMessageBox({
          closeOnClickModal: false,
          closeOnPressEscape: false,
          title: "提示",
          message: "此操作将退出登录, 是否继续?",
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "退出中";
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 700);
            } else {
              done();
            }
          },
        })
          .then((action) => {
            clearSession(); // 清除缓存/token等
            resetRoute(); // 删除/重置路由
            router.push("/login");
            setTimeout(() => {
              ElMessage.success("退出成功！记得回来哟~");
            }, 300);
          })
          .catch(() => {});
      } else {
        router.push(path);
      }
    };
    // 菜单搜索点击
    const onSearchClick = () => {
      searchRef.value.openSearch();
    };
    // 我的消息点击
    const onUserNewsPopoverClick = () => {
      state.isShowUserNewsPopover = !state.isShowUserNewsPopover;
    };
    return {
      setFlexAutoStyle,
      onLayoutSetingClick,
      onHandleCommandClick,
      onScreenfullClick,
      onSearchClick,
      onUserNewsPopoverClick,
      searchRef,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &-link {
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
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
    display: flex;
    align-items: center;
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
  ::v-deep(.el-badge) {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
  }
  ::v-deep(.el-badge__content.is-fixed) {
    top: 12px;
  }
}
</style>