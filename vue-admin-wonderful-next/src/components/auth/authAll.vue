<template>
  <div v-if="getUserAuthBtnList">
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
    // 判断两数组是否相同
    const judementSameArr = (news, old) => {
      let count = 0;
      const leng = old.length;
      for (let i in old) {
        for (let j in news) {
          if (old[i] === news[j]) count++;
        }
      }
      return count === leng ? true : false;
    };
    // 获取 vuex 中的用户权限
    const getUserAuthBtnList = computed(() => {
      return judementSameArr(props.value, store.state.userInfos.authBtnList);
    });
    return {
      getUserAuthBtnList,
    };
  },
};
</script>