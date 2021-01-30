<template>
  <div class="layout-search-dialog">
    <el-dialog v-model="isShowSearch" width="300px" destroy-on-close :modal="false" fullscreen>
      <el-autocomplete v-model="menuQuery" :fetch-suggestions="menuSearch" placeholder="菜单搜索：支持中文、路由路径"
        prefix-icon="el-icon-search" ref="layoutMenuAutocompleteRef" @select="onHandleSelect">
        <template #default="{ item }">
          <div><i :class="item.meta.icon" class="mr10"></i>{{ item.meta.title }}</div>
        </template>
      </el-autocomplete>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "/@/store/index.ts";
export default defineComponent({
  name: "layoutBreadcrumbSearch",
  setup() {
    const layoutMenuAutocompleteRef = ref();
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      isShowSearch: false,
      menuQuery: "",
      tagsViewList: [],
    });
    // 搜索弹窗打开
    const openSearch = () => {
      state.menuQuery = "";
      state.isShowSearch = true;
      initTageView();
      nextTick(() => {
        layoutMenuAutocompleteRef.value.focus();
      });
    };
    // 搜索弹窗关闭
    const closeSearch = () => {
      state.isShowSearch = false;
    };
    // 菜单搜索数据过滤
    const menuSearch = (queryString, cb) => {
      let results = queryString
        ? state.tagsViewList.filter(createFilter(queryString))
        : state.tagsViewList;
      cb(results);
    };
    // 菜单搜索过滤
    const createFilter = (queryString) => {
      return (restaurant) => {
        return (
          restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) >
            -1 ||
          restaurant.meta.title
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) > -1
        );
      };
    };
    // 初始化菜单数据
    const initTageView = () => {
      if (state.tagsViewList.length > 0) return false;
      store.state.tagsViewRoutes.map((v) => {
        if (!v.meta.isHide) state.tagsViewList.push({ ...v });
      });
    };
    // 当前菜单选中时
    const onHandleSelect = (item) => {
      let { path, redirect } = item;
      if (item.meta.isLink && !item.meta.isIframe)
        window.open(item.meta.isLink);
      else if (redirect) router.push(redirect);
      else router.push(path);
      closeSearch();
    };
    return {
      layoutMenuAutocompleteRef,
      openSearch,
      closeSearch,
      menuSearch,
      onHandleSelect,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss">
.layout-search-dialog {
  ::v-deep(.el-dialog) {
    box-shadow: unset !important;
    border-radius: 0 !important;
    background: rgba(0, 0, 0, 0.5);
  }
  ::v-deep(.el-autocomplete) {
    width: 560px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
  ::v-deep(.el-dialog__headerbtn) {
    top: 15px;
    right: 15px;
    .el-dialog__close {
      color: var(--color-primary);
    }
  }
}
</style>