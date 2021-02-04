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
      type: Array,
      default: () => [],
    },
  },
  nane: "auths",
  setup(props) {
    const store = useStore();
    // 获取 vuex 中的用户权限
    const getUserAuthList = computed(() => {
      let flag = false;
      store.state.auths.map((val) => {
        props.value.map((v) => {
          if (val === v) flag = true;
        });
      });
      return flag;
    });
    return {
      getUserAuthList,
    };
  },
};
</script>