<template>
  <div class="awesome-container">
    <el-card shadow="hover" :header="`fontawesome 字体图标(自动载入)：${sheetsIconList.length - 24}个`">
      <el-row class="iconfont-row">
        <template v-for="(v,k) in sheetsIconList" :key="k">
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
            <div class="iconfont-warp">
              <div class="flex-margin">
                <div class="iconfont-warp-value">
                  <i :class="v" class="fa"></i>
                </div>
                <div class="iconfont-warp-label mt10">{{v}}</div>
              </div>
            </div>
          </el-col>
        </template>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, nextTick, onMounted } from "vue";
export default {
  name: "awesome",
  setup() {
    const state = reactive({
      sheetsIconList: [],
    });
    // 初始化获取 css 样式，这里使用阿里的图标(记得加上前缀 `iconfont`)，其它第三方请自行做判断
    const initGetStyleSheets = () => {
      nextTick(() => {
        const styles = document.styleSheets;
        let sheetsList = [];
        for (let i = 0; i < styles.length; i++) {
          if (
            styles[i].href &&
            styles[i].href.indexOf("netdna.bootstrapcdn.com") > -1
          ) {
            sheetsList.push(styles[i]);
          }
        }
        for (let i = 0; i < sheetsList.length; i++) {
          for (let j = 0; j < sheetsList[i].cssRules.length; j++) {
            if (
              sheetsList[i].cssRules[j].selectorText &&
              sheetsList[i].cssRules[j].selectorText.indexOf(".fa-") === 0 &&
              sheetsList[i].cssRules[j].selectorText.indexOf(",") === -1
            ) {
              state.sheetsIconList.push(
                `${sheetsList[i].cssRules[j].selectorText
                  .substring(1, sheetsList[i].cssRules[j].selectorText.length)
                  .replace(/\:\:before/gi, "")}`
              );
            }
          }
        }
      });
    };
    // 页面加载时
    onMounted(() => {
      initGetStyleSheets();
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.awesome-container {
  .iconfont-row {
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    .el-col:nth-child(-n + 24) {
      display: none;
    }
    .iconfont-warp {
      text-align: center;
      border-right: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      height: 120px;
      overflow: hidden;
      display: flex;
      &:hover {
        .iconfont-warp-value {
          i {
            color: var(--color-primary);
            transition: all 0.3s ease;
          }
        }
        .iconfont-warp-label {
          color: var(--color-primary);
          transition: all 0.3s ease;
        }
      }
      .iconfont-warp-value {
        i {
          color: #606266;
          font-size: 32px;
          transition: all 0.3s ease;
        }
      }
      .iconfont-warp-label {
        color: #99a9bf;
        transition: all 0.3s ease;
      }
    }
  }
}
</style>