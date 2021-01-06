<template>
  <div class="layout-footer mt15" v-show="isDelayFooter">
    <div class="layout-footer-warp">
      <div>vue-admin-wonderful，Made by lyt with ❤️</div>
      <div class="mt5">Copyright &copy 深圳市 xxx 软件科技有限公司</div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
export default {
  name: "layoutFooter",
  setup() {
    const state = reactive({
      isDelayFooter: true,
    });
    onBeforeRouteUpdate((to, from) => {
      state.isDelayFooter = false;
      setTimeout(() => {
        state.isDelayFooter = true;
      }, 800);
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.layout-footer {
  width: 100%;
  display: flex;
  &-warp {
    margin: auto;
    color: #9e9e9e;
    text-align: center;
    animation: logoAnimation 0.3s ease-in-out;
  }
}
</style>