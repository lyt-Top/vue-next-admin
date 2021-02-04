<template>
  <div>
    <el-alert title="温馨提示：此权限页面代码及效果只作为演示使用，若出现不可逆转的bug，请尝试 `F5` 刷新页面。若实际项目中非要实现此用户权限切换功能，
      请在切换方法 `onRadioChange` 最后面添加刷新代码 `window.location.reload()`。" type="warning" :closable="false"></el-alert>
    <el-alert :title="`当前用户权限：[${getAuthList}]`" type="success" :closable="false" class="mt15"></el-alert>
    <el-card shadow="hover" header="切换用户演示，前端控制不同用户显示不同页面权限" class="mt15">
      <el-radio-group v-model="userAuth" size="small" @change="onRadioChange">
        <el-radio-button label="admin"></el-radio-button>
        <el-radio-button label="test"></el-radio-button>
      </el-radio-group>
    </el-card>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "/@/store/index.ts";
import {
  resetRoute,
  setAddRoute,
  setFilterMenu,
  setCacheTagsViewRoutes,
} from "/@/router/index.ts";
import { setSession } from "/@/utils/storage.ts";
export default {
  name: "limitsFrontEndPage",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      val: "",
      userAuth: "",
    });
    // 获取用户权限信息
    const getAuthList = computed(() => {
      return store.state.auths;
    });
    // 初始化用户权限
    const initUserAuth = () => {
      state.userAuth = store.state.auths[0];
    };
    // 重新执行添加动态路由、过滤权限菜单、缓存等方法
    const initAllFun = () => {
      setAddRoute();
      setFilterMenu();
      setCacheTagsViewRoutes();
    };
    // 用户权限改变时
    const onRadioChange = () => {
      resetRoute();
      let defaultAuthPageList: Array<string> = [];
      let adminAuthList: Array<string> = [
        "admin",
        "btn.add",
        "btn.del",
        "btn.edit",
        "btn.link",
      ];
      let testAuthList: Array<string> = ["test", "btn.add", "btn.link"];
      if (state.userAuth === "admin") defaultAuthPageList = adminAuthList;
      else defaultAuthPageList = testAuthList;
      const userInfos = {
        userName: state.userAuth,
        photo:
          state.userAuth === "admin"
            ? "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg"
            : "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg",
        time: new Date().getTime(),
        authPageList: defaultAuthPageList,
        authBtnList: defaultAuthBtnList,
      };
      setSession("userInfo", userInfos);
      // store.dispatch("setAuths", defaultAuthPageList); // 请注意执行顺序(存储用户权限到vuex)
      store.dispatch("setUserInfos", userInfos); // 请注意执行顺序(存储用户信息vuex)
      initAllFun(); // 请注意执行顺序
    };
    // 页面加载时
    onMounted(() => {
      initUserAuth();
    });
    return {
      getAuthList,
      onRadioChange,
      ...toRefs(state),
    };
  },
};
</script>