<template>
	<div class="login-container">
		<div class="login-logo">
			<span>{{ getThemeConfig.globalViceTitle }}</span>
		</div>
		<div class="login-content">
			<div class="login-content-main">
				<h4 class="login-content-title">{{ getThemeConfig.globalTitle }}后台模板</h4>
				<div v-if="!isScan">
					<el-tabs v-model="tabsActiveName">
						<el-tab-pane :label="$t('message.label.one1')" name="account">
							<Account />
						</el-tab-pane>
						<el-tab-pane :label="$t('message.label.two2')" name="mobile">
							<Mobile />
						</el-tab-pane>
					</el-tabs>
				</div>
				<Scan v-if="isScan" />
				<div class="login-content-main-sacn" @click="isScan = !isScan">
					<i class="iconfont" :class="isScan ? 'icon-diannao1' : 'icon-barcode-qr'"></i>
					<div class="login-content-main-sacn-delta"></div>
				</div>
			</div>
		</div>
		<div class="login-copyright">
			<div class="mb5 login-copyright-company">{{ $t('message.copyright.one5') }}</div>
			<div class="login-copyright-msg">{{ $t('message.copyright.two6') }}</div>
		</div>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, computed } from 'vue';
import Account from '/@/views/login/component/account.vue';
import Mobile from '/@/views/login/component/mobile.vue';
import Scan from '/@/views/login/component/scan.vue';
import { useStore } from '/@/store/index';
export default {
	name: 'loginIndex',
	components: { Account, Mobile, Scan },
	setup() {
		const store = useStore();
		const state = reactive({
			tabsActiveName: 'account',
			isTabPaneShow: true,
			isScan: false,
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		return {
			getThemeConfig,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.login-container {
	width: 100%;
	height: 100%;
	background: url('https://gitee.com/lyt-top/vue-next-admin-images/raw/master/login/bg-login.png') no-repeat;
	background-size: 100% 100%;
	.login-logo {
		position: absolute;
		top: 30px;
		left: 50%;
		height: 50px;
		display: flex;
		align-items: center;
		font-size: 20px;
		color: var(--color-primary);
		letter-spacing: 2px;
		width: 90%;
		transform: translateX(-50%);
	}
	.login-content {
		width: 500px;
		padding: 20px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) translate3d(0, 0, 0);
		background-color: rgba(255, 255, 255, 0.99);
		border: 5px solid var(--color-primary-light-8);
		border-radius: 4px;
		transition: all 0.3s ease;
		overflow: hidden;
		z-index: 1;
		.login-content-main {
			margin: 0 auto;
			width: 80%;
			.login-content-title {
				color: #333;
				font-weight: 500;
				font-size: 22px;
				text-align: center;
				letter-spacing: 4px;
				margin: 15px 0 30px;
				white-space: nowrap;
				z-index: 5;
				position: relative;
				transition: all 0.3s ease;
			}
		}
		.login-content-main-sacn {
			position: absolute;
			top: 0;
			right: 0;
			width: 50px;
			height: 50px;
			overflow: hidden;
			cursor: pointer;
			transition: all ease 0.3s;
			&-delta {
				position: absolute;
				width: 35px;
				height: 70px;
				z-index: 2;
				top: 2px;
				right: 21px;
				background: var(--el-color-white);
				transform: rotate(-45deg);
			}
			&:hover {
				opacity: 1;
				transition: all ease 0.3s;
				color: var(--color-primary);
			}
			i {
				width: 47px;
				height: 50px;
				display: inline-block;
				font-size: 48px;
				position: absolute;
				right: 2px;
				top: -1px;
			}
		}
	}
	.login-copyright {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 30px;
		text-align: center;
		color: var(--color-whites);
		font-size: 12px;
		opacity: 0.8;
		.login-copyright-company {
			white-space: nowrap;
		}
		.login-copyright-msg {
			@extend .login-copyright-company;
		}
	}
}
</style>
