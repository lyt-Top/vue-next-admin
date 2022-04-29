<template>
	<div class="layout-view-bg-white flex" :style="{ height: `calc(100vh - ${setViewHeight}` }">
		<div class="flex-margin" style="width: 400px">
			<el-result icon="success" title="普通路由" subTitle="可 `开启 TagsView 共用` 进行单标签测试">
				<template #extra>
					<el-input v-model="tagsViewName" placeholder="请输入tagsView 名称" clearable class="mb15" style="width: 400px"></el-input>
					<el-input v-model="value" placeholder="请输入路由参数 id 值" clearable style="width: 400px"></el-input>
					<el-button type="primary" size="default" class="mt15" @click="onGoDetailsClick">
						<SvgIcon name="iconfont icon-putong" />
						普通路由传参
					</el-button>
				</template>
			</el-result>
		</div>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';

export default defineComponent({
	name: 'paramsCommon',
	setup() {
		const storesTagsViewRoutes = useTagsViewRoutes();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
		const state = reactive({
			value: '',
			tagsViewName: null,
		});
		const router = useRouter();
		// 设置 view 的高度
		const setViewHeight = computed(() => {
			let { isTagsview } = themeConfig.value;
			if (isTagsViewCurrenFull.value) {
				return `30px`;
			} else {
				if (isTagsview) return `114px`;
				else return `80px`;
			}
		});
		// 跳转到详情
		/**
		 * 设置 tagsView 名称：
		 * 传不同的 tagsViewName 值
		 */
		const onGoDetailsClick = () => {
			router.push({
				path: '/params/common/details',
				query: { id: state.value, tagsViewName: state.tagsViewName },
			});
			state.value = '';
		};
		return {
			setViewHeight,
			onGoDetailsClick,
			...toRefs(state),
		};
	},
});
</script>
