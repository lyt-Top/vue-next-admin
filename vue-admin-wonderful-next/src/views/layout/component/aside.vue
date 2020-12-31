<template>
  <el-aside width="240px">
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
              path: "/docs3",
              meta: {
                title: "文档3",
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
            {
              path: "/docs2",
              meta: {
                title: "文档2",
                icon: "el-icon-s-flag",
              },
            },
          ],
        },
        {
          path: "/docs",
          meta: {
            title: "文档",
            icon: "el-icon-s-management",
            isLink: "https://www.ele.me",
          },
        },
        {
          path: "/docs4",
          meta: {
            title: "文档4",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs5",
          meta: {
            title: "文档5",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs6",
          meta: {
            title: "文档6",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs7",
          meta: {
            title: "文档7",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs8",
          meta: {
            title: "文档8",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs9",
          meta: {
            title: "文档9",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs10",
          meta: {
            title: "文档10",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs11",
          meta: {
            title: "文档11",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs12",
          meta: {
            title: "文档12",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs13",
          meta: {
            title: "文档13",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs14",
          meta: {
            title: "文档14",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs15",
          meta: {
            title: "文档15",
            icon: "el-icon-s-management",
          },
        },
        {
          path: "/docs16",
          meta: {
            title: "文档16",
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