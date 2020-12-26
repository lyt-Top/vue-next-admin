<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="/@/assets/logo-web-element.svg" />
    </div>
    <div class="login-content">
      <div class="login-content-main">
        <h4 class="login-content-title">vue-admin-wonderful</h4>
        <el-form class="login-content-form" ref="ruleForm">
          <el-form-item>
            <el-input type="text" placeholder="用户名 admin 或 test" prefix-icon="el-icon-user" v-model="ruleForm.userName"
              clearable autocomplete="off" ref="userName">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" placeholder="密码：123456" prefix-icon="el-icon-lock" v-model="ruleForm.password"
              clearable autocomplete="off" ref="password">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="15">
              <el-col :span="16">
                <el-input type="text" maxlength="4" placeholder="请输入验证码" prefix-icon="el-icon-position"
                  v-model="ruleForm.code" clearable autocomplete="off" ref="code"></el-input>
              </el-col>
              <el-col :span="8">
                <div class="login-content-code">
                  <span class="login-content-code-img">1234</span>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-content-submit" round>
              <span>登 录</span>
            </el-button>
          </el-form-item>
        </el-form>
        <el-button type="text" size="small">第三方登录</el-button>
        <el-button type="text" size="small">友情链接</el-button>
      </div>
    </div>
    <div class="login-copyright">
      <div class="mb5">版权所有：深圳市xxx软件科技有限公司</div>
      <div>Copyright: Shenzhen XXX Software Technology Co. Ltd 粤ICP备05010000号</div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive } from "vue";
export default {
  name: "login",
  setup() {
    const state = reactive({
      ruleForm: {
        userName: "",
        password: "",
        code: "",
      },
    });
    return {
      ...toRefs(state),
    };
  },
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
    height: 50px;
    display: flex;
    align-items: center;
  }
  .login-content {
    width: 500px;
    padding: 20px;
    height: 410px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 12px 0 rgba(179, 202, 233, 1);
    border-radius: 4px;
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
      }
      .login-content-form {
        .login-content-code {
          display: flex;
          align-items: center;
          justify-content: space-around;
          .login-content-code-img {
            width: 100%;
            height: 40px;
            background-color: #fdfdfd;
            border: 1px solid rgb(220, 223, 230);
            color: #333;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 5px;
            line-height: 38px;
            text-indent: 5px;
            text-align: center;
            cursor: pointer;
            transition: all ease 0.2s;
            border-radius: 4px;
            &:hover {
              border-color: #c0c4cc;
              transition: all ease 0.2s;
            }
          }
        }
        .login-content-submit {
          width: 100%;
          letter-spacing: 2px;
          font-weight: 300;
          margin-top: 15px;
        }
      }
    }
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