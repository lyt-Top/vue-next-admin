<template>
  <Defaults v-if="getThemeConfig.layout === 'defaults'" />
  <Classic v-else-if="getThemeConfig.layout === 'classic'" />
  <Transverse v-else-if="getThemeConfig.layout === 'transverse'" />
  <Columns v-else-if="getThemeConfig.layout === 'columns'" />
  <Setings ref="setingsRef" />
</template>

<script lang="ts">
import {
  computed,
  ref,
  getCurrentInstance,
  onBeforeMount,
  onUnmounted,
} from "vue";
import { useStore } from "/@/store/index.ts";
import Defaults from "/@/views/layout/main/defaults.vue";
import Classic from "/@/views/layout/main/classic.vue";
import Transverse from "/@/views/layout/main/transverse.vue";
import Columns from "/@/views/layout/main/columns.vue";
import Setings from "/@/views/layout/navBars/breadcrumb/setings.vue";
export default {
  name: "layout",
  components: { Defaults, Classic, Transverse, Columns, Setings },
  setup() {
    const { proxy } = getCurrentInstance();
    const setingsRef = ref();
    const store = useStore();
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    const openSetingsDrawer = () => {
      setingsRef.value.openDrawer();
    };
    onBeforeMount(() => {
      proxy.mittBus.on("openSetingsDrawer", () => {
        openSetingsDrawer();
      });
    });
    onUnmounted(() => {
      proxy.mittBus.off("openSetingsDrawer", () => {});
    });
    return {
      setingsRef,
      getThemeConfig,
    };
  },
};
</script>