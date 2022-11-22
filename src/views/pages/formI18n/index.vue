<template>
	<div class="form-i18n-container layout-pd">
		<el-card shadow="hover" header="表单国际化演示(不适用于动态项 form-item)">
			<div style="text-align: center; margin-top: 15px">
				<el-radio-group v-model="state.radio" size="default" @change="onRadioChange">
					<el-radio-button label="zh-cn">中文简体</el-radio-button>
					<el-radio-button label="en">英文</el-radio-button>
					<el-radio-button label="zh-tw">中文繁体</el-radio-button>
				</el-radio-group>
			</div>
			<el-form :model="state.form" size="default" label-width="100px" class="mt35 mb35">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item :label="$t('message.formI18nLabel.name')">
							<el-input v-model="state.form.name" :placeholder="$t('message.formI18nPlaceholder.name')" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item :label="$t('message.formI18nLabel.email')">
							<el-input v-model="state.form.email" :placeholder="$t('message.formI18nPlaceholder.email')" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item :label="$t('message.formI18nLabel.autograph')">
							<el-input v-model="state.form.autograph" :placeholder="$t('message.formI18nPlaceholder.autograph')" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="pagesFormI18n">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

// 定义变量内容
const { locale } = useI18n();
const state = reactive({
	radio: 'zh-cn',
	form: {
		name: '',
		email: '',
		autograph: '',
	},
});

// 单选框改变时
const onRadioChange = () => {
	locale.value = state.radio;
};
</script>
