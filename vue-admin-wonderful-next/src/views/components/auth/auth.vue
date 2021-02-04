<template>
  <div v-if="getUserAuthList">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "/@/store/index.ts";
export default {
  props: {
    value: {
      type: String,
      default: () => "",
    },
  },
  nane: "auth",
  setup(props) {
    const store = useStore();
    // 获取 vuex 中的用户权限
    const getUserAuthList = computed(() => {
      return store.state.auths.some((v) => v === props.value);
    });
    return {
      getUserAuthList,
    };
  },
};
</script>