<template>
	<div class="layout-search-dialog">
		<el-dialog v-model="isShowSearch" width="300px" destroy-on-close :modal="false" fullscreen :show-close="false">
			<el-autocomplete
				v-model="menuQuery"
				:fetch-suggestions="menuSearch"
				:placeholder="$t('message.user.searchPlaceholder')"
				ref="layoutMenuAutocompleteRef"
				@select="onHandleSelect"
				@blur="onSearchBlur"
			>
				<template #prefix>
					<el-icon class="el-input__icon">
						<ele-Search />
					</el-icon>
				</template>
				<template #default="{ item }">
					<div>
						<SvgIcon :name="item.meta.icon" class="mr5" />
						{{ $t(item.meta.title) }}
					</div>
				</template>
			</el-autocomplete>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';

// 定义接口来定义对象的类型
interface SearchState {
	isShowSearch: boolean;
	menuQuery: string;
	tagsViewList: object[];
}
interface Restaurant {
	path: string;
	meta: {
		title: string;
	};
}

export default defineComponent({
	name: 'layoutBreadcrumbSearch',
	setup() {
		const storesTagsViewRoutes = useTagsViewRoutes();
		const { tagsViewRoutes } = storeToRefs(storesTagsViewRoutes);
		const layoutMenuAutocompleteRef = ref();
		const { t } = useI18n();
		const router = useRouter();
		const state = reactive<SearchState>({
			isShowSearch: false,
			menuQuery: '',
			tagsViewList: [],
		});
		// 搜索弹窗打开
		const openSearch = () => {
			state.menuQuery = '';
			state.isShowSearch = true;
			initTageView();
			nextTick(() => {
				setTimeout(() => {
					layoutMenuAutocompleteRef.value.focus();
				});
			});
		};
		// 搜索弹窗关闭
		const closeSearch = () => {
			state.isShowSearch = false;
		};
		// 菜单搜索数据过滤
		const menuSearch = (queryString: string, cb: Function) => {
			let results = queryString ? state.tagsViewList.filter(createFilter(queryString)) : state.tagsViewList;
			cb(results);
		};
		// 菜单搜索过滤
		const createFilter: any = (queryString: string) => {
			return (restaurant: Restaurant) => {
				return (
					restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
					restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
					t(restaurant.meta.title).indexOf(queryString.toLowerCase()) > -1
				);
			};
		};
		// 初始化菜单数据
		const initTageView = () => {
			if (state.tagsViewList.length > 0) return false;
			tagsViewRoutes.value.map((v: any) => {
				if (!v.meta.isHide) state.tagsViewList.push({ ...v });
			});
		};
		// 当前菜单选中时
		const onHandleSelect = (item: any) => {
			let { path, redirect } = item;
			if (item.meta.isLink && !item.meta.isIframe) window.open(item.meta.isLink);
			else if (redirect) router.push(redirect);
			else router.push(path);
			closeSearch();
		};
		// input 失去焦点时
		const onSearchBlur = () => {
			closeSearch();
		};
		return {
			layoutMenuAutocompleteRef,
			openSearch,
			closeSearch,
			menuSearch,
			onHandleSelect,
			onSearchBlur,
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
}
</style>
