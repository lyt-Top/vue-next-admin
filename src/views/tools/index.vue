<template>
	<div class="layout-pd">
		<el-card shadow="hover" header="正则验证（一些项目中常用的正则）">
			<el-form :model="state.ruleForm" :rules="state.rules" class="tools-warp-form" size="default" label-position="top">
				<el-form-item label="验证百分比（不可以小数）:" prop="a22">
					<div class="tools-warp-form-msg">验证可以输入大于0小于100的数字</div>
					<div>
						<el-input v-model="state.ruleForm.a22" @input="onVerifyNumberPercentage($event)" placeholder="请输入数字进行测试">
							<template #append> % </template>
						</el-input>
					</div>
				</el-form-item>
				<el-form-item label="验证百分比（可以小数）:" prop="a23" class="mt20">
					<div class="tools-warp-form-msg">验证可以输入大于0小于100的数字</div>
					<div>
						<el-input v-model="state.ruleForm.a23" @input="onVerifyNumberPercentageFloat($event)" placeholder="请输入数字进行测试">
							<template #append> % </template>
						</el-input>
					</div>
				</el-form-item>
				<el-form-item label="小数或整数:" prop="a1" class="mt20">
					<div class="tools-warp-form-msg">
						验证可以输入小数或整数，0 开始， . 只能出现一次，保留小数点后保留2位小数。(负数时，模拟拼接负号给后台)。
					</div>
					<div>
						<el-input v-model="state.ruleForm.a1" @input="onVerifyNumberIntegerAndFloat($event)" placeholder="请输入小数或整数进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="正整数:" prop="a2" class="mt20">
					<div class="tools-warp-form-msg">验证只可以输入正整数，0 开始后面将不可以输入。</div>
					<div>
						<el-input v-model="state.ruleForm.a2" @input="onVerifiyNumberInteger($event)" placeholder="请输入整数进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="去掉中文及空格:" prop="a3" class="mt20">
					<div class="tools-warp-form-msg">验证不可以输入空格与中文。</div>
					<div>
						<el-input v-model="state.ruleForm.a3" @input="onVerifyCnAndSpace($event)" placeholder="请输入内容进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="去掉英文及空格:" prop="a4" class="mt20">
					<div class="tools-warp-form-msg">验证不可以输入空格与英文。</div>
					<div>
						<el-input v-model="state.ruleForm.a4" @input="onVerifyEnAndSpace($event)" placeholder="请输入内容进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="禁止输入空格:" prop="a5" class="mt20">
					<div class="tools-warp-form-msg">验证不可以输入空格。</div>
					<div>
						<el-input v-model="state.ruleForm.a5" @input="onVerifyAndSpace($event)" placeholder="请输入内容进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="金额用 `,` 区分开:" prop="a6" class="mt20">
					<div class="tools-warp-form-msg">金额添加 `,` 进行区分，便于阅读。{{ state.ruleForm.a6 }}</div>
					<div>
						<el-input v-model="state.ruleForm.a6" @input="onVerifyNumberComma($event)" placeholder="请输入金额进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="匹配文字变色（搜索时）:" prop="a7" class="mt20">
					<div class="tools-warp-form-msg">示例：<span v-html="state.text"></span></div>
					<div>
						<el-input v-model="state.ruleForm.a7" @input="onVerifyTextColor($event)" placeholder="请输入示例中的部分文字"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="数字转中文大写:" prop="a8" class="mt20">
					<div class="tools-warp-form-msg">
						验证数字转成中文的大写。<span class="tools-warp-form-msg-red">{{ state.cnText }}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a8" @input="onVerifyNumberCnUppercase($event)" placeholder="请输入金额进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="手机号码:" prop="a9" class="mt20">
					<div class="tools-warp-form-msg">
						验证手机号码 (true: 正确，false: 不正确)。<span class="tools-warp-form-msg-red">{{ state.phone }}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a9" @input="onVerifyPhone($event)" placeholder="请输入手机号进行测试" maxlength="11"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="国内电话号码:" prop="a10" class="mt20">
					<div class="tools-warp-form-msg">
						验证国内电话号码 (true: 正确，false: 不正确)。<span class="tools-warp-form-msg-red">{{ state.telePhone }}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a10" @input="onVerifyTelPhone($event)" placeholder="请输入国内电话号码进行测试" maxlength="12">
						</el-input>
					</div>
				</el-form-item>
				<el-form-item label="登录账号:" prop="a11" class="mt20">
					<div class="tools-warp-form-msg">
						验证登录账号是否正确。字母开头，允许5-16字节，允许字母数字下划线 (true: 正确，false: 不正确)。<span class="tools-warp-form-msg-red">{{
							state.account
						}}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a11" @input="onVerifyAccount($event)" placeholder="请输入账号进行测试" maxlength="16"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="密码:" prop="a12" class="mt20">
					<div class="tools-warp-form-msg">
						验证密码是否正确。以字母开头，长度在6~16之间，只能包含字母、数字和下划线 (true: 正确，false: 不正确)。<span
							class="tools-warp-form-msg-red"
							>{{ state.password }}</span
						>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a12" @input="onVerifyPassword($event)" placeholder="请输入密码进行测试" maxlength="16"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="强密码:" prop="a13" class="mt20">
					<div class="tools-warp-form-msg">
						验证强密码是否正确。字母+数字+特殊字符，长度在6-16之间 (true: 正确，false: 不正确)。<span class="tools-warp-form-msg-red">{{
							state.passwordPowerful
						}}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a13" @input="onVerifyPasswordPowerful($event)" placeholder="请输入密码进行测试" maxlength="16">
						</el-input>
					</div>
				</el-form-item>
				<el-form-item label="密码强度:" prop="a14" class="mt20">
					<div class="tools-warp-form-msg">
						验证密码强度。返回 强、中、弱。(弱：纯数字，纯字母，纯特殊字符，中：字母+数字，字母+特殊字符，数字+特殊字符，强：字母+数字+特殊字符)<span
							class="tools-warp-form-msg-red"
							>{{ state.passwordStrength }}</span
						>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a14" @input="onVerifyPasswordStrength($event)" placeholder="请输入密码进行测试" maxlength="16">
						</el-input>
					</div>
				</el-form-item>
				<el-form-item label="IP地址:" prop="a15" class="mt20">
					<div class="tools-warp-form-msg">
						验证IP地址是否正确。(true: 正确，false: 不正确)。<span class="tools-warp-form-msg-red">{{ state.iPAddress }}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a15" @input="onVerifyIPAddress($event)" placeholder="请输入IP地址进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="邮箱:" prop="a16" class="mt20">
					<div class="tools-warp-form-msg">
						验证邮箱是否正确。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ state.email }}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a16" @input="onVerifyEmail($event)" placeholder="请输入邮箱进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="身份证:" prop="a17" class="mt20">
					<div class="tools-warp-form-msg">
						验证身份证是否正确。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ state.idCard }}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a17" @input="onVerifyIDCard($event)" placeholder="请输入身份证进行测试" maxlength="18"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="姓名:" prop="a18" class="mt20">
					<div class="tools-warp-form-msg">
						验证姓名是否正确，包括少数民族名字。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ state.fullName }}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a18" @input="onVerifyFullName($event)" placeholder="请输入姓名进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="邮政编码:" prop="a19" class="mt20">
					<div class="tools-warp-form-msg">
						验证邮政编码是否正确，不能以 0 开始。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ state.postalCode }}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a19" @input="onVerifyPostalCode($event)" placeholder="请输入邮政编码进行测试" maxlength="6"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="url:" prop="a20" class="mt20">
					<div class="tools-warp-form-msg">
						验证url是否正确。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ state.url }}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a20" @input="onVerifyUrl($event)" placeholder="请输入内容进行测试"> </el-input>
					</div>
				</el-form-item>
				<el-form-item label="车牌号:" prop="a21" class="mt20">
					<div class="tools-warp-form-msg">
						验证车牌号是否正确。(true: 正确，false:不正确)。<span class="tools-warp-form-msg-red">{{ state.carNum }}</span>
					</div>
					<div>
						<el-input v-model="state.ruleForm.a21" @input="onVerifyCarNum($event)" placeholder="请输入车牌号进行测试"> </el-input>
					</div>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="tools">
