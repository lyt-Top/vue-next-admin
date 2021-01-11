<template>
  <div class="layout-lock-screen layout-lock-screen-mask">
    <div class="layout-lock-screen-date">
      <div class="layout-lock-screen-date-box">
        <div class="layout-lock-screen-date-box-time">22:14</div>
        <div class="layout-lock-screen-date-box-info">1月11日，星期一</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "layoutLockScreen",
  setup() {},
};
</script>

<style scoped lang="scss">
.layout-lock-screen-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.layout-lock-screen-mask {
  background: rgba(255, 255, 255, 1);
  @extend .layout-lock-screen-fixed;
}
.layout-lock-screen {
  @extend .layout-lock-screen-fixed;
  background-image: url("https://img6.bdstatic.com/img/image/pcindex/sunjunpchuazhoutu.JPG");
  background-size: 100% 100%;
  z-index: 9999999;
  &-date {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    color: #ffffff;
    border: 1px solid red;
    &-box {
      position: absolute;
      left: 30px;
      bottom: 50px;
      &-time {
        font-size: 100px;
      }
      &-info {
        font-size: 40px;
      }
    }
  }
}
</style>