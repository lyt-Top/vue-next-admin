<template>
  <div :style="{height: `calc(100vh - ${initTagViewHeight}`}">
    <div class="layout-view-bg-white">
      <div id="echartsTree" style="height:100%;"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, onMounted } from "vue";
import * as echarts from "echarts";
import { useStore } from "/@/store/index.ts";
import { echartsTreeList } from "./mock.ts";
export default {
  name: "echartsTree",
  setup() {
    const store = useStore();
    const state = reactive({
      tagViewHeight: "",
      echartsTreeList,
    });
    // 设置主内容的高度
    const initTagViewHeight = computed(() => {
      let { isTagsview } = store.state.themeConfig;
      if (isTagsview) return `114px`;
      else return `80px`;
    });
    // 初始化数据
    const initEchartsTree = () => {
      const myChart = echarts.init(document.getElementById("echartsTree"));
      state.echartsTreeList.children.forEach((datum, index) => {
        index % 2 === 0 && (datum.collapsed = true);
      });
      const option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
        },
        series: [
          {
            type: "tree",
            data: [state.echartsTreeList],
            top: "1%",
            left: "7%",
            bottom: "1%",
            right: "20%",
            symbolSize: 7,
            label: {
              position: "left",
              verticalAlign: "middle",
              align: "right",
              fontSize: 9,
            },
            leaves: {
              label: {
                position: "right",
                verticalAlign: "middle",
                align: "left",
              },
            },
            emphasis: {
              focus: "descendant",
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    };
    // 页面加载时
    onMounted(() => {
      initEchartsTree();
    });
    return {
      initTagViewHeight,
      ...toRefs(state),
    };
  },
};
</script>