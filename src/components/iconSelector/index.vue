<template>
  <div class="icon-selector">
    <el-popover placement="bottom" :width="fontIconWidth" v-model:visible="fontIconVisible"
      popper-class="icon-selector-popper">
      <template #reference>
        <el-input v-model="fontIcon" placeholder="请点击选择图标" clearable size="small" ref="inputWidthRef"
          :prefix-icon="fontIconPrefix" @clear="onClearFontIcon"></el-input>
      </template>
      <transition name="el-zoom-in-top">
        <div class="icon-selector-warp" v-show="fontIconVisible">
          <div class="icon-selector-warp-title">请选择一个图标</div>
          <el-row class="icon-selector-warp-row">
            <el-col :xs="4" :sm="2" :md="2" :lg="2" :xl="2" v-for="(v,k) in sheetsIconList" :key="k"
              @click="onColClick(v)">
              <div class="icon-selector-warp-item">
                <div class="flex-margin">
                  <div class="icon-selector-warp-item-value">
                    <i :class="v" class="iconfont fa"></i>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </transition>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, onMounted, nextTick } from "vue";
import initIconfont from "/@/utils/getStyleSheets.ts";
import { stat } from "node:fs";
export default {
  name: "iconSelector",
  props: {
    isAllOn: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, { emit }) {
    console.log(props);
    const inputWidthRef = ref();
    const state = reactive({
      fontIcon: "",
      fontIconPrefix: "",
      fontIconVisible: false,
      fontIconWidth: 0,
      sheetsIconList: [],
    });
    // 获取 input 的宽度
    const getInputWidth = () => {
      nextTick(() => {
        state.fontIconWidth = inputWidthRef.value.$el.offsetWidth;
      });
    };
    // 监听页面宽度改变
    const initResize = () => {
      window.addEventListener("resize", () => {
        getInputWidth();
      });
    };
    // 初始化数据
    const initFontIconData = () => {
      initIconfont.ali().then((res) => {
        state.sheetsIconList = res;
      });
    };
    // 当前项点击
    const onColClick = (v) => {
      state.fontIcon = v;
      state.fontIconPrefix = `iconfont fa ${v}`;
      state.fontIconVisible = false;
      emit("get", state.fontIconPrefix);
    };
    // input 点击清除按钮时
    const onClearFontIcon = () => {
      state.fontIconPrefix = "";
    };
    // 页面加载时
    onMounted(() => {
      initFontIconData();
      initResize();
      getInputWidth();
    });
    return {
      inputWidthRef,
      onColClick,
      onClearFontIcon,
      ...toRefs(state),
    };
  },
};
</script>