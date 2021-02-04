<template>
  {{getUserAuthList}}
  <div v-if="getUserAuthList">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "/@/store/index.ts";
export default {
  nane: "authAll",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const store = useStore();
    console.log(store.state);
    // 获取 vuex 中的用户权限
    const getUserAuthList = computed(() => {
      return false;
    });
    return {
      getUserAuthList,
    };
  },
};
</script>