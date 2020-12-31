<template>
  <template v-for="val in chil">
    <el-submenu :index="val.path" :key="val.path" v-if="val.children && val.children.length > 0">
      <template #title>
        <i :class="val.meta.icon"></i>
        {{ val.meta.title }}
      </template>
      <sub-item :chil="val.children" />
    </el-submenu>
    <el-menu-item :index="val.path" :key="val.path" v-else>
      <i :class="val.meta.icon ? val.meta.icon : ''"></i>
      <template v-if="!val.meta.isLink">{{ val.meta.title }}</template>
      <template v-else><a :href="val.meta.isLink" target="_blank">{{ val.meta.title }}</a></template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
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
    const route = useRoute();
    const chil = computed(() => {
      return props.chil;
    });
    return {
      chil,
    };
  },
});
</script>
