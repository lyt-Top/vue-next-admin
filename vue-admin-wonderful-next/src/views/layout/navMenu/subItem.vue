<template>
  <template v-for="val in chil">
    <el-submenu :index="val.path" :key="val.path" v-if="val.children && val.children.length > 0">
      <template #title>
        <i :class="val.meta.icon"></i>
        <span>{{ val.meta.title }}</span>
      </template>
      <sub-item :chil="val.children" />
    </el-submenu>
    <el-menu-item :index="val.path" :key="val.path" v-else>
      <i :class="val.meta.icon ? val.meta.icon : ''"></i>
      <template v-if="!val.meta.isLink || val.meta.isLink && val.meta.isIframe">
        <span>{{ val.meta.title }}</span>
      </template>
      <template v-else><a :href="val.meta.isLink" target="_blank">{{ val.meta.title }}</a></template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "navMenuSubItem",
  props: {
    chil: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    // 获取父级菜单数据
    const chil = computed(() => {
      return props.chil;
    });
    return {
      chil,
    };
  },
});
</script>
