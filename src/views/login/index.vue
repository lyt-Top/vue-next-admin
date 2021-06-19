<template>
	<div class="login">
		<div class="login-weaper">
			<div class="login-left">
				<div class="login-time">{{ time.txt }}</div>
				<div class="login-left-box">
					<div>
						<div class="logo">{{ getThemeConfig.globalViceTitle }}</div>
						<h2 class="title">{{ getThemeConfig.globalViceDes }}</h2>
						<div class="msg">
							<div class="msg-author">
								<span>{{ quotations.name }}</span>
								<span>{{ quotations.comeFrom }}</span>
							</div>
							<div class="msg-txt">{{ quotations.content }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="login-right">
				<div class="login-main">
					<h4 class="login-title">{{ getThemeConfig.globalTitle }}</h4>
					<el-form class="el-form login-form">
						<el-form-item style="margin-left: 0px" prop="userName">
							<el-input
								type="text"
								:placeholder="$t('message.login.placeholder1')"
								prefix-icon="el-icon-user"
								v-model="ruleForm.userName"
								clearable
								autocomplete="off"
							>
							</el-input>
						</el-form-item>
						<el-form-item style="margin-left: 0px" prop="password">
							<el-input
								type="password"
								:placeholder="$t('message.login.placeholder2')"
								prefix-icon="el-icon-lock"
								v-model="ruleForm.password"
								autocomplete="off"
								:show-password="true"
							>
							</el-input>
						</el-form-item>
						<el-form-item style="margin-left: 0px" prop="code">
							<div class="el-row" span="24">
								<div class="el-col el-col-16">
									<el-input
										type="text"
										maxlength="4"
										:placeholder="$t('message.login.placeholder3')"
										prefix-icon="el-icon-position"
										v-model="ruleForm.code"
										clearable
										autocomplete="off"
									></el-input>
								</div>
								<div class="el-col el-col-8">
									<div class="login-code">
										<span class="login-code-img">1234</span>
									</div>
								</div>
							</div>
						</el-form-item>
						<el-form-item style="margin: 40px 0px 0">
							<el-button type="primary" class="login-submit" @click="submitForm" :loading="submit.loading">
								<span>{{ $t('message.login.btnText') }}</span>
							</el-button>
						</el-form-item>
					</el-form>
					<div class="login-menu">
						<a href="javascript:;">{{ $t('message.login.link.one1') }}</a>
						<a href="javascript:;">{{ $t('message.login.link.one2') }}</a>
					</div>
				</div>
			</div>
		</div>
		<div class="vue-particles">
			<vue-particles color="#dedede" shapeType="star" linesColor="#dedede" hoverMode="grab" clickMode="push" style="height: 100%"></vue-particles>
		</div>
	</div>
</template>

<script>
import { Session } from '@/utils/storage';
import { formatDate, formatAxis } from '@/utils/formatTime';
import { PrevLoading } from '@/utils/loading.js';
import { quotationsList } from './mock';
export default {
	name: 'login',
	data() {
		return {
			quotationsList,
			quotations: {},
			isView: false,
			submit: {
				loading: false,
			},
			ruleForm: {
				userName: 'admin',
				password: '123456',
				code: '1234',
			},
			time: {
				txt: '',
				fun: null,
			},
		};
	},
	computed: {
		// 获取当前时间
		currentTime() {
			return formatAxis(new Date());
		},
		// 获取布局配置信息
		getThemeConfig() {
			return this.$store.state.themeConfig.themeConfig;
		},
	},
	created() {
		this.initTime();
	},
	mounted() {
		this.initRandomQuotations();
	},
	methods: {
		// 随机语录
		initRandomQuotations() {
			this.quotations = this.quotationsList[Math.floor(Math.random() * this.quotationsList.length)];
		},
		// 初始化左上角时间显示
		initTime() {
			this.time.txt = formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS WWW QQQQ');
			this.time.fun = setInterval(() => {
				this.time.txt = formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS WWW QQQQ');
			}, 1000);
		},
		// 登录按钮点击
		submitForm() {
			let defaultAuthPageList = [];
			let defaultAuthBtnList = [];
			// admin 页面权限标识，对应路由 meta.auth
			let adminAuthPageList = ['admin'];
			// admin 按钮权限标识
			let adminAuthBtnList = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
			// test 页面权限标识，对应路由 meta.auth
			let testAuthPageList = ['test'];
			// test 按钮权限标识
			let testAuthBtnList = ['btn.add', 'btn.link'];
			if (this.ruleForm.userName === 'admin') {
				defaultAuthPageList = adminAuthPageList;
				defaultAuthBtnList = adminAuthBtnList;
			} else {
				defaultAuthPageList = testAuthPageList;
				defaultAuthBtnList = testAuthBtnList;
			}
			const userInfos = {
				userName: this.ruleForm.userName === 'admin' ? 'admin' : 'test',
				photo:
					this.ruleForm.userName === 'admin'
						? 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'
						: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg',
				time: new Date().getTime(),
				authPageList: defaultAuthPageList,
				authBtnList: defaultAuthBtnList,
			};
			// 存储 token 到浏览器缓存
			Session.set('token', Math.random().toString(36).substr(0));
			// 存储用户信息到浏览器缓存
			Session.set('userInfo', userInfos);
			// 存储用户信息到vuex
			this.$store.dispatch('userInfos/setUserInfos', userInfos);
			PrevLoading.start();
			window.location.href = `${window.location.origin}${window.location.pathname}`;
			setTimeout(() => {
				this.$message.success(`${this.currentTime}，${this.$t('message.login.signInText')}`);
			}, 300);
		},
	},
	destroyed() {
		clearInterval(this.time.fun);
	},
};
</script>

<style scoped lang="scss">
.login {
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	position: relative;
	.vue-particles {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(ellipse at top left, rgba(105, 155, 200, 1) 0%, rgba(181, 197, 216, 1) 57%);
	}
	.login-weaper {
		margin: auto;
		height: 500px;
		display: flex;
		box-sizing: border-box;
		position: relative;
		z-index: 1;
		border: none;
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
		.login-left {
			width: 491px;
			padding: 20px;
			font-size: 16px;
			color: #fff;
			position: relative;
			background-color: rgba(64, 158, 255, 0.8);
			display: flex;
			flex-direction: column;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
			.login-time {
				width: 100%;
				color: #fff;
				opacity: 0.9;
				font-size: 14px;
				overflow: hidden;
			}
			.login-left-box {
				flex: 1;
				overflow: hidden;
				position: relative;
				z-index: 1;
				display: flex;
				align-items: center;
				padding: 80px 45px;
				.logo {
					font-size: 22px;
					margin-bottom: 15px;
				}
				.title {
					color: #fff;
					font-weight: 300;
					letter-spacing: 2px;
					font-size: 16px;
				}
				.msg {
					color: #fff;
					font-size: 13px;
					margin-top: 35px;
					.msg-author {
						opacity: 0.6;
						span:last-of-type {
							margin-left: 15px;
						}
					}
					.msg-txt {
						margin-top: 15px;
						line-height: 22px;
					}
				}
			}
		}
		.login-right {
			width: 491px;
			padding: 20px;
			position: relative;
			align-items: center;
			display: flex;
			background-color: rgba(255, 255, 255, 1);
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
			.login-main {
				margin: 0 auto;
				width: 70%;
				.login-title {
					color: #333;
					margin-bottom: 40px;
					font-weight: 500;
					font-size: 22px;
					text-align: center;
					letter-spacing: 4px;
				}
				.login-form {
					margin: 10px 0;
					i {
						color: #333;
					}
					.el-form-item {
						margin-bottom: 20px !important;
						.login-code {
							display: flex;
							align-items: center;
							justify-content: space-around;
							margin: 0 0 0 10px;
							user-select: none;
							.login-code-img {
								margin-top: 2px;
								width: 100px;
								height: 38px;
								border: 1px solid #dcdfe6;
								color: #333;
								font-size: 14px;
								font-weight: 700;
								letter-spacing: 5px;
								line-height: 38px;
								text-indent: 5px;
								text-align: center;
								cursor: pointer;
								transition: all ease 0.2s;
								border-radius: 4px;
								&:hover {
									border-color: #c0c4cc;
									transition: all ease 0.2s;
								}
							}
						}
						.login-submit {
							width: 100%;
							height: 45px;
							letter-spacing: 2px;
							font-weight: 300;
						}
					}
				}
				.login-menu {
					margin-top: 30px;
					width: 100%;
					text-align: left;
					a {
						color: #999;
						font-size: 12px;
						margin: 0 8px;
						text-decoration: none;
						&:hover {
							color: #1e9fff;
							text-decoration: underline;
						}
					}
				}
			}
		}
	}
}
</style>
