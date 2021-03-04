<template>
  <div class="selector-container">
    <el-card shadow="hover" header="1、图标选择器：简单版本">
      <IconSelector @get="ongetCurrentIcon" />
    </el-card>
    <el-card shadow="hover" header="2、图标选择器：高级版本" class="mt15"></el-card>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive } from "vue";
import IconSelector from "/@/components/iconSelector/index.vue";
export default {
  name: "selector",
  components: { IconSelector },
  setup() {
    const state = reactive({});
    // 获取当前点击的 icon 图标
    const ongetCurrentIcon = (v) => {
      console.log(v);
    };
    return {
      ongetCurrentIcon,
      ...toRefs(state),
    };
  },
};
</script>