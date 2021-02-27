<template>
  <div class="system-menu-add-container"></div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
export default {
  name: "systemAddMenu",
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
};
</script>