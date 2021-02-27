<template>
  <div class="system-menu-edit-container"></div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
export default {
  name: "systemEditMenu",
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
};
</script>