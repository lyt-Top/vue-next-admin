<template>
  <div>
    menu11
    <el-input v-model="val"></el-input>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive } from "vue";
export default {
  name: "menu11",
  setup() {
    const state = reactive({
      val: "",
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>