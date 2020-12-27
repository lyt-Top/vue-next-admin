<template>
  <el-form class="login-content-form">
    <el-form-item>
      <el-input type="text" placeholder="用户名 admin 或 test" prefix-icon="el-icon-user" v-model="ruleForm.userName"
        clearable autocomplete="off">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" placeholder="密码：123456" prefix-icon="el-icon-lock" v-model="ruleForm.password" clearable
        autocomplete="off">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-row :gutter="15">
        <el-col :span="16">
          <el-input type="text" maxlength="4" placeholder="请输入验证码" prefix-icon="el-icon-position"
            v-model="ruleForm.code" clearable autocomplete="off"></el-input>
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
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent } from "vue";
export default defineComponent({
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
});
</script>

<style scoped lang="scss">
.login-content-form {
  margin-top: 20px;
  .login-content-code {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .login-content-code-img {
      width: 100%;
      height: 40px;
      background-color: #ffffff;
      border: 1px solid rgb(220, 223, 230);
      color: #333;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 5px;
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
</style>