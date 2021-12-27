<template>
	<el-form class="login-content-form">
		<el-form-item class="login-animation-one">
			<el-input type="text" placeholder="用户名 admin 或不输均为 test" v-model="state.ruleForm.userName" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><elementUser /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation-two">
			<el-input :type="state.isShowPassword ? 'text' : 'password'" placeholder="密码：123456" v-model="state.ruleForm.password" autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><elementUnlock /></el-icon>
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
		<el-form-item class="login-animation-three">
			<el-row :gutter="15">
				<el-col :span="16">
					<el-input type="text" maxlength="4" placeholder="请输入验证码" v-model="state.ruleForm.code" clearable autocomplete="off">
						<template #prefix>
							<el-icon class="el-input__icon"><elementPosition /></el-icon>
						</template>
					</el-input>
				</el-col>
				<el-col :span="8">
					<div class="login-content-code">
						<span class="login-content-code-img">1234</span>
					</div>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item class="login-animation-four">
			<el-button type="primary" class="login-content-submit" round @click="onSignIn" :loading="state.loading.signIn">
				<span>登 录</span>
			</el-button>
		</el-form-item>
		<el-form-item class="login-animation-five">
			<el-button type="text" size="small">第三方登录</el-button>
			<el-button type="text" size="small">友情链接</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup name="loginAccount">
import { ElMessage } from 'element-plus';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { initBackEndControlRoutes } from '/@/router/backEnd';
import { Session } from '/@/utils/storage';
import { formatAxis } from '/@/utils/formatTime';

const { proxy } = getCurrentInstance();
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
	let testAuthPageList = ['common'];
	// test 按钮权限标识
	let testAuthBtnList = ['btn.add', 'btn.link'];
	// 不同用户模拟不同的用户权限
	if (state.ruleForm.userName === 'admin') {
		defaultRoles = adminRoles;
		defaultAuthBtnList = adminAuthBtnList;
	} else {
		defaultRoles = testAuthPageList;
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
	setTimeout(() => {
		// 关闭 loading
		state.loading.signIn = true;
		ElMessage.success(`${currentTimeInfo}，欢迎回来！`);
		// 修复防止退出登录再进入界面时，需要刷新样式才生效的问题，初始化布局样式等(登录的时候触发，目前方案)
		proxy.mittBus.emit('onSignInClick');
	}, 300);
};
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;
	.login-animation-one,
	.login-animation-two,
	.login-animation-three,
	.login-animation-four,
	.login-animation-five {
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
	}
	.login-animation-four {
		animation-delay: 0.4s;
		margin-bottom: 5px;
	}
	.login-animation-five {
		animation-delay: 0.5s;
	}
	.login-content-password {
		display: inline-block;
		width: 25px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		display: flex;
		align-items: center;
		justify-content: space-around;
		.login-content-code-img {
			width: 100%;
			height: 40px;
			line-height: 40px;
			background-color: #ffffff;
			border: 1px solid rgb(220, 223, 230);
			color: #333;
			font-size: 16px;
			font-weight: 700;
			letter-spacing: 5px;
			text-indent: 5px;
			text-align: center;
			cursor: pointer;
			transition: all ease 0.2s;
			border-radius: 4px;
			user-select: none;
			&:hover {
				border-color: #c0c4cc;
				transition: all ease 0.2s;
			}
		}
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
</style>