import { reactive } from 'vue';
import {
	verifyNumberPercentage,
	verifyNumberPercentageFloat,
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
} from '/@/utils/toolsValidate';

// 定义变量内容
const state = reactive({
	text: '世间美好，与你环环相扣，祝你开心每一天！',
	phone: false,
	cnText: '',
	telePhone: false,
	account: false,
	password: false,
	passwordPowerful: false,
	passwordStrength: '',
	iPAddress: false,
	email: false,
	idCard: false,
	fullName: false,
	postalCode: false,
	url: false,
	carNum: false,
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
		a22: '',
		a23: '',
	},
	rules: {
		a1: [
			{
				required: true,
				message: '请输入小数或整数进行测试',
				trigger: 'change',
			},
		],
		a2: [
			{
				required: true,
				message: '请输入正整数进行测试',
				trigger: 'change',
			},
		],
		a3: [{ required: true, message: '请输入内容进行测试', trigger: 'change' }],
		a4: [{ required: true, message: '请输入内容进行测试', trigger: 'change' }],
		a5: [{ required: true, message: '请输入内容进行测试', trigger: 'change' }],
		a6: [
			{
				required: true,
				message: '请输入小数或整数进行测试',
				trigger: 'change',
			},
		],
		a7: [{ required: true, message: '请输入内容进行测试', trigger: 'change' }],
		a8: [{ required: true, message: '请输入金额进行测试', trigger: 'change' }],
		a9: [
			{
				required: true,
				message: '请输入手机号进行测试',
				trigger: 'change',
			},
		],
		a10: [
			{
				required: true,
				message: '请输入国内电话号码进行测试',
				trigger: 'change',
			},
		],
		a11: [{ required: true, message: '请输入账号进行测试', trigger: 'change' }],
		a12: [{ required: true, message: '请输入密码进行测试', trigger: 'change' }],
		a13: [{ required: true, message: '请输入密码进行测试', trigger: 'change' }],
		a14: [{ required: true, message: '请输入密码进行测试', trigger: 'change' }],
		a15: [
			{
				required: true,
				message: '请输入IP地址进行测试',
				trigger: 'change',
			},
		],
		a16: [{ required: true, message: '请输入邮箱进行测试', trigger: 'change' }],
		a17: [
			{
				required: true,
				message: '请输入身份证进行测试',
				trigger: 'change',
			},
		],
		a18: [{ required: true, message: '请输入姓名进行测试', trigger: 'change' }],
		a19: [
			{
				required: true,
				message: '请输入邮政编码进行测试',
				trigger: 'change',
			},
		],
		a20: [{ required: true, message: '请输入内容进行测试', trigger: 'change' }],
		a21: [
			{
				required: true,
				message: '请输入车牌号进行测试',
				trigger: 'change',
			},
		],
		a22: [{ required: true, message: '请输入数字进行测试', trigger: 'change' }],
		a23: [{ required: true, message: '请输入数字进行测试', trigger: 'change' }],
	},
});

