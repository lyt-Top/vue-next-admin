<template>
  <div class="el-menu-horizontal-warp">
    <el-scrollbar @wheel.native.prevent="onElMenuHorizontalScroll" ref="elMenuHorizontalScrollRef">
      <el-menu router :default-active="defaultActive" background-color="transparent" mode="horizontal">
        <template v-for="val in menuList">
          <el-submenu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
            <template #title>
              <i :class="val.meta.icon ? val.meta.icon : ''"></i>
              <span>{{ val.meta.title }}</span>
            </template>
            <SubItem :chil="val.children" />
          </el-submenu>
          <el-menu-item :index="val.path" :key="val.path" v-else>
            <i :class="val.meta.icon ? val.meta.icon : ''"></i>
            <template #title v-if="!val.meta.isLink">{{ val.meta.title }}</template>
            <template #title v-else><a :href="val.meta.isLink" target="_blank">{{ val.meta.title }}</a></template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  nextTick,
} from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "/@/store/index.ts";
import SubItem from "/@/views/layout/navMenu/subItem.vue";
export default defineComponent({
  name: "navMenuHorizontal",
  components: { SubItem },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      defaultActive: null,
    });
    // 获取父级菜单数据
    const menuList = computed(() => {
      return props.menuList;
    });
    // 设置横向滚动条可以鼠标滚轮滚动
    const onElMenuHorizontalScroll = (e: object) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      proxy.$refs.elMenuHorizontalScrollRef.$refs.wrap.scrollLeft =
        proxy.$refs.elMenuHorizontalScrollRef.$refs.wrap.scrollLeft +
        eventDelta / 4;
    };
    // 初始化数据，页面刷新时，滚动条滚动到对应位置
    const initElMenuOffsetLeft = () => {
      nextTick(() => {
        let els = document.querySelector(
          ".el-menu.el-menu--horizontal li.is-active"
        );
        if (!els) return false;
        proxy.$refs.elMenuHorizontalScrollRef.$refs.wrap.scrollLeft =
          els.offsetLeft;
      });
    };
    // 设置页面当前路由高亮
    const setCurrentRouterHighlight = (path: string) => {
      const currentPathSplit = path.split("/");
      if (store.state.themeConfig.layout === "classic") {
        state.defaultActive = `/${currentPathSplit[1]}`;
      } else {
        state.defaultActive = path;
      }
    };
    // 页面加载时
    onMounted(() => {
      initElMenuOffsetLeft();
      setCurrentRouterHighlight(route.path);
    });
    // 路由更新时
    onBeforeRouteUpdate((to) => {
      setCurrentRouterHighlight(to.path);
      proxy.mittBus.emit("onMenuClick");
    });
    return {
      menuList,
      onElMenuHorizontalScroll,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss">
.el-menu-horizontal-warp {
  flex: 1;
  overflow: hidden;
  margin-right: 30px;
  .el-menu.el-menu--horizontal {
    display: flex;
  }
}
</style>