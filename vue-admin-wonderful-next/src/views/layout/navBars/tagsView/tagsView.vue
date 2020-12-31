<template>
  <div class="layout-navbars-tagsview">
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
        { id: 12, name: "亚马逊", path: "/docs" },
        { id: 13, name: "京东1", path: "/docs1" },
        { id: 15, name: "谷歌2", path: "/docs2" },
        { id: 1, name: "苹果3", path: "/docs3" },
        { id: 14, name: "苹果4", path: "/docs4" },
        { id: 14, name: "苹果5", path: "/docs5" },
        { id: 14, name: "苹果6", path: "/docs6" },
        { id: 14, name: "苹果7", path: "/docs7" },
        { id: 14, name: "苹果8", path: "/docs8" },
        { id: 14, name: "苹果9", path: "/docs9" },
        { id: 14, name: "苹果10", path: "/docs10" },
        { id: 14, name: "苹果11", path: "/docs11" },
        { id: 14, name: "苹果12", path: "/docs12" },
        { id: 14, name: "苹果13", path: "/docs13" },
        { id: 14, name: "苹果14", path: "/docs14" },
        { id: 14, name: "苹果15", path: "/docs15" },
        { id: 14, name: "苹果16", path: "/docs16" },
      ],
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
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.layout-navbars-tagsview {
  flex: 1;
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
        background: #f6f6f6;
        color: var(--color-primary);
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