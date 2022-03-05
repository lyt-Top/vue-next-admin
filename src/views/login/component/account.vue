<template>
	<el-form size="large" class="login-content-form">
		<el-form-item class="login-animation1">
			<el-input type="text" placeholder="用户名 admin 或不输均为 common" v-model="state.ruleForm.userName" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input :type="state.isShowPassword ? 'text' : 'password'" placeholder="密码：123456" v-model="state.ruleForm.password" autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
				</template>
				<template #suffix>
					<i
						class="iconfont el-input__icon login-content-password"
						:class="state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="state.isShowPassword = !state.isShowPassword"
					>
					</i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation3">
			<el-col :span="15">
				<el-input type="text" maxlength="4" placeholder="请输入验证码" v-model="state.ruleForm.code" clearable autocomplete="off">
					<template #prefix>
						<el-icon class="el-input__icon"><ele-Position /></el-icon>
					</template>
				</el-input>
			</el-col>
			<el-col :span="1"></el-col>
			<el-col :span="8">
				<el-button class="login-content-code">1234</el-button>
			</el-col>
		</el-form-item>
		<el-form-item class="login-animation4">
			<el-button type="primary" class="login-content-submit" round @click="onSignIn" :loading="state.loading.signIn">
				<span>登 录</span>
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup name="loginAccount">
import { ElMessage } from 'element-plus';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { initBackEndControlRoutes } from '/@/router/backEnd';
import { Session } from '/@/utils/storage';
import { formatAxis } from '/@/utils/formatTime';

const store = useStore();
const route = useRoute();
const router = useRouter();
const state = reactive({
	isShowPassword: false,
	ruleForm: {
		userName: 'admin',
		password: '123456',
		code: '1234',
	},
	loading: {
		signIn: false,
	},
});
// 时间获取
const currentTime = computed(() => {
	return formatAxis(new Date());
});
// 登录
const onSignIn = async () => {
	// 模拟数据
	state.loading.signIn = true;
	let defaultRoles = [];
	let defaultAuthBtnList = [];
	// admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
	let adminRoles = ['admin'];
	// admin 按钮权限标识
	let adminAuthBtnList = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
	// test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
	let testRoles = ['common'];
	// test 按钮权限标识
	let testAuthBtnList = ['btn.add', 'btn.link'];
	// 不同用户模拟不同的用户权限
	if (state.ruleForm.userName === 'admin') {
		defaultRoles = adminRoles;
		defaultAuthBtnList = adminAuthBtnList;
	} else {
		defaultRoles = testRoles;
		defaultAuthBtnList = testAuthBtnList;
	}
	// 用户信息模拟数据
	const userInfos = {
		userName: state.ruleForm.userName,
		photo:
			state.ruleForm.userName === 'admin'
				? 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'
				: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg',
		time: new Date().getTime(),
		roles: defaultRoles,
		authBtnList: defaultAuthBtnList,
	};
	// 存储 token 到浏览器缓存
	Session.set('token', Math.random().toString(36).substr(0));
	// 存储用户信息到浏览器缓存
	Session.set('userInfo', userInfos);
	// 1、请注意执行顺序(存储用户信息到vuex)
	store.dispatch('userInfos/setUserInfos', userInfos);
	if (!store.state.themeConfig.themeConfig.isRequestRoutes) {
		// 前端控制路由，2、请注意执行顺序
		await initFrontEndControlRoutes();
		signInSuccess();
	} else {
		// 模拟后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
		// 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
		await initBackEndControlRoutes();
		// 执行完 initBackEndControlRoutes，再执行 signInSuccess
		signInSuccess();
	}
};
// 登录成功后的跳转
const signInSuccess = () => {
	// 初始化登录成功时间问候语
	let currentTimeInfo = currentTime.value;
	// 登录成功，跳到转首页
	// 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
	// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
	if (route.query?.redirect) {
		router.push({
			path: route.query?.redirect,
			query: Object.keys(route.query?.params).length > 0 ? JSON.parse(route.query?.params) : '',
		});
	} else {
		router.push('/');
	}
	// 登录成功提示
	// 关闭 loading
	state.loading.signIn = true;
	const signInText = '欢迎回来！';
	ElMessage.success(`${currentTimeInfo}，${signInText}`);
};
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;
	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
		}
	}
	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
		font-weight: bold;
		letter-spacing: 5px;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
</style>
