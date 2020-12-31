<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="/@/assets/logo-web-element.svg" />
    </div>
    <div class="login-content" :class="{'login-content-mobile' : tabsActiveName === 'mobile'}">
      <div class="login-content-main">
        <h4 class="login-content-title">vue-admin-wonderful</h4>
        <el-tabs v-model="tabsActiveName" @tab-click="onTabsClick">
          <el-tab-pane label="账号密码登录" name="account">
            <transition name="el-zoom-in-center">
              <Account v-show="!isTabPaneShow" />
            </transition>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="mobile">
            <transition name="el-zoom-in-center">
              <Mobile v-show="isTabPaneShow" />
            </transition>
          </el-tab-pane>
        </el-tabs>
        <el-button type="text" size="small">第三方登录</el-button>
        <el-button type="text" size="small">友情链接</el-button>
      </div>
    </div>
    <div class="login-copyright">
      <div class="mb5 login-copyright-company">版权所有：深圳市xxx软件科技有限公司</div>
      <div class="login-copyright-msg">Copyright: Shenzhen XXX Software Technology 粤ICP备05010000号</div>
    </div>
  </div>
</template>

<script lang="ts">
import Account from "/@/views/login/component/account.vue";
import Mobile from "/@/views/login/component/mobile.vue";
import { toRefs, reactive } from "vue";
export default {
  name: "login",
  components: { Account, Mobile },
  setup() {
    const state = reactive({
      tabsActiveName: "account",
      isTabPaneShow: false,
    });
    const onTabsClick = () => {
      state.isTabPaneShow = !state.isTabPaneShow;
    };
    return {
      onTabsClick,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  background: url("/src/assets/bg-login.png") no-repeat;
  background-size: 100% 100%;
  .login-logo {
    position: absolute;
    top: 30px;
    left: 30px;
    height: 50px;
    display: flex;
    align-items: center;
  }
  .login-content {
    width: 500px;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translate3d(0, 0, 0);
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 12px 0 var(--color-primary-light-1);
    border-radius: 4px;
    transition: height 0.2s linear;
    height: 480px;
    overflow: hidden;
    z-index: 1;
    .login-content-main {
      margin: 0 auto;
      width: 80%;
      .login-content-title {
        color: #333;
        font-weight: 500;
        font-size: 22px;
        text-align: center;
        letter-spacing: 4px;
        margin: 15px 0 30px;
        white-space: nowrap;
      }
    }
  }
  .login-content-mobile {
    height: 418px;
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
    .login-copyright-company {
      white-space: nowrap;
    }
    .login-copyright-msg {
      @extend .login-copyright-company;
    }
  }
}
</style>