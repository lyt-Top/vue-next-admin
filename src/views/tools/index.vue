<template>
	<div class="tools-warp">
		<el-card shadow="hover">
			<div slot="header">
				<span>正则验证</span>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="tools-warp-form" size="small">
				<el-form-item label="小数或整数:" prop="a1">
					<div class="tools-warp-form-msg">
						验证可以输入小数或整数，0 开始， . 只能出现一次，保留小数点后保留2位小数。(负数时，模拟拼接负号给后台)。
					</div>
					<div>
						<el-input v-model="ruleForm.a1" @input="onVerifyNumberIntegerAndFloat($event)" placeholder="请输入小数或整数进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="正整数:" prop="a2" class="mt20">
					<div class="tools-warp-form-msg">验证只可以输入正整数，0 开始后面将不可以输入。</div>
					<div>
						<el-input v-model="ruleForm.a2" @input="onVerifiyNumberInteger($event)" placeholder="请输入整数进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="去掉中文及空格:" prop="a3" class="mt20">
					<div class="tools-warp-form-msg">验证不可以输入空格与中文。</div>
					<div>
						<el-input v-model="ruleForm.a3" @input="onVerifyCnAndSpace($event)" placeholder="请输入内容进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="去掉英文及空格:" prop="a4" class="mt20">
					<div class="tools-warp-form-msg">验证不可以输入空格与英文。</div>
					<div>
						<el-input v-model="ruleForm.a4" @input="onVerifyEnAndSpace($event)" placeholder="请输入内容进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="禁止输入空格:" prop="a5" class="mt20">
					<div class="tools-warp-form-msg">验证不可以输入空格。</div>
					<div>
						<el-input v-model="ruleForm.a5" @input="onVerifyAndSpace($event)" placeholder="请输入内容进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="金额用 `,` 区分开:" prop="a6" class="mt20">
					<div class="tools-warp-form-msg">金额添加 `,` 进行区分，便于阅读。{{ ruleForm.a6 }}</div>
					<div>
						<el-input v-model="ruleForm.a6" @input="onVerifyNumberComma($event)" placeholder="请输入金额进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="匹配文字变色（搜索时）:" prop="a7" class="mt20">
					<div class="tools-warp-form-msg">示例：<span v-html="text"></span></div>
					<div>
						<el-input v-model="ruleForm.a7" @input="onVerifyTextColor($event)" placeholder="请输入示例中的部分文字"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="数字转中文大写:" prop="a8" class="mt20">
					<div class="tools-warp-form-msg">
						验证数字转成中文的大写。<span class="tools-warp-form-msg-red">{{ cnText }}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a8" @input="onVerifyNumberCnUppercase($event)" placeholder="请输入金额进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="手机号码:" prop="a9" class="mt20">
					<div class="tools-warp-form-msg">
						验证手机号码 (true: 正确，false: 不正确)。<span class="tools-warp-form-msg-red">{{ phone }}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a9" @input="onVerifyPhone($event)" placeholder="请输入手机号进行测试" maxlength="11"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="国内电话号码:" prop="a10" class="mt20">
					<div class="tools-warp-form-msg">
						验证国内电话号码 (true: 正确，false: 不正确)。<span class="tools-warp-form-msg-red">{{ telePhone }}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a10" @input="onVerifyTelPhone($event)" placeholder="请输入国内电话号码进行测试" maxlength="12"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="登录账号:" prop="a11" class="mt20">
					<div class="tools-warp-form-msg">
						验证登录账号是否正确。字母开头，允许5-16字节，允许字母数字下划线 (true: 正确，false: 不正确)。<span class="tools-warp-form-msg-red">{{
							account
						}}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a11" @input="onVerifyAccount($event)" placeholder="请输入账号进行测试" maxlength="16"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="密码:" prop="a12" class="mt20">
					<div class="tools-warp-form-msg">
						验证密码是否正确。以字母开头，长度在6~16之间，只能包含字母、数字和下划线 (true: 正确，false: 不正确)。<span
							class="tools-warp-form-msg-red"
							>{{ password }}</span
						>
					</div>
					<div>
						<el-input v-model="ruleForm.a12" @input="onVerifyPassword($event)" placeholder="请输入密码进行测试" maxlength="16"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="强密码:" prop="a13" class="mt20">
					<div class="tools-warp-form-msg">
						验证强密码是否正确。字母+数字+特殊字符，长度在6-16之间 (true: 正确，false: 不正确)。<span class="tools-warp-form-msg-red">{{
							passwordPowerful
						}}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a13" @input="onVerifyPasswordPowerful($event)" placeholder="请输入密码进行测试" maxlength="16"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="密码强度:" prop="a14" class="mt20">
					<div class="tools-warp-form-msg">
						验证密码强度。返回 强、中、弱。(弱：纯数字，纯字母，纯特殊字符，中：字母+数字，字母+特殊字符，数字+特殊字符，强：字母+数字+特殊字符)<span
							class="tools-warp-form-msg-red"
							>{{ passwordStrength }}</span
						>
					</div>
					<div>
						<el-input v-model="ruleForm.a14" @input="onVerifyPasswordStrength($event)" placeholder="请输入密码进行测试" maxlength="16"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="IP地址:" prop="a15" class="mt20">
					<div class="tools-warp-form-msg">
						验证IP地址是否正确。(true: 正确，false: 不正确)。<span class="tools-warp-form-msg-red">{{ iPAddress }}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a15" @input="onVerifyIPAddress($event)" placeholder="请输入IP地址进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="邮箱:" prop="a16" class="mt20">
					<div class="tools-warp-form-msg">
						验证邮箱是否正确。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ email }}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a16" @input="onVerifyEmail($event)" placeholder="请输入邮箱进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="身份证:" prop="a17" class="mt20">
					<div class="tools-warp-form-msg">
						验证身份证是否正确。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ idCard }}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a17" @input="onVerifyIDCard($event)" placeholder="请输入身份证进行测试" maxlength="18"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="姓名:" prop="a18" class="mt20">
					<div class="tools-warp-form-msg">
						验证姓名是否正确，包括少数民族名字。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ fullName }}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a18" @input="onVerifyFullName($event)" placeholder="请输入姓名进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="邮政编码:" prop="a19" class="mt20">
					<div class="tools-warp-form-msg">
						验证邮政编码是否正确，不能以 0 开始。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ postalCode }}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a19" @input="onVerifyPostalCode($event)" placeholder="请输入邮政编码进行测试" maxlength="6"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="url:" prop="a20" class="mt20">
					<div class="tools-warp-form-msg">
						验证url是否正确。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ url }}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a20" @input="onVerifyUrl($event)" placeholder="请输入内容进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="车牌号:" prop="a21" class="mt20">
					<div class="tools-warp-form-msg">
						验证车牌号是否正确。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ carNum }}</span>
					</div>
					<div>
						<el-input v-model="ruleForm.a21" @input="onVerifyCarNum($event)" placeholder="请输入车牌号进行测试"> </el-input>
					</div>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import {
	verifyNumberIntegerAndFloat,
	verifiyNumberInteger,
	verifyCnAndSpace,
	verifyEnAndSpace,
	verifyAndSpace,
	verifyNumberComma,
	verifyTextColor,
	verifyNumberCnUppercase,
	verifyPhone,
	verifyTelPhone,
	verifyAccount,
	verifyPassword,
	verifyPasswordPowerful,
	verifyPasswordStrength,
	verifyIPAddress,
	verifyEmail,
	verifyIdCard,
	verifyFullName,
	verifyPostalCode,
	verifyUrl,
	verifyCarNum,
} from '@/utils/toolsValidate';
export default {
	name: 'tools',
	data() {
		return {
			text: '世间美好，与你环环相扣，祝你开心每一天！',
			phone: '',
			cnText: '',
			telePhone: '',
			account: '',
			password: '',
			passwordPowerful: '',
			passwordStrength: '',
			iPAddress: '',
			email: '',
			idCard: '',
			fullName: '',
			postalCode: '',
			url: '',
			carNum: '',
			/**
			 * 变量名为了方便，随便取了，
			 * 实际中，按正常程序进行命名
			 */
			ruleForm: {
				a1: '',
				a2: '',
				a3: '',
				a4: '',
				a5: '',
				a6: '',
				a7: '',
				a8: '',
				a9: '',
				a10: '',
				a11: '',
				a12: '',
				a13: '',
				a14: '',
				a15: '',
				a16: '',
				a17: '',
				a18: '',
				a19: '',
				a20: '',
				a21: '',
			},
			rules: {
				a1: [{ required: true, message: '请输入小数或整数进行测试', trigger: 'change' }],
				a2: [{ required: true, message: '请输入正整数进行测试', trigger: 'change' }],
				a3: [{ required: true, message: '请输入内容进行测试', trigger: 'change' }],
				a4: [{ required: true, message: '请输入内容进行测试', trigger: 'change' }],
				a5: [{ required: true, message: '请输入内容进行测试', trigger: 'change' }],
				a6: [{ required: true, message: '请输入小数或整数进行测试', trigger: 'change' }],
				a7: [{ required: true, message: '请输入内容进行测试', trigger: 'change' }],
				a8: [{ required: true, message: '请输入金额进行测试', trigger: 'change' }],
				a9: [{ required: true, message: '请输入手机号进行测试', trigger: 'change' }],
				a10: [{ required: true, message: '请输入国内电话号码进行测试', trigger: 'change' }],
				a11: [{ required: true, message: '请输入账号进行测试', trigger: 'change' }],
				a12: [{ required: true, message: '请输入密码进行测试', trigger: 'change' }],
				a13: [{ required: true, message: '请输入密码进行测试', trigger: 'change' }],
				a14: [{ required: true, message: '请输入密码进行测试', trigger: 'change' }],
				a15: [{ required: true, message: '请输入IP地址进行测试', trigger: 'change' }],
				a16: [{ required: true, message: '请输入邮箱进行测试', trigger: 'change' }],
				a17: [{ required: true, message: '请输入身份证进行测试', trigger: 'change' }],
				a18: [{ required: true, message: '请输入姓名进行测试', trigger: 'change' }],
				a19: [{ required: true, message: '请输入邮政编码进行测试', trigger: 'change' }],
				a20: [{ required: true, message: '请输入内容进行测试', trigger: 'change' }],
				a21: [{ required: true, message: '请输入车牌号进行测试', trigger: 'change' }],
			},
		};
	},
	methods: {
		// 小数或整数
		onVerifyNumberIntegerAndFloat(val) {
			this.ruleForm.a1 = verifyNumberIntegerAndFloat(val);
		},
		// 正整数
		onVerifiyNumberInteger(val) {
			this.ruleForm.a2 = verifiyNumberInteger(val);
		},
		// 去掉中文及空格
		onVerifyCnAndSpace(val) {
			this.ruleForm.a3 = verifyCnAndSpace(val);
		},
		// 去掉英文及空格
		onVerifyEnAndSpace(val) {
			this.ruleForm.a4 = verifyEnAndSpace(val);
		},
		// 禁止输入空格
		onVerifyAndSpace(val) {
			this.ruleForm.a5 = verifyAndSpace(val);
		},
		// 金额用 `,` 区分开
		onVerifyNumberComma(val) {
			this.ruleForm.a6 = verifyNumberComma(val);
		},
		// 匹配文字变色（搜索时）
		onVerifyTextColor(val) {
			this.ruleForm.a7 = verifyAndSpace(val);
			if (this.ruleForm.a7 === '') this.text = `世间美好，与你环环相扣，祝你开心每一天！`;
			else this.text = verifyTextColor(this.ruleForm.a7, this.text);
		},
		// 数字转中文大写
		onVerifyNumberCnUppercase(val) {
			this.ruleForm.a8 = verifyNumberIntegerAndFloat(val);
			if (this.ruleForm.a8 === '') this.cnText = '';
			else this.cnText = verifyNumberCnUppercase(this.ruleForm.a8);
		},
		// 手机号码
		onVerifyPhone(val) {
			this.phone = verifyPhone(val);
		},
		// 国内电话号码
		onVerifyTelPhone(val) {
			this.telePhone = verifyTelPhone(val);
		},
		// 登录账号
		onVerifyAccount(val) {
			this.ruleForm.a11 = verifyCnAndSpace(val);
			this.account = verifyAccount(this.ruleForm.a11);
		},
		// 密码
		onVerifyPassword(val) {
			this.ruleForm.a12 = verifyCnAndSpace(val);
			this.password = verifyPassword(this.ruleForm.a12);
		},
		// 强密码
		onVerifyPasswordPowerful(val) {
			this.ruleForm.a13 = verifyCnAndSpace(val);
			this.passwordPowerful = verifyPasswordPowerful(this.ruleForm.a13);
		},
		// 密码强度
		onVerifyPasswordStrength(val) {
			this.ruleForm.a14 = verifyCnAndSpace(val);
			this.passwordStrength = verifyPasswordStrength(this.ruleForm.a14);
		},
		// IP地址
		onVerifyIPAddress(val) {
			this.iPAddress = verifyIPAddress(val);
		},
		// 邮箱
		onVerifyEmail(val) {
			this.ruleForm.a16 = verifyCnAndSpace(val);
			this.email = verifyEmail(this.ruleForm.a16);
		},
		// 身份证
		onVerifyIDCard(val) {
			this.ruleForm.a17 = verifyCnAndSpace(val);
			this.idCard = verifyIdCard(this.ruleForm.a17);
		},
		// 姓名
		onVerifyFullName(val) {
			this.ruleForm.a18 = verifyAndSpace(val);
			this.fullName = verifyFullName(this.ruleForm.a18);
		},
		// 邮政编码
		onVerifyPostalCode(val) {
			this.ruleForm.a19 = verifiyNumberInteger(val);
			this.postalCode = verifyPostalCode(this.ruleForm.a19);
		},
		// url
		onVerifyUrl(val) {
			this.ruleForm.a20 = verifyAndSpace(val);
			this.url = verifyUrl(this.ruleForm.a20);
		},
		// 车牌号
		onVerifyCarNum(val) {
			this.ruleForm.a21 = verifyAndSpace(val);
			this.carNum = verifyCarNum(this.ruleForm.a21);
		},
	},
};
</script>

<style scoped lang="scss">
.tools-warp {
	.tools-warp-form {
		& ::v-deep .el-form-item--small.el-form-item {
			margin-bottom: 0 !important;
		}
		.tools-warp-form-msg {
			color: var(--prev-color-text-regular);
			font-size: 14px;
			.tools-warp-form-msg-red {
				color: red;
			}
		}
	}
}
</style>
