<template>
  <el-aside :class="getThemeConfig.isCollapse ? 'layout-aside-width64' : 'layout-aside-width-default'">
    <Logo v-if="getThemeConfig.isShowLogo" />
    <el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef">
      <Vertical :menuList="menuList" />
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
import { toRefs, reactive, computed, watch, getCurrentInstance } from "vue";
import { useStore } from "/@/store/index.ts";
import Logo from "/@/views/layout/logo/index.vue";
import Vertical from "/@/views/layout/navMenu/vertical.vue";
export default {
  name: "layoutAside",
  components: { Logo, Vertical },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
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
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    watch(store.state.themeConfig, (val) => {
      if (val.isShowLogoChange !== val.isShowLogo) {
        proxy.$refs.layoutAsideScrollbarRef.update();
      }
    });
    return {
      getThemeConfig,
      ...toRefs(state),
    };
  },
};
</script>