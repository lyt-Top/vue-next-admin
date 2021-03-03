<template>
  <div class="selector-container"></div>
</template>

<script lang="ts">
import { toRefs, reactive } from "vue";
export default {
  name: "selector",
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
};
</script>