<template>
  <div class="layout-navbars-tagsview" :class="{'layout-navbars-tagsview-shadow': getThemeConfig.layout === 'classic'}"
    v-show="getThemeConfig.isTagsview">
    <Scroll ref="scrollRef">
      <ul class="layout-navbars-tagsview-ul" :class="setTagsStyle">
        <li v-for="(v,k) in tagsViewList" :key="k" class="layout-navbars-tagsview-ul-li"
          :class="{'is-active':isActive(v.path)}" @contextmenu.prevent="onContextmenu(v,$event)"
          @click="onTagsClick(v,k)" :ref="el => { if (el) tagsRefs[k] = el }">
          <i class="iconfont icon-webicon318 layout-navbars-tagsview-ul-li-iconfont" v-if="isActive(v.path)"></i>
          <i class="layout-navbars-tagsview-ul-li-iconfont" :class="v.meta.icon"
            v-if="!isActive(v.path) && getThemeConfig.isTagsviewIcon"></i>
          <span>{{v.meta.title}}</span>
          <template v-if="isActive(v.path)">
            <i class="el-icon-refresh-right ml5"></i>
            <i class="el-icon-close layout-navbars-tagsview-ul-li-icon layout-icon-active"></i>
          </template>
          <i class="el-icon-close layout-navbars-tagsview-ul-li-icon layout-icon-three"></i>
        </li>
      </ul>
    </Scroll>
  </div>
  <Contextmenu :dropdown="dropdown" ref="contextmenuRef" />
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  onMounted,
  computed,
  ref,
  nextTick,
  onBeforeUpdate,
  onBeforeMount,
} from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "/@/store/index.ts";
import Sortable from "sortablejs";
import Contextmenu from "/@/views/layout/navBars/tagsView/contextmenu.vue";
import Scroll from "/@/views/layout/navBars/tagsView/scroll.vue";
export default {
  name: "layoutTagsView",
  components: { Contextmenu, Scroll },
  setup() {
    const tagsRefs = ref([]);
    const scrollRef = ref();
    const contextmenuRef = ref();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      routePath: route.path,
      dropdown: {
        x: "",
        y: "",
      },
      tagsRefsIndex: 0,
      tagsViewList: [],
    });
    const setTagsStyle = computed(() => {
      let { tagsStyle } = store.state.themeConfig;
      if (tagsStyle === "tagsStyleTwo") return "layout-navbars-tagsview-ul-two";
      else if (tagsStyle === "tagsStyleThree")
        return "layout-navbars-tagsview-ul-three";
      else if (tagsStyle === "tagsStyleFour")
        return "layout-navbars-tagsview-ul-four";
    });
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    // 设置/过滤路由（非静态路由/是否显示在菜单中）
    const setFilterRoutes = () => {
      const routesList = router.getRoutes();
      routesList.map((route) => {
        if (route.path === "/") {
          state.tagsViewList = filterRoutesFun(route.children);
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
    const initSortable = () => {
      const el = document.querySelector(".layout-navbars-tagsview-ul");
      const sortable = Sortable.create(el, { animation: 300 });
    };
    const isActive = (path: string) => {
      return path === state.routePath;
    };
    const onContextmenu = (v: object, e: object) => {
      const { clientX, clientY } = e;
      state.dropdown.x = clientX;
      state.dropdown.y = clientY;
      contextmenuRef.value.openContextmenu();
    };
    const onTagsClick = (v: object, k: number) => {
      state.tagsRefsIndex = k;
      router.push(v.path);
    };
    const moveToCurrentTag = () => {
      nextTick(() => {
        scrollRef.value.moveToTarget(tagsRefs.value[state.tagsRefsIndex]);
      });
    };
    const getTagsRefsIndex = (path: string) => {
      if (state.tagsViewList.length > 0) {
        state.tagsRefsIndex = state.tagsViewList.findIndex(
          (item) => item.path === path
        );
      }
    };
    onBeforeUpdate(() => {
      tagsRefs.value = [];
    });
    onBeforeMount(() => {
      setFilterRoutes();
    });
    onMounted(() => {
      initSortable();
      scrollRef.value.setScrollLeft(tagsRefs);
    });
    onBeforeRouteUpdate((to) => {
      state.routePath = to.path;
      getTagsRefsIndex(to.path);
      moveToCurrentTag();
    });
    return {
      isActive,
      onContextmenu,
      onTagsClick,
      tagsRefs,
      contextmenuRef,
      scrollRef,
      getThemeConfig,
      setTagsStyle,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.layout-navbars-tagsview {
  flex: 1;
  background-color: #ffffff;
  border-top: 1px solid rgb(238, 238, 238);
  &-ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 34px;
    display: flex;
    align-items: center;
    color: #606266;
    font-size: 12px;
    white-space: nowrap;
    padding: 0 15px;
    &-li {
      height: 26px;
      line-height: 26px;
      display: flex;
      align-items: center;
      border: 1px solid #e6e6e6;
      padding: 0 15px;
      margin-right: 5px;
      border-radius: 2px;
      position: relative;
      z-index: 3;
      cursor: pointer;
      justify-content: space-between;
      &:hover {
        background-color: var(--color-primary-light-9);
        color: var(--color-primary);
        border-color: var(--color-primary-light-6);
      }
      &-iconfont {
        position: relative;
        left: -5px;
        font-size: 14px;
      }
      &-icon {
        border-radius: 100%;
        position: relative;
        height: 14px;
        width: 14px;
        text-align: center;
        line-height: 14px;
        right: -5px;
        &:hover {
          color: #fff;
          background-color: var(--color-primary-light-3);
        }
      }
      .layout-icon-active {
        display: block;
      }
      .layout-icon-three {
        display: none;
      }
    }
    .is-active {
      color: #ffffff;
      background: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
  // 风格2
  &-ul-two {
    .layout-navbars-tagsview-ul-li {
      height: 34px !important;
      line-height: 34px !important;
      border: none !important;
      .layout-navbars-tagsview-ul-li-iconfont {
        display: none;
      }
      .layout-icon-active {
        display: none;
      }
      .layout-icon-three {
        display: block;
      }
    }
    .is-active {
      background: none !important;
      color: var(--color-primary) !important;
      border-bottom: 2px solid !important;
      border-color: var(--color-primary) !important;
      border-radius: 0 !important;
    }
  }
  // 风格3
  &-ul-three {
    .layout-navbars-tagsview-ul-li {
      height: 34px !important;
      line-height: 34px !important;
      border-right: 1px solid #f6f6f6 !important;
      border-top: none !important;
      border-bottom: none !important;
      border-left: none !important;
      border-radius: 0 !important;
      margin-right: 0 !important;
      &:first-of-type {
        border-left: 1px solid #f6f6f6 !important;
      }
      .layout-icon-active {
        display: none;
      }
      .layout-icon-three {
        display: block;
      }
    }
    .is-active {
      background: white !important;
      color: var(--color-primary) !important;
      border-top: 1px solid !important;
      border-top-color: var(--color-primary) !important;
    }
  }
  // 风格4
  &-ul-four {
    .layout-navbars-tagsview-ul-li {
      margin-right: 0 !important;
      border: none !important;
      position: relative;
      border-radius: 0 !important;
      .layout-icon-active {
        display: none;
      }
      .layout-icon-three {
        display: block;
      }
      &:hover {
        background: none !important;
      }
    }
    .is-active {
      border-top-left-radius: 8px !important;
      border-top-right-radius: 8px !important;
      position: relative;
      z-index: 1;
      span {
        position: relative;
        &::before,
        &::after {
          content: "";
          position: absolute;
          bottom: 0px;
          width: 10px;
          height: 10px;
          background: var(--color-primary);
          z-index: 1;
        }
        &::before {
          left: -36px;
        }
        &::after {
          right: -51px;
        }
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
        bottom: 1px;
        width: 10px;
        height: 10px;
        background: white;
        z-index: 2;
      }
      &::before {
        left: -10px;
        transform: rotate(-4deg);
        border-bottom-right-radius: 10px;
      }
      &::after {
        right: -10px;
        transform: rotate(4deg) !important;
        border-bottom-left-radius: 10px;
      }
      &:hover {
        background: var(--color-primary) !important;
      }
    }
  }
}
.layout-navbars-tagsview-shadow {
  box-shadow: rgb(0 21 41 / 4%) 0px 1px 4px;
}
</style>