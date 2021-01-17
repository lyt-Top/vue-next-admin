<template>
  <Defaults v-if="getThemeConfig.layout === 'defaults'" />
  <Classic v-else-if="getThemeConfig.layout === 'classic'" />
  <Transverse v-else-if="getThemeConfig.layout === 'transverse'" />
  <Columns v-else-if="getThemeConfig.layout === 'columns'" />
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "/@/store/index.ts";
import Defaults from "/@/views/layout/main/defaults.vue";
import Classic from "/@/views/layout/main/classic.vue";
import Transverse from "/@/views/layout/main/transverse.vue";
import Columns from "/@/views/layout/main/columns.vue";
export default {
  name: "layout",
  components: { Defaults, Classic, Transverse, Columns },
  setup() {
    const store = useStore();
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    return {
      getThemeConfig,
    };
  },
};
</script>