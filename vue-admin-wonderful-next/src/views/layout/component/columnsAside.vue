<template>
  <div class="layout-columns-aside">
    <el-scrollbar>
      <ul>
        <li v-for="(v,k) in columnsAsideList" :key="k" @click="onColumnsAsideDown(v,k)"
          :ref="el => { if (el) columnsAsideOffsetTopRefs[k] = el }" :class="{'layout-columns-active':liIndex === k} ">
          <div class="layout-columns-aside-li-box">
            <template v-if="!v.meta.isLink">
              <i :class="v.meta.icon"></i>
              <div class="layout-columns-aside-li-box-title">
                {{v.meta.title}}
              </div>
            </template>
            <template v-else>
              <a :href="v.meta.isLink" target="_blank">
                <i :class="v.meta.icon"></i>
                <div class="layout-columns-aside-li-box-title">
                  {{v.meta.title}}
                </div>
              </a>
            </template>
          </div>
        </li>
        <div ref="columnsAsideActiveRef" :class="setColumnsAsideStyle"></div>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref, computed } from "vue";
import { useStore } from "/@/store/index.ts";
export default {
  name: "layoutColumnsAside",
  setup() {
    const columnsAsideOffsetTopRefs = ref([]);
    const columnsAsideActiveRef = ref();
    const store = useStore();
    const state = reactive({
      columnsAsideList: [
        {
          path: "/home",
          meta: {
            title: "首页",
            icon: "el-icon-medal-1",
          },
        },
        {
          path: "/home",
          meta: {
            title: "小米",
            icon: "el-icon-trophy",
          },
        },
        {
          path: "/home",
          meta: {
            title: "谷歌",
            icon: "el-icon-basketball",
            isLink: "https://www.ele.me",
          },
        },
        {
          path: "/home",
          meta: {
            title: "苹果",
            icon: "el-icon-coffee-cup",
          },
        },
      ],
      liIndex: 0,
      difference: 0,
    });
    // 设置高亮样式
    const setColumnsAsideStyle = computed(() => {
      let { columnsAsideStyle } = store.state.themeConfig;
      columnsAsideStyle === "columnsRound"
        ? (state.difference = 3)
        : (state.difference = 0);
      if (columnsAsideStyle === "columnsRound")
        return "layout-columns-round-active";
      else if (columnsAsideStyle === "columnsCard")
        return "layout-columns-card-active";
    });
    // 设置高亮动态位置
    const onColumnsAsideDown = (v: Object, k: number) => {
      state.liIndex = k;
      columnsAsideActiveRef.value.style.top = `${
        columnsAsideOffsetTopRefs.value[k].offsetTop + state.difference
      }px`;
    };
    return {
      columnsAsideOffsetTopRefs,
      columnsAsideActiveRef,
      onColumnsAsideDown,
      setColumnsAsideStyle,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.layout-columns-aside {
  width: 64px;
  height: 100%;
  background: var(--bg-columnsMenuBar);
  ul {
    position: relative;
    li {
      color: var(--bg-columnsMenuBarColor);
      width: 100%;
      height: 50px;
      text-align: center;
      display: flex;
      cursor: pointer;
      position: relative;
      z-index: 1;
      .layout-columns-aside-li-box {
        margin: auto;
      }
      a {
        text-decoration: none;
        color: var(--bg-columnsMenuBarColor);
      }
    }
    .layout-columns-active {
      color: #ffffff;
      transition: 0.3s ease-in-out;
    }
    .layout-columns-round-active {
      background: var(--color-primary);
      color: #ffffff;
      position: absolute;
      left: 50%;
      top: 2px;
      height: 44px;
      width: 58px;
      transform: translateX(-50%);
      z-index: 0;
      transition: 0.3s ease-in-out;
      border-radius: 5px;
    }
    .layout-columns-card-active {
      @extend .layout-columns-round-active;
      top: 0;
      height: 50px;
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>