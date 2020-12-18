<template>
  <el-color-picker v-model="color" @change="colorChange"></el-color-picker>
  <span>灰色模式</span>
  <el-switch v-model="value1" @change="onSwitchChange1"></el-switch>
  <el-divider></el-divider>
  <div>button</div>
  <el-row>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </el-row>

  <el-row>
    <el-button plain>朴素按钮</el-button>
    <el-button type="primary" plain>主要按钮</el-button>
    <el-button type="success" plain>成功按钮</el-button>
    <el-button type="info" plain>信息按钮</el-button>
    <el-button type="warning" plain>警告按钮</el-button>
    <el-button type="danger" plain>危险按钮</el-button>
  </el-row>

  <el-row>
    <el-button round>圆角按钮</el-button>
    <el-button type="primary" round>主要按钮</el-button>
    <el-button type="success" round>成功按钮</el-button>
    <el-button type="info" round>信息按钮</el-button>
    <el-button type="warning" round>警告按钮</el-button>
    <el-button type="danger" round>危险按钮</el-button>
  </el-row>

  <el-row>
    <el-button icon="el-icon-search" circle></el-button>
    <el-button type="primary" icon="el-icon-edit" circle></el-button>
    <el-button type="success" icon="el-icon-check" circle></el-button>
    <el-button type="info" icon="el-icon-message" circle></el-button>
    <el-button type="warning" icon="el-icon-star-off" circle></el-button>
    <el-button type="danger" icon="el-icon-delete" circle></el-button>
  </el-row>
  <el-divider></el-divider>
  <div class="aaa">button</div>
  <el-divider></el-divider>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
export default {
  name: "App",
  setup() {
    const state = reactive({
      color: "",
      value1: false,
    });
    function colorChange() {
      // let aa = getDarkColor(state.color, 0.2);
      // console.log(aa);
      document.documentElement.style.setProperty(
        "--color-primary",
        state.color
      );
      document.documentElement.style.setProperty(
        "--color-primary-light-1",
        getLightColor(state.color, 0.3)
      );
    }
    function onSwitchChange1() {
      document.body.setAttribute(
        "style",
        `filter:grayscale(${state.value1 ? 1 : 0})`
      );
    }
    function HexToRgb(str) {
      var r = /^\#?[0-9A-F]{6}$/;
      //test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
      if (!r.test(str)) return window.alert("输入错误的hex");
      //replace替换查找的到的字符串
      str = str.replace("#", "");
      //match得到查询数组
      var hxs = str.match(/../g);
      //alert('bf:'+hxs)
      for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
      //alert(parseInt(80, 16))
      //console.log(hxs);
      return hxs;
    }
    //GRB颜色转Hex颜色
    function RgbToHex(a, b, c) {
      var r = /^\d{1,3}$/;
      if (!r.test(a) || !r.test(b) || !r.test(c))
        return window.alert("输入错误的rgb颜色值");
      var hexs = [a.toString(16), b.toString(16), c.toString(16)];
      for (var i = 0; i < 3; i++)
        if (hexs[i].length == 1) hexs[i] = "0" + hexs[i];
      return "#" + hexs.join("");
    }
    //得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
    function getDarkColor(color, level) {
      var r = /^\#?[0-9A-F]{6}$/;
      if (!r.test(color)) return window.alert("输入错误的hex颜色值");
      var rgbc = HexToRgb(color);
      //floor 向下取整
      for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
      return RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
    }
    //得到hex颜色值为color的减淡颜色值，level为加深的程度，限0-1之间
    function getLightColor(color, level) {
      var r = /^\#?[0-9A-F]{6}$/;
      if (!r.test(color)) return window.alert("输入错误的hex颜色值");
      var rgbc = HexToRgb(color);
      for (var i = 0; i < 3; i++)
        rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]);
      return RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
    }
    return {
      colorChange,
      onSwitchChange1,
      ...toRefs(state),
    };
  },
};
</script>