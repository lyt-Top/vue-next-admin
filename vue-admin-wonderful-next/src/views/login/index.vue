<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="/@/assets/logo-web-element.svg" />
    </div>
    <div class="login-copyright">
      <div class="mb5">版权所有：深圳市xxx软件科技有限公司</div>
      <div>Copyright: Shenzhen XXX Software Technology Co. Ltd 粤ICP备05010000号</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "login",
};
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  background: url("/@/assets/bg-login.png") no-repeat;
  background-size: 100% 100%;
  .login-logo {
    position: absolute;
    top: 30px;
    left: 30px;
  }
  .login-copyright {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    text-align: center;
    color: white;
    font-size: 12px;
    opacity: 0.8;
  }
}
</style>