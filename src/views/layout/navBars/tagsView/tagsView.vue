<template>
  <div class="layout-navbars-tagsview" :class="{'layout-navbars-tagsview-shadow': getThemeConfig.layout === 'classic'}">
    <Scroll ref="scrollRef">
      <ul class="layout-navbars-tagsview-ul" :class="setTagsStyle">
        <li v-for="(v,k) in tagsViewList" :key="k" class="layout-navbars-tagsview-ul-li" :data-name="v.name"
          :class="{'is-active':isActive(v.path)}" @contextmenu.prevent="onContextmenu(v,$event)"
          @click="onTagsClick(v,k)" :ref="el => { if (el) tagsRefs[k] = el }">
          <i class="iconfont icon-webicon318 layout-navbars-tagsview-ul-li-iconfont font14" v-if="isActive(v.path)"></i>
          <i class="layout-navbars-tagsview-ul-li-iconfont" :class="v.meta.icon"
            v-if="!isActive(v.path) && getThemeConfig.isTagsviewIcon"></i>
          <span>{{v.meta.title}}</span>
          <template v-if="isActive(v.path)">
            <i class="el-icon-refresh-right ml5" @click="refreshCurrentTagsView(v.path)"></i>
            <i class="el-icon-close layout-navbars-tagsview-ul-li-icon layout-icon-active" v-if="!v.meta.isAffix"
              @click="closeCurrentTagsView(v.path)"></i>
          </template>
          <i class="el-icon-close layout-navbars-tagsview-ul-li-icon layout-icon-three" v-if="!v.meta.isAffix"
            @click="closeCurrentTagsView(v.path)"></i>
        </li>
      </ul>
    </Scroll>
  </div>
  <Contextmenu :dropdown="dropdown" ref="contextmenuRef" @currentContextmenuClick="onCurrentContextmenuClick" />
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
  onUnmounted,
  getCurrentInstance,
  watch,
} from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "/@/store/index.ts";
import { setSession, getSession, removeSession } from "/@/utils/storage.ts";
import Sortable from "sortablejs";
import Contextmenu from "/@/views/layout/navBars/tagsView/contextmenu.vue";
import Scroll from "/@/views/layout/navBars/tagsView/scroll.vue";
export default {
  name: "layoutTagsView",
  components: { Contextmenu, Scroll },
  setup() {
    const { proxy } = getCurrentInstance();
    const tagsRefs = ref([]);
    const scrollRef = ref();
    const contextmenuRef = ref();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      routePath: route.path,
      dropdown: { x: "", y: "" },
      tagsRefsIndex: 0,
      tagsViewList: [],
      sortable: "",
      tagsViewRoutesList: [],
    });
    // 动态设置 tagsView 风格样式
    const setTagsStyle = computed(() => {
      let { tagsStyle } = store.state.themeConfig;
      if (tagsStyle === "tagsStyleTwo") return "layout-navbars-tagsview-ul-two";
      else if (tagsStyle === "tagsStyleThree")
        return "layout-navbars-tagsview-ul-three";
      else if (tagsStyle === "tagsStyleFour")
        return "layout-navbars-tagsview-ul-four";
    });
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    // 存储 tagsViewList 到浏览器临时缓存中，页面刷新时，保留记录
    const addBrowserSetSession = (tagsViewList: Array<object>) => {
      setSession("tagsViewList", tagsViewList);
    };
    // 获取 vuex 中的 tagsViewRoutes 列表
    const getTagsViewRoutes = () => {
      state.routePath = route.path;
      state.tagsViewList = [];
      removeSession("tagsViewList");
      state.tagsViewRoutesList = store.state.tagsViewRoutes;
      initTagsView();
    };
    // vuex 中获取路由信息：如果是设置了固定的（isAffix），进行初始化显示
    const initTagsView = () => {
      if (
        getSession("tagsViewList") &&
        store.state.themeConfig.isCacheTagsView
      ) {
        state.tagsViewList = getSession("tagsViewList");
      } else {
        state.tagsViewRoutesList.map((v) => {
          if (v.meta.isAffix && !v.meta.isHide)
            state.tagsViewList.push({ ...v });
        });
        addTagsView(route.path);
      }
      // 添加初始化横向滚动条移动到对应位置
      scrollRef.value.setScrollLeft(tagsRefs);
      getTagsRefsIndex(route.path);
      moveToCurrentTag();
    };
    // 1、添加 tagsView：未设置隐藏（isHide）也添加到在 tagsView 中
    const addTagsView = (path: string) => {
      if (state.tagsViewList.some((v) => v.path === path)) return false;
      const item = state.tagsViewRoutesList.find((v) => v.path === path);
      if (item.meta.isLink && !item.meta.isIframe) return false;
      if (!item.meta.isHide) state.tagsViewList.push({ ...item });
      addBrowserSetSession(state.tagsViewList);
    };
    // 2、刷新当前 tagsView：
    const refreshCurrentTagsView = (path: string) => {
      proxy.mittBus.emit("onTagsViewRefreshRouterView", path);
    };
    // 3、关闭当前 tagsView：如果是设置了固定的（isAffix），不可以关闭
    const closeCurrentTagsView = (path: string) => {
      state.tagsViewList.map((v, k, arr) => {
        if (!v.meta.isAffix) {
          if (v.path === path) {
            state.tagsViewList.splice(k, 1);
            setTimeout(() => {
              router.push(arr[arr.length - 1].path);
            }, 0);
          }
        }
      });
      addBrowserSetSession(state.tagsViewList);
    };
    // 4、关闭其它 tagsView：如果是设置了固定的（isAffix），不进行关闭
    const closeOtherTagsView = (path: string) => {
      state.tagsViewList = [];
      state.tagsViewRoutesList.map((v) => {
        if (v.meta.isAffix && !v.meta.isHide) state.tagsViewList.push({ ...v });
      });
      addTagsView(path);
    };
    // 5、关闭全部 tagsView：如果是设置了固定的（isAffix），不进行关闭
    const closeAllTagsView = (path: string) => {
      state.tagsViewList = [];
      state.tagsViewRoutesList.map((v) => {
        if (v.meta.isAffix && !v.meta.isHide) {
          state.tagsViewList.push({ ...v });
          if (state.tagsViewList.some((v) => v.path === path))
            router.push(path);
          else router.push(v.path);
        }
      });
      addBrowserSetSession(state.tagsViewList);
    };
    // 当前项右键菜单点击
    const onCurrentContextmenuClick = (data: object) => {
      let { id, path } = data;
      switch (id) {
        case 0:
          refreshCurrentTagsView(path);
          router.push(path);
          break;
        case 1:
          closeCurrentTagsView(path);
          break;
        case 2:
          router.push(path);
          closeOtherTagsView(path);
          break;
        case 3:
          closeAllTagsView(path);
          break;
      }
    };
    // 判断页面高亮
    const isActive = (path: string) => {
      return path === state.routePath;
    };
    // 右键点击时：传 x,y 坐标值到子组件中（props）
    const onContextmenu = (v: object, e: object) => {
      const { clientX, clientY } = e;
      state.dropdown.x = clientX;
      state.dropdown.y = clientY;
      contextmenuRef.value.openContextmenu(v);
    };
    // 当前的 tagsView 项点击时
    const onTagsClick = (v: object, k: number) => {
      state.routePath = v.path;
      state.tagsRefsIndex = k;
      router.push(v.path);
    };
    // tagsView 横向滚动 + 鼠标滚轮滚动
    const moveToCurrentTag = () => {
      nextTick(() => {
        scrollRef.value.moveToTarget(tagsRefs.value[state.tagsRefsIndex]);
        scrollRef.value.updateScrollbar();
      });
    };
    // 获取 tagsView 的下标：用于处理 tagsView 点击时的横向滚动
    const getTagsRefsIndex = (path: string) => {
      if (state.tagsViewList.length > 0) {
        const tagsRefsFindIndex = state.tagsViewList.findIndex(
          (item) => item.path === path
        );
        if (tagsRefsFindIndex <= 0) return false;
        state.tagsRefsIndex = tagsRefsFindIndex;
      }
    };
    // 设置 tagsView 可以进行拖拽
    const initSortable = () => {
      const el = document.querySelector(".layout-navbars-tagsview-ul");
      if (!el) return false;
      if (!getThemeConfig.value.isSortableTagsView)
        state.sortable && state.sortable.destroy();
      if (getThemeConfig.value.isSortableTagsView) {
        state.sortable = Sortable.create(el, {
          animation: 300,
          dataIdAttr: "data-name",
          onEnd: () => {
            const sortEndList = [];
            state.sortable.toArray().map((val) => {
              state.tagsViewList.map((v) => {
                if (v.name === val) sortEndList.push({ ...v });
              });
            });
            addBrowserSetSession(sortEndList);
          },
        });
      }
    };
    // 监听路由的变化，动态赋值给 tagsView
    watch(store.state, (val) => {
      if (val.tagsViewRoutes.length === state.tagsViewRoutesList.length)
        return false;
      getTagsViewRoutes();
    });
    // 页面加载前
    onBeforeMount(() => {
      // 监听非本页面调用 0 刷新当前，1 关闭当前，2 关闭其它，3 关闭全部
      proxy.mittBus.on("onCurrentContextmenuClick", (data: object) => {
        onCurrentContextmenuClick(data);
      });
      // 监听布局配置界面开启/关闭拖拽
      proxy.mittBus.on("openOrCloseSortable", () => {
        initSortable();
      });
    });
    // 页面卸载时
    onUnmounted(() => {
      // 取消非本页面调用监听
      proxy.mittBus.off("onCurrentContextmenuClick");
      // 取消监听布局配置界面开启/关闭拖拽
      proxy.mittBus.off("openOrCloseSortable");
    });
    // 页面更新时
    onBeforeUpdate(() => {
      tagsRefs.value = [];
    });
    // 页面加载时
    onMounted(() => {
      // 初始化 vuex 中的 tagsViewRoutes 列表
      getTagsViewRoutes();
      initSortable();
    });
    // 路由更新时
    onBeforeRouteUpdate((to) => {
      state.routePath = to.path;
      addTagsView(to.path);
      getTagsRefsIndex(to.path);
      moveToCurrentTag();
    });
    return {
      isActive,
      onContextmenu,
      getTagsViewRoutes,
      onTagsClick,
      tagsRefs,
      contextmenuRef,
      scrollRef,
      getThemeConfig,
      setTagsStyle,
      refreshCurrentTagsView,
      closeCurrentTagsView,
      onCurrentContextmenuClick,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.layout-navbars-tagsview {
  flex: 1;
  background-color: #ffffff;
  ::v-deep(.el-scrollbar__wrap) {
    overflow-x: auto !important;
  }
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
      z-index: 0;
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
        font-size: 12px;
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
      border-radius: 3px !important;
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
      background: none !important;
      color: var(--color-primary) !important;
    }
  }
}
.layout-navbars-tagsview-shadow {
  box-shadow: rgb(0 21 41 / 4%) 0px 1px 4px;
}
</style>