<template>
	<div class="layout-view-bg-white flex" :style="{ height: `calc(100vh - ${setViewHeight}` }">
		<div class="flex-margin">
			<el-result icon="success" title="普通路由" subTitle="请根据提示进行操作">
				<template #extra>
					<el-button type="primary" size="small" icon="iconfont icon-putong" @click="onGoDetailsClick">点击测试普通路由传参</el-button>
				</template>
			</el-result>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed } from 'vue';
import { useStore } from '/@/store/index';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: 'paramsCommon',
	setup() {
		const store = useStore();
		const state = reactive({});
		const router = useRouter();
		// 设置 view 的高度
		const setViewHeight = computed(() => {
			let { isTagsview } = store.state.themeConfig.themeConfig;
			if (isTagsview) return `114px`;
			else return `80px`;
		});
		// 跳转到详情
		const onGoDetailsClick = () => {
			router.push({
				path: '/params/common/details',
				query: {
					t: new Date().getTime(),
					id: Math.random(),
				},
			});
		};
		return {
			setViewHeight,
			onGoDetailsClick,
			...toRefs(state),
		};
	},
});
</script>
