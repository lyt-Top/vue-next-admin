<template>
	<el-form class="login-content-form">
		<el-form-item class="login-animation-one">
			<el-input type="text" placeholder="请输入手机号" v-model="state.ruleForm.userName" clearable autocomplete="off">
				<template #prefix>
					<i class="iconfont icon-dianhua el-input__icon"></i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation-two">
			<el-row :gutter="15">
				<el-col :span="16">
					<el-input type="text" maxlength="4" placeholder="请输入验证码" v-model="state.ruleForm.code" clearable autocomplete="off">
						<template #prefix>
							<el-icon class="el-input__icon"><elementPosition /></el-icon>
						</template>
					</el-input>
				</el-col>
				<el-col :span="8">
					<el-button class="login-content-code">获取验证码</el-button>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item class="login-animation-three">
			<el-button type="primary" class="login-content-submit" round>
				<span>登 录</span>
			</el-button>
		</el-form-item>
		<el-form-item class="login-animation-four">
			<el-button type="text" size="small">第三方登录</el-button>
			<el-button type="text" size="small">友情链接</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup name="loginMobile">
const state = reactive({
	ruleForm: {
		userName: '',
		code: '',
	},
});
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;
	.login-animation-one,
	.login-animation-two,
	.login-animation-three,
	.login-animation-four {
		opacity: 0;
		animation-name: error-num;
		animation-duration: 0.5s;
		animation-fill-mode: forwards;
	}
	.login-animation-one {
		animation-delay: 0.1s;
	}
	.login-animation-two {
		animation-delay: 0.2s;
	}
	.login-animation-three {
		animation-delay: 0.3s;
		margin-bottom: 5px;
	}
	.login-animation-four {
		animation-delay: 0.4s;
	}
	.login-content-code {
		width: 100%;
		padding: 0;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
</style>
