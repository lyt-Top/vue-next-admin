<template>
  <el-card shadow="hover" header="tagsView 功能演示">
    <el-form :inline="true" :model="formInline" size="small" label-width="60px" style="margin-bottom:1px;">
      <el-form-item label="功能：">
        <el-select v-model="formInline.selectId" placeholder="请选择">
          <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路径：">
        <el-input v-model="formInline.path" placeholder="路径如：/fun/tagsView" style="max-width:203px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onImplementClick">点击执行</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-button type="primary" size="small" icon="el-icon-refresh-right" @click="refreshCurrentTagsView">刷新当前页
    </el-button>
    <el-button type="info" size="small" icon="el-icon-close" @click="closeCurrentTagsView">关闭当前页</el-button>
    <el-button type="warning" size="small" icon="el-icon-circle-close" @click="closeOtherTagsView">关闭其它</el-button>
    <el-button type="danger" size="small" icon="el-icon-folder-delete" @click="closeAllTagsView">全部关闭</el-button>
  </el-card>
</template>

<script lang="ts">
import { getCurrentInstance, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "funTagsView",
  setup() {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const state = reactive({
      formInline: {
        path: "",
        selectId: 0,
      },
      selectOptions: [
        {
          value: 0,
          label: "刷新当前",
        },
        {
          value: 1,
          label: "关闭当前",
        },
        {
          value: 2,
          label: "关闭其它",
        },
        {
          value: 3,
          label: "关闭全部",
        },
      ],
    });
    // 0 刷新当前，1 关闭当前，2 关闭其它，3 关闭全部
    // 1、刷新当前 tagsView
    const refreshCurrentTagsView = () => {
      proxy.mittBus.emit("onCurrentContextmenuClick", {
        id: 0,
        path: route.path,
      });
    };
    // 2、关闭当前 tagsView
    const closeCurrentTagsView = () => {
      proxy.mittBus.emit("onCurrentContextmenuClick", {
        id: 1,
        path: route.path,
      });
    };
    // 3、关闭其它 tagsView
    const closeOtherTagsView = () => {
      proxy.mittBus.emit("onCurrentContextmenuClick", {
        id: 2,
        path: route.path,
      });
    };
    // 4、关闭全部 tagsView
    const closeAllTagsView = () => {
      proxy.mittBus.emit("onCurrentContextmenuClick", {
        id: 3,
        path: route.path,
      });
    };
    // 执行点击
    const onImplementClick = () => {
      proxy.mittBus.emit("onCurrentContextmenuClick", {
        id: state.formInline.selectId,
        path: state.formInline.path,
      });
    };
    return {
      refreshCurrentTagsView,
      closeCurrentTagsView,
      closeOtherTagsView,
      closeAllTagsView,
      onImplementClick,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0 !important;
}
</style>