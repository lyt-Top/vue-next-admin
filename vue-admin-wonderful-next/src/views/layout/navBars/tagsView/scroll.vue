<template>
  <el-scrollbar ref="elScrollbarRef" @wheel.native.prevent="onHandleScroll">
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { getCurrentInstance, reactive, nextTick, toRefs } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const state = reactive({
      tagsArr: [],
    });
    const onHandleScroll = (e: object) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      proxy.$refs.elScrollbarRef.$refs.wrap.scrollLeft =
        proxy.$refs.elScrollbarRef.$refs.wrap.scrollLeft + eventDelta / 4;
    };
    const setScrollLeft = (tags: Array<object> = []) => {
      nextTick(() => {
        state.tagsArr = tags.value;
      });
    };
    const moveToTarget = (currentTag: any) => {
      const tagList = state.tagsArr;
      let firstTag = null;
      let lastTag = null;
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }
      if (firstTag === currentTag) {
        proxy.$refs.elScrollbarRef.$refs.wrap.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        proxy.$refs.elScrollbarRef.$refs.wrap.scrollLeft =
          proxy.$refs.elScrollbarRef.$refs.wrap.scrollWidth -
          proxy.$refs.elScrollbarRef.$refs.wrap.offsetWidth;
      } else {
        const currentIndex = tagList.findIndex((item) => item === currentTag);
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];
        const afterNextTagOffsetLeft =
          nextTag.offsetLeft + nextTag.offsetWidth + 4;
        const beforePrevTagOffsetLeft = prevTag.offsetLeft - 4;
        if (
          afterNextTagOffsetLeft >
          proxy.$refs.elScrollbarRef.$refs.wrap.scrollLeft +
            proxy.$refs.elScrollbarRef.$refs.wrap.offsetWidth
        ) {
          proxy.$refs.elScrollbarRef.$refs.wrap.scrollLeft =
            afterNextTagOffsetLeft -
            proxy.$refs.elScrollbarRef.$refs.wrap.offsetWidth;
        } else if (
          beforePrevTagOffsetLeft <
          proxy.$refs.elScrollbarRef.$refs.wrap.scrollLeft
        ) {
          proxy.$refs.elScrollbarRef.$refs.wrap.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    };
    return {
      setScrollLeft,
      onHandleScroll,
      moveToTarget,
      ...toRefs(state),
    };
  },
};
</script>