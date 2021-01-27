<template>
  <el-form class="login-content-form">
    <el-form-item>
      <el-input type="text" placeholder="用户名 admin 或不输均为 test" prefix-icon="el-icon-user" v-model="ruleForm.userName"
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
      <el-button type="primary" class="login-content-submit" round @click="onSignIn">
        <span>登 录</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {
  setAddRoute,
  setFilterMenu,
  setCacheTagsViewRoutes,
} from "/@/router/index.ts";
import { useStore } from "/@/store/index.ts";
import { setSession } from "/@/utils/storage.ts";
import { formatAxis } from "/@/utils/formatTime";
export default defineComponent({
  name: "login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      ruleForm: {
        userName: "admin",
        password: "123456",
        code: "1234",
      },
    });
    // 时间获取
    const currentTime = computed(() => {
      return formatAxis(new Date());
    });
    // 重新执行添加动态路由、过滤权限菜单、缓存等方法
    const initAllFun = () => {
      setAddRoute();
      setFilterMenu();
      setCacheTagsViewRoutes();
    };
    // 登录
    const onSignIn = () => {
      let currentTimeInfo = currentTime.value;
      let defaultAuthList: Array<string> = [];
      let adminAuthList: Array<string> = [
        "admin",
        "btn.add",
        "btn.del",
        "btn.edit",
      ];
      let testAuthList: Array<string> = ["test", "btn.add"];
      if (state.ruleForm.userName === "admin") defaultAuthList = adminAuthList;
      else defaultAuthList = testAuthList;
      store.dispatch("setAuths", defaultAuthList);
      initAllFun();
      setSession("defaultAuthList", defaultAuthList);
      setSession("token", Math.random().toString(36).substr(0));
      setSession("userInfo", {
        userName: state.ruleForm.userName,
        time: new Date().getTime(),
      });
      router.push("/");
      setTimeout(() => {
        ElMessage.success(`${currentTimeInfo}，欢迎回来！`);
      }, 300);
    };
    return {
      currentTime,
      onSignIn,
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