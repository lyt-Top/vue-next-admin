<template>
  <transition name="el-zoom-in-center">
    <div aria-hidden="true" class="el-dropdown__popper el-popper is-light is-pure custom-contextmenu" role="tooltip"
      data-popper-placement="bottom" :style="`top: ${dropdown.y + 5}px;left: ${dropdown.x}px;`" :key="Math.random()"
      v-show="isShow">
      <ul class="el-dropdown-menu">
        <li class="el-dropdown-menu__item" aria-disabled="false" tabindex="-1" v-for="(v,k) in dropdownList" :key="k">
          <i :class="v.icon"></i>
          <span>{{v.txt}}</span>
        </li>
      </ul>
      <div class="el-popper__arrow" style="left:10px"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
} from "vue";
export default defineComponent({
  name: "layoutTagsViewContextmenu",
  props: {
    dropdown: {
      type: Object,
    },
  },
  setup(props) {
    const state = reactive({
      isShow: false,
      dropdownList: [
        { id: 0, txt: "刷新", affix: false, icon: "el-icon-refresh-right" },
        { id: 1, txt: "关闭", affix: true, icon: "el-icon-close" },
        { id: 2, txt: "关闭其它", affix: false, icon: "el-icon-circle-close" },
        { id: 3, txt: "全部关闭", affix: false, icon: "el-icon-folder-delete" },
      ],
    });
    const dropdown = computed(() => {
      return props.dropdown;
    });
    const openContextmenu = () => {
      closeContextmenu();
      setTimeout(() => {
        state.isShow = true;
      }, 10);
    };
    const closeContextmenu = () => {
      state.isShow = false;
    };
    onMounted(() => {
      document.body.addEventListener("click", closeContextmenu);
    });
    onUnmounted(() => {
      document.body.removeEventListener("click", closeContextmenu);
    });
    return {
      dropdown,
      openContextmenu,
      closeContextmenu,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss">
.custom-contextmenu {
  transform-origin: center top;
  z-index: 2190;
  position: fixed;
  .el-dropdown-menu__item {
    font-size: 12px !important;
  }
}
</style>