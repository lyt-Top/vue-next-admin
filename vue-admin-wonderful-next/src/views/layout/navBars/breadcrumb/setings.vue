<template>
  <div class="layout-breadcrumb-seting">
    <el-drawer title="布局配置" v-model="getThemeConfig.isDrawer" direction="rtl" destroy-on-close size="240px">
      <el-scrollbar class="layout-breadcrumb-seting-bar">
        <!-- 全局主题 -->
        <el-divider content-position="left">全局主题</el-divider>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">primary</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.primary" size="small" @change="onColorPickerChange('primary')">
            </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">success</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.success" size="small" @change="onColorPickerChange('success')">
            </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">info</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.info" size="small" @change="onColorPickerChange('info')">
            </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">warning</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.warning" size="small" @change="onColorPickerChange('warning')">
            </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">danger</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.danger" size="small" @change="onColorPickerChange('danger')">
            </el-color-picker>
          </div>
        </div>
        <el-divider content-position="left">菜单 / 顶栏</el-divider>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">顶栏背景</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.topBar" size="small" @change="onBgColorPickerChange('topBar')">
            </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">菜单背景</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.menuBar" size="small" @change="onBgColorPickerChange('menuBar')">
            </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">顶栏默认字体颜色</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.topBarColor" size="small"
              @change="onBgColorPickerChange('topBarColor')">
            </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">菜单默认字体颜色</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.menuBarColor" size="small"
              @change="onBgColorPickerChange('menuBarColor')">
            </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt10">
          <div class="layout-breadcrumb-seting-bar-flex-label">顶栏背景渐变</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isTopBarColorGradual" @change="onTopBarGradualChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt14">
          <div class="layout-breadcrumb-seting-bar-flex-label">菜单背景渐变</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isMenuBarColorGradual" @change="onMenuBarGradualChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt14">
          <div class="layout-breadcrumb-seting-bar-flex-label">菜单字体背景高亮</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isMenuBarColorHighlight" @change="onMenuBarHighlightChange"></el-switch>
          </div>
        </div>

        <!-- 界面设置 -->
        <el-divider content-position="left">界面设置</el-divider>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">菜单水平折叠</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCollapse" @change="onThemeConfigChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">菜单手风琴</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isUniqueOpened" @change="onsetThemeConfigChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">固定 Header</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isFixedHeader"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">自动分割菜单</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCollapse1"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">菜单展开宽度</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-input-number v-model="getThemeConfig.menuWidth" controls-position="right" :min="1" :max="999"
              size="mini" style="width:90px;">
            </el-input-number>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt11">
          <div class="layout-breadcrumb-seting-bar-flex-label">自动锁屏</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-input-number v-model="getThemeConfig.menuWidth" controls-position="right" :min="1" :max="999"
              size="mini" style="width:90px;">
            </el-input-number>
          </div>
        </div>

        <!-- 界面显示 -->
        <el-divider content-position="left">界面显示</el-divider>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">侧边栏 Logo</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCollapse1"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">面包屑 Breadcrumb</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCollapse1"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">开启 Tagsview</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCollapse1"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">开启 Footer</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCollapse1"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">灰色模式</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCollapse1"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">色弱模式</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCollapse1"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">开启水印</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCollapse1"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">水印文案</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-input v-model="getThemeConfig.menuWidth" size="mini" style="width:90px;"></el-input>
          </div>
        </div>

        <!-- 布局切换 -->
        <el-divider content-position="left">布局切换</el-divider>
        <div class="layout-drawer-content-flex">
          <!-- defaults 布局 -->
          <div class="layout-drawer-content-item">
            <section class="el-container drawer-layout-active el-circular">
              <aside class="el-aside" style="width: 20px"></aside>
              <section class="el-container is-vertical">
                <header class="el-header" style="height: 10px"></header>
                <main class="el-main"></main>
              </section>
            </section>
            <div class="layout-tips-warp-active layout-tips-warp">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">默认</p>
              </div>
            </div>
          </div>
          <!-- classic 布局 -->
          <div class="layout-drawer-content-item">
            <section class="el-container is-vertical el-circular">
              <header class="el-header" style="height: 10px"></header>
              <section class="el-container">
                <aside class="el-aside" style="width: 20px"></aside>
                <section class="el-container is-vertical">
                  <main class="el-main"></main>
                </section>
              </section>
            </section>
            <div class="layout-tips-warp">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">经典</p>
              </div>
            </div>
          </div>
          <!-- transverse 布局 -->
          <div class="layout-drawer-content-item">
            <section class="el-container is-vertical el-circular">
              <header class="el-header" style="height: 10px"></header>
              <section class="el-container">
                <section class="el-container is-vertical">
                  <main class="el-main"></main>
                </section>
              </section>
            </section>
            <div class="layout-tips-warp">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">横向</p>
              </div>
            </div>
          </div>
          <!-- columns 布局 -->
          <div class="layout-drawer-content-item">
            <section class="el-container el-circular">
              <aside class="el-aside-dark" style="width: 10px"></aside>
              <aside class="el-aside" style="width: 20px"></aside>
              <section class="el-container is-vertical">
                <header class="el-header" style="height: 10px"></header>
                <main class="el-main"></main>
              </section>
            </section>
            <div class="layout-tips-warp">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">分栏</p>
              </div>
            </div>
          </div>
        </div>
        <div class="copy-config">
          <el-alert title="点击下方按钮，复制布局配置。" type="warning" :closable="false">
          </el-alert>
          <el-button size="small" class="copy-config-btn" icon="el-icon-document-copy" type="primary">一键复制配置
          </el-button>
          <el-button size="small" class="copy-config-btn copy-config-last-btn" icon="el-icon-refresh" type="warning">
            一键恢复默认</el-button>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import {
  nextTick,
  onBeforeMount,
  onUnmounted,
  getCurrentInstance,
  defineComponent,
  computed,
} from "vue";
import { useStore } from "/@/store/index.ts";
import { getLightColor } from "/@/utils/theme.ts";
export default defineComponent({
  name: "layoutBreadcrumbSeting",
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });
    const openDrawer = () => {
      getThemeConfig.value.isDrawer = true;
    };
    const closeDrawer = () => {
      getThemeConfig.value.isDrawer = false;
    };
    const onColorPickerChange = (color: string) => {
      setPropertyFun(`--color-${color}`, getThemeConfig.value[color]);
    };
    const setPropertyFun = (color: string, targetVal: any) => {
      document.documentElement.style.setProperty(color, targetVal);
      for (let i = 1; i <= 9; i++) {
        document.documentElement.style.setProperty(
          `${color}-light-${i}`,
          getLightColor(targetVal, i / 10)
        );
      }
    };
    const onBgColorPickerChange = (bg: string) => {
      document.documentElement.style.setProperty(
        `--bg-${bg}`,
        getThemeConfig.value[bg]
      );
      onTopBarGradualChange();
      onMenuBarGradualChange();
    };
    const onTopBarGradualChange = () => {
      setGraduaFun(
        ".layout-navbars-breadcrumb-index",
        getThemeConfig.value.isTopBarColorGradual,
        getThemeConfig.value.topBar
      );
    };
    const onMenuBarGradualChange = () => {
      setGraduaFun(
        ".layout-container .el-aside",
        getThemeConfig.value.isMenuBarColorGradual,
        getThemeConfig.value.menuBar
      );
    };
    const setGraduaFun = (el: string, bool: boolean, color: string) => {
      nextTick(() => {
        let els = document.querySelector(el);
        if (bool)
          els.setAttribute(
            "style",
            `background-image:linear-gradient(to bottom left , ${color}, ${getLightColor(
              color,
              0.6
            )})`
          );
        else els.setAttribute("style", `background-image:${color}`);
      });
    };
    const onMenuBarHighlightChange = () => {
      nextTick(() => {
        setTimeout(() => {
          let els = document.querySelector(".el-menu-item.is-active");
          let attr = "el-menu-item is-active";
          if (getThemeConfig.value.isMenuBarColorHighlight)
            els.setAttribute("class", `${attr} add-is-active`);
          else els.setAttribute("class", `${attr}`);
        }, 0);
      });
    };
    const onThemeConfigChange = () => {
      store.dispatch("setThemeConfig", getThemeConfig.value);
      onMenuBarHighlightChange();
    };
    const onsetThemeConfigChange = () => {
      store.dispatch("setThemeConfig", getThemeConfig.value);
    };
    onBeforeMount(() => {
      proxy.mittBus.on("onMenuClick", () => {
        onMenuBarHighlightChange();
      });
    });
    onUnmounted(() => {
      proxy.mittBus.off("onMenuClick", () => {});
    });
    return {
      openDrawer,
      closeDrawer,
      onColorPickerChange,
      onBgColorPickerChange,
      onTopBarGradualChange,
      onMenuBarGradualChange,
      onMenuBarHighlightChange,
      onThemeConfigChange,
      onsetThemeConfigChange,
      getThemeConfig,
    };
  },
});
</script>

