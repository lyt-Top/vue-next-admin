<template>
  <div class="qrcode-container">
    <el-card shadow="hover" header="qrcodejs2 二维码生成">
      <el-alert title="感谢优秀的 `qrcodejs2`，项目地址：https://github.com/davidshimjs/qrcodejs" type="success" :closable="false"
        class="mb15"></el-alert>
      <div class="qrcode-img-warp">
        <div class="mb30 mt30 qrcode-img">
          <div id="qrcode"></div>
        </div>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="onInitQrcode">重新生成</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted } from "vue";
export default {
  name: "qrcode",
  setup() {
    const state = reactive({
      qrcode: "",
    });
    // 初始化生成二维码
    const initQrcode = () => {
      new QRCode(document.getElementById("qrcode"), {
        text: `https://lyt-top.gitee.io/vue-next-admin-preview/#/login?t=${new Date().getTime()}`,
        width: 125,
        height: 125,
        colorDark: "#000000",
        colorLight: "#ffffff",
      });
    };
    // 重新生成
    const onInitQrcode = () => {
      document.getElementById("qrcode").innerHTML = "";
      initQrcode();
    };
    // 页面加载时
    onMounted(() => {
      initQrcode();
    });
    return {
      onInitQrcode,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.qrcode-container {
  .qrcode-img-warp {
    text-align: center;
    .qrcode-img {
      display: flex;
      width: 100%;
      height: 125px;
      #qrcode {
        margin: auto;
        width: 125px;
        height: 125px;
      }
    }
  }
}
</style>