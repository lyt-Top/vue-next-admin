<template>
  <el-menu router :default-active="defaultActive" background-color="transparent" :collapse="getThemeConfig.isCollapse"
    :unique-opened="getThemeConfig.isUniqueOpened" :collapse-transition="false">
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
        <template #title v-if="!val.meta.isLink || val.meta.isLink && val.meta.isIframe">
          <span>{{ val.meta.title }}</span>
        </template>
        <template #title v-else><a :href="val.meta.isLink" target="_blank">{{ val.meta.title }}</a></template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  computed,
  defineComponent,
  getCurrentInstance,
} from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "/@/store/index.ts";
import SubItem from "/@/views/layout/navMenu/subItem.vue";
export default defineComponent({
  name: "navMenuVertical",
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
    const store = useStore();
    const route = useRoute();
    const state = reactive({
      defaultActive: route.path,
    });
    // 获取父级菜单数据
    const menuList = computed(() => {
      return props.menuList;
    });
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    // 路由更新时
    onBeforeRouteUpdate((to) => {
      state.defaultActive = to.path;
      proxy.mittBus.emit("onMenuClick");
    });
    return {
      menuList,
      getThemeConfig,
      ...toRefs(state),
    };
  },
});
</script>
