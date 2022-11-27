<template>
	<div class="form-rules-container layout-pd">
		<el-card shadow="hover" header="表单组件1"> <FormRulesOne :data="state.formRulesOneData" ref="pagesFormRulesOneRef" /></el-card>
		<el-card shadow="hover" header="表单组件2" class="mt15"><FormRulesTwo ref="pagesFormRulesTwoRef" /> </el-card>
		<el-card shadow="hover" header="表单组件3" class="mt15"> <FormRulesThree ref="pagesFormRulesThreeRef" /></el-card>
		<el-row class="flex mt15">
			<div class="flex-margin">
				<el-button size="default" @click="onResetForm">
					<SvgIcon name="ele-RefreshRight" />
					重置表单
				</el-button>
				<el-button size="default" type="primary" @click="onSubmitForm">
					<SvgIcon name="iconfont icon-shuxing" />
					验证表单
				</el-button>
			</div>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="pagesFormRules">
import { defineAsyncComponent, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

// 引入组件
const FormRulesOne = defineAsyncComponent(() => import('/@/views/pages/formRules/component/formRulesOne.vue'));
const FormRulesTwo = defineAsyncComponent(() => import('/@/views/pages/formRules/component/formRulesTwo.vue'));
const FormRulesThree = defineAsyncComponent(() => import('/@/views/pages/formRules/component/formRulesThree.vue'));

// 定义变量内容
const pagesFormRulesOneRef = ref();
const pagesFormRulesTwoRef = ref();
const pagesFormRulesThreeRef = ref();
const state = reactive({
	formRulesOneData: {
		name: 'lyt',
		email: 'lyt123@.com',
		autograph: 'lyt123456',
		occupation: '1',
	},
});

// 表单组件验证
const formRulesValidate = (pageRef: RefType, sonRef: string) => {
	return new Promise((resolve) => {
		pageRef.value.$refs[sonRef].validate((valid: boolean) => {
			if (valid) resolve(valid);
		});
	});
};
// 表单组件重置
const formRulesResetFields = () => {
	pagesFormRulesOneRef.value.$refs.formRulesOneRef.resetFields();
	pagesFormRulesTwoRef.value.$refs.formRulesTwoRef.resetFields();
	pagesFormRulesThreeRef.value.$refs.formRulesThreeRef.resetFields();
};
// 验证表单
const onSubmitForm = () => {
	Promise.all([
		formRulesValidate(pagesFormRulesOneRef, 'formRulesOneRef'),
		formRulesValidate(pagesFormRulesTwoRef, 'formRulesTwoRef'),
		formRulesValidate(pagesFormRulesThreeRef, 'formRulesThreeRef'),
	]).then(() => {
		ElMessage.success('表单全部验证成功');
	});
};
// 重置表单
const onResetForm = () => {
	formRulesResetFields();
};
</script>
