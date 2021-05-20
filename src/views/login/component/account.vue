<template>
	<el-form class="login-content-form">
		<el-form-item>
			<el-input
				type="text"
				:placeholder="$t('message.account.accountPlaceholder1')"
				prefix-icon="el-icon-user"
				v-model="ruleForm.userName"
				clearable
				autocomplete="off"
			>
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-input
				type="password"
				:placeholder="$t('message.account.accountPlaceholder2')"
				prefix-icon="el-icon-lock"
				v-model="ruleForm.password"
				autocomplete="off"
				show-password
			>
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-row :gutter="15">
				<el-col :span="16">
					<el-input
						type="text"
						maxlength="4"
						:placeholder="$t('message.account.accountPlaceholder3')"
						prefix-icon="el-icon-position"
						v-model="ruleForm.code"
						clearable
						autocomplete="off"
					></el-input>
				</el-col>
				<el-col :span="8">
					<div class="login-content-code">
						<span class="login-content-code-img">1234</span>
					</div>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" class="login-content-submit" round @click="onSignIn" :loading="loading.signIn">
				<span>{{ $t('message.account.accountBtnText') }}</span>
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { initAllFun, initBackEndControlRoutesFun } from '/@/router/index.ts';
import { useStore } from '/@/store/index.ts';
import { setSession } from '/@/utils/storage.ts';
import { formatAxis } from '/@/utils/formatTime.ts';
export default defineComponent({
	name: 'login',
	setup() {
		const { t } = useI18n();
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
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
			state.loading.signIn = true;
			let defaultAuthPageList: Array<string> = [];
			let defaultAuthBtnList: Array<string> = [];
			// admin 页面权限标识，对应路由 meta.auth
			let adminAuthPageList: Array<string> = ['admin'];
			// admin 按钮权限标识
			let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
			// test 页面权限标识，对应路由 meta.auth
			let testAuthPageList: Array<string> = ['test'];
			// test 按钮权限标识
			let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];
			if (state.ruleForm.userName === 'admin') {
				defaultAuthPageList = adminAuthPageList;
				defaultAuthBtnList = adminAuthBtnList;
			} else {
				defaultAuthPageList = testAuthPageList;
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
				authPageList: defaultAuthPageList,
				authBtnList: defaultAuthBtnList,
			};
			// 存储 token 到浏览器缓存
			setSession('token', Math.random().toString(36).substr(0));
			// 存储用户信息到浏览器缓存
			setSession('userInfo', userInfos);
			// 1、请注意执行顺序(存储用户信息到vuex)
			store.dispatch('userInfos/setUserInfos', userInfos);
			if (!store.state.themeConfig.themeConfig.isRequestRoutes) {
				// 前端控制路由，2、请注意执行顺序
				await initAllFun();
				signInSuccess();
			} else {
				// 模拟后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
				// 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
				await initBackEndControlRoutesFun();
				// 执行完 initBackEndControlRoutesFun，再执行 signInSuccess
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
			route.query?.redirect ? router.push(route.query.redirect) : router.push('/');
			// 登录成功提示
			setTimeout(() => {
				// 关闭 loading
				state.loading.signIn = true;
				const signInText = t('message.signInText');
				ElMessage.success(`${currentTimeInfo}，${signInText}`);
			}, 300);
		};
		return {
			currentTime,
			onSignIn,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;
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
