<template>
  <div class="layout-navbars-breadcrumb-index">
    <Logo
      v-if="getThemeConfig.isShowLogo && getThemeConfig.layout === 'classic' || getThemeConfig.isShowLogo && getThemeConfig.layout === 'transverse'" />
    <Breadcrumb />
    <Horizontal :menuList="menuList" v-if="getThemeConfig.layout === 'transverse'" />
    <User />
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { useStore } from "/@/store/index.ts";
import Breadcrumb from "/@/views/layout/navBars/breadcrumb/breadcrumb.vue";
import User from "/@/views/layout/navBars/breadcrumb/user.vue";
import Logo from "/@/views/layout/logo/index.vue";
import Horizontal from "/@/views/layout/navMenu/horizontal.vue";
export default {
  name: "layoutBreadcrumbIndex",
  components: { Breadcrumb, User, Logo, Horizontal },
  setup() {
    const store = useStore();
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    const state = reactive({
      menuList: [
        {
          path: "/home",
          meta: {
            title: "首页",
            icon: "el-icon-s-home",
          },
          children: [
            {
              path: "/home",
              meta: {
                title: "微软",
                icon: "el-icon-s-flag",
              },
            },
            {
              path: "/docs",
              meta: {
                title: "文档",
                icon: "el-icon-s-flag",
              },
            },
            {
              path: "/docs1",
              meta: {
                title: "文档1",
                icon: "el-icon-s-flag",
              },
            },
          ],
        },
        {
          path: "/docs2",
          meta: {
            title: "文档2",
            icon: "el-icon-s-management",
            isLink: "https://www.ele.me",
          },
        },
        {
          path: "/docs3",
          meta: {
            title: "文档3",
            icon: "el-icon-s-management",
          },
        },
      ],
    });
    return {
      getThemeConfig,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-index {
  height: 50px;
  display: flex;
  align-items: center;
  padding-right: 15px;
  background: var(--bg-topBar);
  overflow: hidden;
}
</style>