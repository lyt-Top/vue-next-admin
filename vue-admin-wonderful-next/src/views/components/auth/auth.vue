<template>
  <div v-if="getUserAuthBtnList">
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
    const getUserAuthBtnList = computed(() => {
      return store.state.userInfos.authBtnList.some((v) => v === props.value);
    });
    return {
      getUserAuthBtnList,
    };
  },
};
</script>