<style scoped lang="scss">
.layout-breadcrumb-seting-bar {
  height: calc(100vh - 50px);
  padding: 0 15px;
  ::v-deep(.el-scrollbar__view) {
    overflow-x: hidden !important;
  }
  .layout-breadcrumb-seting-bar-flex {
    display: flex;
    align-items: center;
    &-label {
      flex: 1;
      color: #666666;
    }
  }
  .layout-drawer-content-flex {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0 -5px;
    .layout-drawer-content-item {
      width: 50%;
      height: 70px;
      cursor: pointer;
      border: 1px solid transparent;
      position: relative;
      padding: 5px;
      .el-container {
        height: 100%;
        .el-aside-dark {
          background-color: #b3c0d1;
        }
        .el-aside {
          background-color: #d3dce6;
        }
        .el-header {
          background-color: #b3c0d1;
        }
        .el-main {
          background-color: #e9eef3;
        }
      }
      .el-circular {
        border-radius: 2px;
        overflow: hidden;
      }
      .drawer-layout-active {
        border: 1px solid;
        border-color: var(--color-primary);
      }
      .layout-tips-warp,
      .layout-tips-warp-active {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid;
        border-color: var(--color-primary-light-4);
        border-radius: 100%;
        padding: 4px;
        .layout-tips-box {
          width: 30px;
          height: 30px;
          z-index: 9;
          border: 1px solid;
          border-color: var(--color-primary-light-4);
          border-radius: 100%;
          .layout-tips-txt {
            position: relative;
            top: 5px;
            font-size: 12px;
            line-height: 1;
            letter-spacing: 2px;
            white-space: nowrap;
            color: var(--color-primary-light-4);
            text-align: center;
            transform: rotate(30deg);
            left: -1px;
            background-color: #e9eef3;
            width: 32px;
            height: 17px;
            line-height: 17px;
          }
        }
      }
      .layout-tips-warp-active {
        border: 1px solid;
        border-color: var(--color-primary);
        .layout-tips-box {
          border: 1px solid;
          border-color: var(--color-primary);
          .layout-tips-txt {
            color: var(--color-primary) !important;
            background-color: #e9eef3 !important;
          }
        }
      }
    }
  }
  .copy-config {
    margin: 10px 0;
    .copy-config-btn {
      width: 100%;
      margin-top: 15px;
    }
    .copy-config-last-btn {
      margin: 10px 0 0;
    }
  }
}
</style>