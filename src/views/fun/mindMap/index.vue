<template>
  <div :style="{height: `calc(100vh - ${initTagViewHeight}`}">
    <div class="layout-view-bg-white">
      <div id="antvG6" style="height:100%;"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, onMounted, nextTick } from "vue";
import G6 from "@antv/g6";
import { useStore } from "/@/store/index.ts";
export default {
  name: "mindMap",
  setup() {
    const store = useStore();
    const state = reactive({});
    // 设置主内容的高度
    const initTagViewHeight = computed(() => {
      let { isTagsview } = store.state.themeConfig;
      if (isTagsview) return `114px`;
      else return `80px`;
    });
    // 初始化 antv/G6
    const initAntvG6 = () => {
      console.log(G6);

      const fontSize = 12;
      // 自定义节点
      G6.registerNode("line", {
        draw: (cfg, group) => {
          const width = cfg.label.length * 10;
          const rect = group.addShape("rect", {
            attrs: {
              x: 0,
              y: -10,
              ...cfg.style,
              width,
              height: 20,
              lineWidth: 0,
              opacity: 0,
            },
            name: "rect-shape",
            draggable: true,
          });
          const label = group.addShape("text", {
            attrs: {
              text: cfg.label,
              fill: "#000",
              fontSize,
              x: 0,
              y: -5,
            },
            name: "label-shape",
            draggable: true,
          });
          const labelBBox = label.getBBox();
          // const icon = group.addShape('circle', {
          //   attrs: {
          //     x: labelBBox.maxX + 10,
          //     y: (labelBBox.minY + labelBBox.maxY) / 2,
          //     r: 5,
          //     stroke: '#000'
          //   },
          //   name: 'circle-shape',
          //   draggable: true
          // });
          const bboxWidth = label.getBBox().width + 20;
          rect.attr({ width: bboxWidth });
          group.addShape("path", {
            attrs: {
              lineWidth: 1,
              fill: "#ccc",
              stroke: "#0092ff",
              path: [
                ["M", 0, 0],
                ["L", bboxWidth, 0],
              ],
            },
            name: "path-shape",
            draggable: true,
          });
          return rect;
        },
      });
      //获取宽度
      const width = document.getElementById("antvG6").clientWidth;
      const height = document.getElementById("antvG6").clientHeight;

      // return false;
      const graph = new G6.TreeGraph({
        container: "antvG6",
        width,
        height,
        pixelRatio: 2,
        modes: {
          default: ["collapse-expand", "drag-canvas", "zoom-canvas"],
        },
        // 节点类型及样式
        defaultNode: {
          type: "rect",
          // size: 16,
          width: "auto",
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
          style: {
            fill: "#005ff2", //背景色
            stroke: "#005ff2", //边框
          },
          labelCfg: {
            style: {
              fill: "#ffffff",
              fontSize,
            },
          },
        },
        //  连线类型及样式
        defaultEdge: {
          type: "cubic-horizontal",
          // polyline
          style: {
            stroke: "#0092ff",
          },
        },
        // 布局
        layout: {
          type: "mindmap",
          direction: "H",
          getHeight: function getHeight() {
            return 16;
          },
          getWidth: function getWidth() {
            return 16;
          },
          getVGap: function getVGap() {
            return 10;
          },
          getHGap: function getHGap() {
            return 100;
          },
        },
      });
      graph.node(function (node) {
        // depth 类似节点标识
        if (node.depth == 0) {
          return {
            // size:[100,60],
            style: {
              fill: "#005ff2", //背景色
              stroke: "#005ff2", //边框
            },
            // label:node.id
          };
        }
        if (node.depth == 1) {
          return {
            style: {
              //渐变色
              fill:
                "l(0) 0:rgba(0,36,186,1) 0.5:rgba(0,36,186,0.5) 1:rgba(0,0,0,0.1)",
            },
          };
        }
        if (node.depth == 2) {
          return {
            type: "line",
          };
        }
        return {
          // label: node.id, // 设置显示名称
          labelCfg: {
            // position: node.children && node.children.length > 0 ? 'left' : node.x > centerX ? 'right' : 'left', // 设置显示左右
            offset: 5,
          },
        };
      });
      const data = {
        id: "id1",
        label: "遗属补助小专项",
        children: [
          {
            id: "id1-1",
            label: "已死亡",
            children: [
              {
                id: "id1-1-1",
                label: "问题数：35个",
              },
              {
                id: "id1-1-2",
                label: "人数：50人",
              },
              {
                id: "id1-1-3",
                label: "资金：340万",
              },
            ],
          },
          {
            id: "id1-2",
            label: "姓名与身份证不符",
            children: [
              {
                id: "id1-2-1",
                label: "问题数：35个",
              },
              {
                id: "id1-2-2",
                label: "人数：50人",
              },
              {
                id: "id1-2-3",
                label: "资金：340万",
              },
            ],
          },
          {
            id: "id1-3",
            label: "未查到身份证信息",
            children: [
              {
                id: "id1-3-1",
                label: "问题数：35个",
              },
              {
                id: "id1-3-2",
                label: "人数：50人",
              },
              {
                id: "id1-3-3",
                label: "资金：340万",
              },
            ],
          },
          {
            id: "id1-4",
            label: "领取低保",
            children: [
              {
                id: "id1-4-1",
                label: "问题数：35个",
              },
              {
                id: "id1-4-2",
                label: "人数：50人",
              },
              {
                id: "id1-4-3",
                label: "资金：340万",
              },
            ],
          },
          {
            id: "id1-5",
            label: "年龄不符合",
            children: [
              {
                id: "id1-5-1",
                label: "问题数：35个",
              },
              {
                id: "id1-5-2",
                label: "人数：50人",
              },
              {
                id: "id1-5-3",
                label: "资金：340万",
              },
            ],
          },
        ],
      };
      graph.data(data);
      graph.render();
      graph.fitView();
    };
    // 页面加载时
    onMounted(() => {
      initAntvG6();
    });
    return {
      initTagViewHeight,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
</style>