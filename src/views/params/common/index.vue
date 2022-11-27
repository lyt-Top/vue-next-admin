<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<div class="flex-margin" style="width: 400px">
				<el-result icon="success" title="普通路由" subTitle="可 `开启 TagsView 共用` 进行单标签测试">
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
						<el-input v-model="state.tagsViewName" placeholder="请输入tagsView 名称" clearable class="mb15" style="width: 400px"></el-input>
						<el-input v-model="state.value" placeholder="请输入路由参数 id 值" clearable style="width: 400px"></el-input>
						<el-button type="primary" size="default" class="mt15" @click="onGoDetailsClick">
							<SvgIcon name="iconfont icon-putong" />
							普通路由传参
						</el-button>
						<el-button type="primary" size="default" class="mt15" @click="onChangeI18n">
							<SvgIcon name="iconfont icon-fuhao-zhongwen" />
							{{ state.tagsViewNameIsI18n ? '普通的演示' : '国际化演示' }}
						</el-button>
					</template>
				</el-result>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="paramsCommon">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

// 定义变量内容
const router = useRouter();
const state = reactive<ParamsState>({
	value: '',
	tagsViewName: '',
	tagsViewNameIsI18n: false,
});

// 跳转到详情
/**
 * 设置 tagsView 名称：
 * 传不同的 tagsViewName 值
 */
const onGoDetailsClick = () => {
	const params: EmptyObjectType = { id: state.value };
	if (state.tagsViewName) params.tagsViewName = state.tagsViewName;
	router.push({
		path: '/params/common/details',
		query: params,
	});
	state.value = '';
};
// 模拟测试内容
const onChangeI18n = () => {
	state.tagsViewNameIsI18n = !state.tagsViewNameIsI18n;
	if (state.tagsViewNameIsI18n) {
		state.tagsViewName = JSON.stringify({
			'zh-cn': '测试用',
			en: 'test page',
			'zh-tw': '測試用',
		});
	} else {
		state.tagsViewName = '我是普通路由测试tagsViewName(非国际化)';
	}
};
</script>
