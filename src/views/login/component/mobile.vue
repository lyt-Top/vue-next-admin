<template>
	<el-form class="login-content-form">
		<el-form-item>
			<el-input
				type="text"
				:placeholder="$t('message.mobile.placeholder1')"
				prefix-icon="iconfont icon-dianhua"
				v-model="ruleForm.userName"
				clearable
				autocomplete="off"
			>
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-row :gutter="15">
				<el-col :span="16">
					<el-input
						type="text"
						maxlength="4"
						:placeholder="$t('message.mobile.placeholder2')"
						prefix-icon="el-icon-position"
						v-model="ruleForm.code"
						clearable
						autocomplete="off"
					></el-input>
				</el-col>
				<el-col :span="8">
					<el-button class="login-content-code">{{ $t('message.mobile.codeText') }}</el-button>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" class="login-content-submit" round>
				<span>{{ $t('message.mobile.btnText') }}</span>
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent } from 'vue';
export default defineComponent({
	name: 'login',
	setup() {
		const state = reactive({
			ruleForm: {
				userName: '',
				code: '',
			},
		});
		return {
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;
	::v-deep(.el-input__icon) {
		display: inline-block;
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
