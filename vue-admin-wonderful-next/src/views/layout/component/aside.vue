<template>
  <el-aside class="layout-aside-width">
    <el-scrollbar>
      <Vertical :menuList="menuList" />
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
import Vertical from "/@/views/layout/navMenu/vertical.vue";
import { toRefs, reactive } from "vue";
export default {
  name: "layoutAside",
  components: { Vertical },
  setup() {
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
      ...toRefs(state),
    };
  },
};
</script>