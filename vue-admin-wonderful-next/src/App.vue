<template>
  <el-row>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </el-row>
  <div class="Selector1">
    22
    <div class="aaa">66</div>
    <div class="bb">33</div>
    <div class="red">44</div>
  </div>
  <el-color-picker v-model="color" @change="colorChange"></el-color-picker>
  <!-- <img src="/@/assets/11.png" /> -->
  <span>灰色模式</span>
  <el-switch v-model="value1" @change="onSwitchChange1"></el-switch>
  <el-tabs v-model="activeName">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

  <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template #title>我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template #title>选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
export default {
  name: "App",
  setup() {
    const state = reactive({
      color: "",
      value1: false,
      activeName: "second",
      activeIndex2: "1",
    });
    function colorChange() {
      document.documentElement.style.setProperty(
        "--color-primary",
        state.color
      );
    }
    function onSwitchChange1() {
      document.body.setAttribute(
        "style",
        `filter:grayscale(${state.value1 ? 1 : 0})`
      );
    }
    return {
      colorChange,
      onSwitchChange1,
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