// 验证百分比（不可以小数）
const onVerifyNumberPercentage = (val: string) => {
	state.ruleForm.a22 = verifyNumberPercentage(val);
};
// 验证百分比（可以小数）
const onVerifyNumberPercentageFloat = (val: string) => {
	state.ruleForm.a23 = verifyNumberPercentageFloat(val);
};
// 小数或整数
const onVerifyNumberIntegerAndFloat = (val: string) => {
	state.ruleForm.a1 = verifyNumberIntegerAndFloat(val);
};
// 正整数
const onVerifiyNumberInteger = (val: string) => {
	state.ruleForm.a2 = verifiyNumberInteger(val);
};
// 去掉中文及空格
const onVerifyCnAndSpace = (val: string) => {
	state.ruleForm.a3 = verifyCnAndSpace(val);
};
// 去掉英文及空格
const onVerifyEnAndSpace = (val: string) => {
	state.ruleForm.a4 = verifyEnAndSpace(val);
};
// 禁止输入空格
const onVerifyAndSpace = (val: string) => {
	state.ruleForm.a5 = verifyAndSpace(val);
};
// 金额用 `,` 区分开
const onVerifyNumberComma = (val: string) => {
	state.ruleForm.a6 = verifyNumberComma(val);
};
// 匹配文字变色（搜索时）
const onVerifyTextColor = (val: string) => {
	state.ruleForm.a7 = verifyAndSpace(val);
	if (state.ruleForm.a7 === '') state.text = `世间美好，与你环环相扣，祝你开心每一天！`;
	else state.text = verifyTextColor(state.ruleForm.a7, state.text);
};
// 数字转中文大写
const onVerifyNumberCnUppercase = (val: string) => {
	state.ruleForm.a8 = verifyNumberIntegerAndFloat(val);
	if (state.ruleForm.a8 === '') state.cnText = '';
	else state.cnText = verifyNumberCnUppercase(state.ruleForm.a8);
};
// 手机号码
const onVerifyPhone = (val: string) => {
	state.phone = verifyPhone(val);
};
// 国内电话号码
const onVerifyTelPhone = (val: string) => {
	state.telePhone = verifyTelPhone(val);
};
// 登录账号
const onVerifyAccount = (val: string) => {
	state.ruleForm.a11 = verifyCnAndSpace(val);
	state.account = verifyAccount(state.ruleForm.a11);
};
// 密码
const onVerifyPassword = (val: string) => {
	state.ruleForm.a12 = verifyCnAndSpace(val);
	state.password = verifyPassword(state.ruleForm.a12);
};
// 强密码
const onVerifyPasswordPowerful = (val: string) => {
	state.ruleForm.a13 = verifyCnAndSpace(val);
	state.passwordPowerful = verifyPasswordPowerful(state.ruleForm.a13);
};
// 密码强度
const onVerifyPasswordStrength = (val: string) => {
	state.ruleForm.a14 = verifyCnAndSpace(val);
	state.passwordStrength = verifyPasswordStrength(state.ruleForm.a14);
};
// IP地址
const onVerifyIPAddress = (val: string) => {
	state.iPAddress = verifyIPAddress(val);
};
// 邮箱
const onVerifyEmail = (val: string) => {
	state.ruleForm.a16 = verifyCnAndSpace(val);
	state.email = verifyEmail(state.ruleForm.a16);
};
// 身份证
const onVerifyIDCard = (val: string) => {
	state.ruleForm.a17 = verifyCnAndSpace(val);
	state.idCard = verifyIdCard(state.ruleForm.a17);
};
// 姓名
const onVerifyFullName = (val: string) => {
	state.ruleForm.a18 = verifyAndSpace(val);
	state.fullName = verifyFullName(state.ruleForm.a18);
};
// 邮政编码
const onVerifyPostalCode = (val: string) => {
	state.ruleForm.a19 = verifiyNumberInteger(val);
	state.postalCode = verifyPostalCode(state.ruleForm.a19);
};
// url
const onVerifyUrl = (val: string) => {
	state.ruleForm.a20 = verifyAndSpace(val);
	state.url = verifyUrl(state.ruleForm.a20);
};
// 车牌号
const onVerifyCarNum = (val: string) => {
	state.ruleForm.a21 = verifyAndSpace(val);
	state.carNum = verifyCarNum(state.ruleForm.a21);
};
</script>

<style scoped lang="scss">
.tools-warp-form {
	:deep(.el-form-item--small.el-form-item) {
		margin-bottom: 0 !important;
	}
	.tools-warp-form-msg {
		color: #666666;
		font-size: 14px;
		width: 100%;
		.tools-warp-form-msg-red {
			color: red;
		}
	}
	.tools-warp-form-msg + div {
		width: 100%;
	}
}
</style>
