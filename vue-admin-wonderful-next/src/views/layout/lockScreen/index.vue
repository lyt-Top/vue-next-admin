<template>
  <div class="layout-lock-screen-mask"></div>
  <div class="layout-lock-screen-img" :class="{'layout-lock-screen-filter':isShowLoockLogin}"></div>
  <div class="layout-lock-screen">
    <div class="layout-lock-screen-date">
      <div class="layout-lock-screen-date-box">
        <div class="layout-lock-screen-date-box-time">22:14</div>
        <div class="layout-lock-screen-date-box-info">1月11日，星期一</div>
      </div>
    </div>
    <transition name="el-zoom-in-center">
      <div v-show="isShowLoockLogin" class="layout-lock-screen-login">
        <div class="layout-lock-screen-login-box">
          <div class="layout-lock-screen-login-box-img">
            <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg" />
          </div>
          <div class="layout-lock-screen-login-box-name">Administrator</div>
          <div class="layout-lock-screen-login-box-value">
            <el-input placeholder="密码">
              <template #append>
                <el-button icon="el-icon-right"></el-button>
              </template>
            </el-input>
          </div>
        </div>
        <div class="layout-lock-screen-login-icon">
          <i class="el-icon-microphone"></i>
          <i class="el-icon-alarm-clock"></i>
          <i class="el-icon-switch-button"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { nextTick, onMounted, reactive, toRefs } from "vue";
export default {
  name: "layoutLockScreen",
  setup() {
    const state = reactive({
      moveDifference: 0,
      transparency: 1,
      isShowLoockLogin: false,
    });
    const initGetElement = () => {
      nextTick(() => {
        const el = document.querySelector(".layout-lock-screen-date");
        el.onmousedown = (down) => {
          document.onmousemove = (move) => {
            let opacitys = (state.transparency -= 1 / 200);
            state.moveDifference = move.clientY - down.clientY;
            if (state.moveDifference >= 0) return false;
            el.setAttribute(
              "style",
              `top:${state.moveDifference}px;cursor:pointer;opacity:${opacitys};`
            );
            if (state.moveDifference < -400) {
              el.setAttribute(
                "style",
                `top:${-el.clientHeight}px;cursor:pointer;transition:all 0.3s ease;`
              );
              state.moveDifference = -el.clientHeight;
              setTimeout(() => {
                el.remove();
              }, 300);
            }
            if (state.moveDifference === -el.clientHeight) {
              state.isShowLoockLogin = true;
            }
          };
          document.onmouseup = (seup) => {
            state.transparency = 1;
            if (state.moveDifference >= -400) {
              el.setAttribute(
                "style",
                `top:0px;opacity:1;transition:all 0.3s ease;`
              );
            }
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      });
    };
    onMounted(() => {
      initGetElement();
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.layout-lock-screen-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.layout-lock-screen-filter {
  filter: blur(5px);
}
.layout-lock-screen-mask {
  background: rgba(255, 255, 255, 1);
  @extend .layout-lock-screen-fixed;
  z-index: 9999990;
}
.layout-lock-screen-img {
  @extend .layout-lock-screen-fixed;
  background-image: url("https://img6.bdstatic.com/img/image/pcindex/sunjunpchuazhoutu.JPG");
  background-size: 100% 100%;
  z-index: 9999991;
}
.layout-lock-screen {
  @extend .layout-lock-screen-fixed;
  z-index: 9999992;
  &-date {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #ffffff;
    z-index: 9999993;
    user-select: none;
    &-box {
      position: absolute;
      left: 30px;
      bottom: 50px;
      &-time {
        font-size: 100px;
      }
      &-info {
        font-size: 40px;
      }
    }
  }
  &-login {
    position: relative;
    z-index: 9999994;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #ffffff;
    &-box {
      text-align: center;
      margin: auto;
      &-img {
        width: 180px;
        height: 180px;
        margin: auto;
        img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }
      &-name {
        font-size: 26px;
        margin: 15px 0 30px;
      }
    }
    &-icon {
      position: absolute;
      right: 30px;
      bottom: 30px;
      i {
        font-size: 20px;
        margin-left: 15px;
        cursor: pointer;
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
::v-deep(.el-input-group__append) {
  background: #ffffff;
  padding: 0px 15px;
}
::v-deep(.el-input__inner) {
  border-right-color: #f6f6f6;
}
</style>