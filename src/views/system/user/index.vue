<template>
  <div>
    systemUser
    <el-input v-model="val"></el-input>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive } from "vue";
export default {
  name: "systemUser",
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