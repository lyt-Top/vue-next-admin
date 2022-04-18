<template>
	<div class="form-rules-container">
		<el-card shadow="hover" header="表单组件1"> <FormRulesOne :data="formRulesOneData" ref="pagesFormRulesOneRef" /></el-card>
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

<script lang="ts">
import { toRefs, reactive, defineComponent, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import FormRulesOne from '/@/views/pages/formRules/component/formRulesOne.vue';
import FormRulesTwo from '/@/views/pages/formRules/component/formRulesTwo.vue';
import FormRulesThree from '/@/views/pages/formRules/component/formRulesThree.vue';

export default defineComponent({
	name: 'pagesFormRules',
	components: {
		FormRulesOne,
		FormRulesTwo,
		FormRulesThree,
	},
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const state = reactive({
			formRulesOneData: {
				name: 'lyt',
				email: 'lyt123@.com',
				autograph: 'lyt123456',
				occupation: '1',
			},
		});
		// 表单组件验证
		const formRulesValidate = (pageRef: string, sonRef: string) => {
			return new Promise((resolve) => {
				proxy.$refs[pageRef].$refs[sonRef].validate((valid: boolean) => {
					if (valid) resolve(valid);
				});
			});
		};
		// 表单组件重置
		const formRulesResetFields = () => {
			proxy.$refs.pagesFormRulesOneRef.$refs.formRulesOneRef.resetFields();
			proxy.$refs.pagesFormRulesTwoRef.$refs.formRulesTwoRef.resetFields();
			proxy.$refs.pagesFormRulesThreeRef.$refs.formRulesThreeRef.resetFields();
		};
		// 验证表单
		const onSubmitForm = () => {
			Promise.all([
				formRulesValidate('pagesFormRulesOneRef', 'formRulesOneRef'),
				formRulesValidate('pagesFormRulesTwoRef', 'formRulesTwoRef'),
				formRulesValidate('pagesFormRulesThreeRef', 'formRulesThreeRef'),
			]).then(() => {
				ElMessage.success('表单全部验证成功');
			});
		};
		// 重置表单
		const onResetForm = () => {
			formRulesResetFields();
		};
		return {
			onSubmitForm,
			onResetForm,
			...toRefs(state),
		};
	},
});
</script>
