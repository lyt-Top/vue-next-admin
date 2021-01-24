<template>
  <div>
    menu13
    <el-input v-model="val"></el-input>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, onActivated, onMounted } from "vue";
export default {
  name: "menu13",
  setup() {
    const state = reactive({
      val: "",
    });
    onMounted(() => {
      console.log(2222);
    });
    onActivated(() => {
      console.log(1111);
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>