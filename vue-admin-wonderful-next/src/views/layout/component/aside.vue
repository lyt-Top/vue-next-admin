<template>
  <el-aside :class="setCollapseWidth">
    <Logo v-if="setShowLogo" />
    <el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef">
      <Vertical :menuList="menuList" />
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  computed,
  watch,
  getCurrentInstance,
  ref,
  onBeforeMount,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "/@/store/index.ts";
import Logo from "/@/views/layout/logo/index.vue";
import Vertical from "/@/views/layout/navMenu/vertical.vue";
export default {
  name: "layoutAside",
  components: { Logo, Vertical },
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      menuList: [],
    });
    // 设置/过滤路由（非静态路由/是否显示在菜单中）
    const setFilterRoutes = () => {
      const routesList = router.getRoutes();
      routesList.map((route) => {
        if (route.path === "/") {
          state.menuList = filterRoutesFun(route.children);
          console.log(filterRoutesFun(route.children));
        }
      });
    };
    // 路由过滤递归函数
    const filterRoutesFun = (arr: Array<object>) => {
      return arr
        .filter((item) => !item.meta.isHide)
        .map((item) => {
          item = Object.assign({}, item);
          if (item.children) item.children = filterRoutesFun(item.children);
          return item;
        });
    };
    // 设置菜单展开/收起时的宽度
    const setCollapseWidth = computed(() => {
      let { layout, isCollapse, menuBar } = store.state.themeConfig;
      let asideBrColor =
        menuBar === "#FFFFFF" ||
        menuBar === "#FFF" ||
        menuBar === "#fff" ||
        menuBar === "#ffffff"
          ? "layout-el-aside-br-color"
          : "";
      if (layout === "columns") {
        // 分栏布局，菜单收起时宽度给 1px
        if (isCollapse) {
          return ["layout-aside-width1", asideBrColor];
        } else {
          return ["layout-aside-width-default", asideBrColor];
        }
      } else {
        // 其它布局给 64px
        if (isCollapse) {
          return ["layout-aside-width64", asideBrColor];
        } else {
          return ["layout-aside-width-default", asideBrColor];
        }
      }
    });
    // 设置显示/隐藏 logo
    const setShowLogo = computed(() => {
      let { layout, isShowLogo } = store.state.themeConfig;
      return (
        (isShowLogo && layout === "defaults") ||
        (isShowLogo && layout === "columns")
      );
    });
    // 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
    watch(store.state.themeConfig, (val) => {
      if (val.isShowLogoChange !== val.isShowLogo) {
        if (!proxy.$refs.layoutAsideScrollbarRef) return false;
        proxy.$refs.layoutAsideScrollbarRef.update();
      }
    });
    // 初始化
    onBeforeMount(() => {
      setFilterRoutes();
    });
    return {
      setCollapseWidth,
      setShowLogo,
      ...toRefs(state),
    };
  },
};
</script>