<template>
  <el-menu router :default-active="defaultActive" background-color="#29384D" text-color="#e6e6e6">
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
</template>

<script lang="ts">
import { toRefs, reactive, computed, defineComponent } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
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
    const route = useRoute();
    const state = reactive({
      defaultActive: route.path,
    });
    const menuList = computed(() => {
      return props.menuList;
    });
    onBeforeRouteUpdate((to) => {
      state.defaultActive = to.path;
    });
    return {
      menuList,
      ...toRefs(state),
    };
  },
});
</script>
