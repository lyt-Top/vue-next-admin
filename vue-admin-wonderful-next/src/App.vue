<template>
  <el-row>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </el-row>
  <div class="aa">
    22
    <div class="bb">33</div>
    <div class="red">44</div>
  </div>
  <el-color-picker v-model="color" @change="colorChange"></el-color-picker>
  <img src="/src/assets/images/logo/11.png" />
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
export default {
  name: "App",
  setup() {
    const state = reactive({
      color: ""
    });
    function colorChange() {
      console.log(state.color);
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--primary", state.color);
    }
    return {
      colorChange,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.aa {
  border: 1px solid red;
  .bb {
    color: blue;
    display: flex;
  }
}
</style>