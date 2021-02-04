<template>
  <div>
    <LimitsFrontEndPage />
    <el-card shadow="hover" header="演示1：组件方式" class="mt15">
      <el-row class="mb10" style="color:#808080;">单个权限验证（:value="xxx"）：</el-row>
      <div class="flex-warp">
        <Auth :value="'btn.add'">
          <div class="flex-warp-item">
            <div class="flex-warp-item-box">
              <el-button type="primary" size="small" icon="el-icon-document-add">新增
              </el-button>
            </div>
          </div>
        </Auth>
        <Auth :value="'btn.edit'">
          <div class="flex-warp-item">
            <div class="flex-warp-item-box">
              <el-button type="info" size="small" icon="el-icon-edit-outline">编辑</el-button>
            </div>
          </div>
        </Auth>
        <Auth :value="'btn.del'">
          <div class="flex-warp-item">
            <div class="flex-warp-item-box">
              <el-button type="danger" size="small" icon="el-icon-delete">删除
              </el-button>
            </div>
          </div>
        </Auth>
        <Auth :value="'btn.link'">
          <div class="flex-warp-item">
            <div class="flex-warp-item-box">
              <el-button type="success" size="small" icon="el-icon-link">跳转
              </el-button>
            </div>
          </div>
        </Auth>
      </div>
      <el-row class="mb10 mt10" style="color:#808080;">多个权限验证，有满足一个则显示（:value="[xxx,xxx]"）：</el-row>
      <div class="flex-warp">
        <Auths :value="['btn.addsss','btn.edit','btn.delsss','btn.linksss']">
          <div class="flex-warp-item">
            <div class="flex-warp-item-box">
              <el-button type="primary" size="small" icon="el-icon-document-add">新增
              </el-button>
            </div>
          </div>
        </Auths>
        <Auths :value="['btn.add','btn.edit','btn.del','btn.link']">
          <div class="flex-warp-item">
            <div class="flex-warp-item-box">
              <el-button type="info" size="small" icon="el-icon-edit-outline">编辑</el-button>
            </div>
          </div>
        </Auths>
        <Auths :value="['btn.add','btn.edit','btn.del','btn.link']">
          <div class="flex-warp-item">
            <div class="flex-warp-item-box">
              <el-button type="danger" size="small" icon="el-icon-delete">删除
              </el-button>
            </div>
          </div>
        </Auths>
        <Auths :value="['btn.add','btn.edit','btn.del','btn.link']">
          <div class="flex-warp-item">
            <div class="flex-warp-item-box">
              <el-button type="success" size="small" icon="el-icon-link">跳转
              </el-button>
            </div>
          </div>
        </Auths>
      </div>
      <el-row class="mb10 mt10" style="color:#808080;">多个权限验证，全部满足则显示（:value="[xxx,xxx]"）：</el-row>
      <div class="flex-warp">
        <AuthAll :value="['btn.add','btn.edit','btn.del','btn.link']">
          <div class="flex-warp-item">
            <div class="flex-warp-item-box">
              <el-button type="primary" size="small" icon="el-icon-document-add">新增
              </el-button>
            </div>
          </div>
        </AuthAll>
        <div class="flex-warp-item">
          <div class="flex-warp-item-box">
            <el-button type="info" size="small" icon="el-icon-edit-outline">编辑</el-button>
          </div>
        </div>
        <div class="flex-warp-item">
          <div class="flex-warp-item-box">
            <el-button type="danger" size="small" icon="el-icon-delete">删除
            </el-button>
          </div>
        </div>
        <div class="flex-warp-item">
          <div class="flex-warp-item-box">
            <el-button type="success" size="small" icon="el-icon-link">跳转
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive } from "vue";
import LimitsFrontEndPage from "/@/views/limits/frontEnd/page/index.vue";
import Auth from "/@/views/components/auth/auth.vue";
import Auths from "/@/views/components/auth/auths.vue";
import AuthAll from "/@/views/components/auth/authAll.vue";
export default {
  name: "limitsFrontEndBtn",
  components: { LimitsFrontEndPage, Auth, Auths, AuthAll },
  setup() {
    const state = reactive({
      val: "",
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.flex-warp {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: 0 -5px;
  .flex-warp-item {
    padding: 5px;
    .flex-warp-item-box {
      width: 100%;
      height: 100%;
    }
  }
}
</style>