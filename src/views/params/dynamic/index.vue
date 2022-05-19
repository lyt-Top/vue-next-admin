<template>
	<div class="layout-view-bg-white flex" :style="{ height: `calc(100vh - ${setViewHeight}` }">
		<div class="flex-margin" style="width: 400px">
			<el-result icon="warning" title="动态路由" subTitle="可 `开启 TagsView 共用` 进行单标签测试">
				<template #extra>
					<el-alert type="success" :closable="false" class="mb30">
						<template #default>
							<div>1、设置非国际化：格式：tagsViewName=xxx</div>
							<br />
							<div>2、设置国际化：格式：tagsViewName=JSON.stringify({"zh-cn":"测试用","en":"test+page","zh-tw":"測試用"})</div>
							<br />
							<div>3、设置国际化后，去顶栏切换语言查看演示效果</div>
							<br />
							<div>
								4、 <a href="https://gitee.com/q7but" target="_black">感谢@q7but</a>、
								<a href="https://gitee.com/lyt-top/vue-next-admin/pulls/22/files" target="_black">!22 add 添加自定义 tagVIewName 拓展,支持国际化</a>
							</div>
						</template>
					</el-alert>
					<el-input v-model="tagsViewName" placeholder="请输入tagsView 名称" clearable class="mb15" style="width: 400px"></el-input>
					<el-input v-model="value" placeholder="请输入路由参数id值" clearable style="width: 400px"></el-input>
					<el-button type="primary" size="default" class="mt15" @click="onGoDetailsClick">
						<SvgIcon name="iconfont icon-dongtai" />
						动态路由传参
					</el-button>
					<el-button type="primary" size="default" class="mt15" @click="onChangeI18n">
						<SvgIcon name="iconfont icon-fuhao-zhongwen" />
						{{ tagsViewNameIsI18n ? '普通的演示' : '国际化演示' }}
					</el-button>
				</template>
			</el-result>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';

export default defineComponent({
	name: 'paramsDynamic',
	setup() {
		const storesTagsViewRoutes = useTagsViewRoutes();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
		const state = reactive({
			value: '',
			tagsViewName: '',
			tagsViewNameIsI18n: false,
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
		const onGoDetailsClick = () => {
			if (!state.tagsViewName) return ElMessage.warning('动态路由tagsViewName为必填，因为路由配置了');
			if (!state.value) return ElMessage.warning('路由参数id值为必填');
			// name 值为路由中的 name
			router.push({
				name: 'paramsDynamicDetails',
				params: {
					t: 'vue-next-admin',
					id: state.value,
					tagsViewName: state.tagsViewName,
				},
			});
			state.value = '';
		};
		const onChangeI18n = () => {
			state.tagsViewNameIsI18n = !state.tagsViewNameIsI18n;
			if (state.tagsViewNameIsI18n) {
				state.tagsViewName = JSON.stringify({
					'zh-cn': '我是动态路由',
					en: 'Im dynamic routing',
					'zh-tw': '我是動態路由',
				});
			} else {
				state.tagsViewName = '我是动态路由测试tagsViewName(非国际化)';
			}
		};
		return {
			setViewHeight,
			onGoDetailsClick,
			onChangeI18n,
			...toRefs(state),
		};
	},
});
</script>
