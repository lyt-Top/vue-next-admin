<template>
	<div class="form-rules-two-container">
		<el-form :model="state.form" :rules="state.rules" ref="formRulesTwoRef" size="default" label-width="100px" class="mt35">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
					<el-form-item label="手机" prop="phone">
						<el-input v-model="state.form.phone" placeholder="请输入手机" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
					<el-form-item label="性别">
						<el-select v-model="state.form.sex" placeholder="请选择性别" clearable class="w100">
							<el-option label="男" value="1"></el-option>
							<el-option label="女" value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
					<el-form-item label="登录密码" prop="password">
						<el-input v-model="state.form.password" placeholder="请输入登录密码" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
					<el-form-item label="权限角色" prop="auth">
						<el-input v-model="state.form.auth" placeholder="请输入权限角色" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="pagesFormRulesTwo">
import { reactive } from 'vue';

// 定义变量内容
const state = reactive({
	form: { phone: '', sex: '', password: '', auth: '' },
	rules: {
		phone: { required: true, message: '请输入手机', trigger: 'blur' },
		password: { required: true, message: '请输入登录密码', trigger: 'blur' },
		auth: { required: true, message: '请输入权限角色', trigger: 'blur' },
	},
});
</script>
