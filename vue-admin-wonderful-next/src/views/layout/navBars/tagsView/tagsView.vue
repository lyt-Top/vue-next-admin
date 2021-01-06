<template>
  <div class="layout-navbars-tagsview" v-show="getThemeConfig.isTagsview">
    <Scroll ref="scrollRef">
      <ul class="layout-navbars-tagsview-ul">
        <li v-for="(v,k) in arr2" :key="k" class="layout-navbars-tagsview-ul-li" :class="{'is-active':isActive(v.path)}"
          @contextmenu.prevent="onContextmenu(v,$event)" @click="onTagsClick(v,k)"
          :ref="el => { if (el) tagsRefs[k] = el }">
          <i class="iconfont icon-webicon318 layout-navbars-tagsview-ul-li-iconfont" v-if="isActive(v.path)"></i>
          <span>{{v.name}}</span>
          <template v-if="isActive(v.path)">
            <i class="el-icon-refresh-right ml5"></i>
            <i class="el-icon-close layout-navbars-tagsview-ul-li-icon"></i>
          </template>
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
      arr2: [
        { id: 11, name: "微软", path: "/home" },
        { id: 12, name: "文档", path: "/docs" },
        { id: 13, name: "文档1", path: "/docs1" },
        { id: 15, name: "文档2", path: "/docs2" },
        { id: 1, name: "文档3", path: "/docs3" },
      ],
    });
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
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
      if (state.arr2.length > 0) {
        state.tagsRefsIndex = state.arr2.findIndex(
          (item) => item.path === path
        );
      }
    };
    onBeforeUpdate(() => {
      tagsRefs.value = [];
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
    }
    .is-active {
      color: #ffffff;
      background: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
}
</style>