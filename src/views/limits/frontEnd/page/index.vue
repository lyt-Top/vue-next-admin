<template>
	<div>
		<el-alert
			title="温馨提示：此权限页面代码及效果只作为演示使用，若出现不可逆转的bug，请尝试 `F5` 刷新页面。若实际项目中非要实现此用户权限切换功能，
      请在切换方法 `onRadioChange` 最后面添加刷新代码 `window.location.reload()`。 请注意：按钮权限页面中的演示2（指令模式）、演示3（函数模式）
      切换用户时无法动态演示，想要动态演示，请按 `F5` 或者添加 `window.location.reload()`。"
			type="warning"
			:closable="false"
		></el-alert>
		<el-alert
			:title="`当前用户页面权限：[${getRoles}]，当前用户按钮权限：[${getAuthBtnList}]`"
			type="success"
			:closable="false"
			class="mt15"
		></el-alert>
		<el-card shadow="hover" header="切换用户演示，前端控制不同用户显示不同页面、按钮权限" class="mt15">
			<el-radio-group v-model="userAuth" size="default" @change="onRadioChange">
				<el-radio-button label="admin"></el-radio-button>
				<el-radio-button label="common"></el-radio-button>
			</el-radio-group>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, onMounted, defineComponent } from 'vue';
import { useStore } from '/@/store/index';
import { resetRoute, setAddRoute, setFilterMenuAndCacheTagsViewRoutes } from '/@/router/index';
import { Session } from '/@/utils/storage';
export default defineComponent({
	name: 'limitsFrontEndPage',
	setup() {
		const store = useStore();
		const state = reactive({
			val: '',
			userAuth: '',
		});
		// 获取用户页面权限信息
		const getRoles = computed(() => {
			return store.state.userInfos.userInfos.roles;
		});
		// 获取用户按钮权限信息
		const getAuthBtnList = computed(() => {
			return store.state.userInfos.userInfos.authBtnList;
		});
		// 初始化用户权限
		const initUserAuth = () => {
			state.userAuth = store.state.userInfos.userInfos.roles[0];
		};
		// 用户权限改变时
		const onRadioChange = async () => {
			// 模拟数据
			resetRoute();
			let defaultRoles: string[] = [];
			let defaultAuthBtnList: string[] = [];
			// admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
			let adminRoles: string[] = ['admin'];
			// admin 按钮权限标识
			let adminAuthBtnList: string[] = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
			// test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
			let testRoles: string[] = ['common'];
			// test 按钮权限标识
			let testAuthBtnList: string[] = ['btn.add', 'btn.link'];
			// 不同用户模拟不同的用户权限
			if (state.userAuth === 'admin') {
				defaultRoles = adminRoles;
				defaultAuthBtnList = adminAuthBtnList;
			} else {
				defaultRoles = testRoles;
				defaultAuthBtnList = testAuthBtnList;
			}
			const userInfos = {
				userName: state.userAuth,
				photo:
					state.userAuth === 'admin'
						? 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'
						: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg',
				time: new Date().getTime(),
				roles: defaultRoles,
				authBtnList: defaultAuthBtnList,
			};
			Session.set('userInfo', userInfos);
			store.dispatch('userInfos/setUserInfos', userInfos); // 请注意执行顺序(存储用户信息vuex)
			await setAddRoute();
			setFilterMenuAndCacheTagsViewRoutes();
		};
		// 页面加载时
		onMounted(() => {
			initUserAuth();
		});
		return {
			getRoles,
			getAuthBtnList,
			onRadioChange,
			...toRefs(state),
		};
	},
});
</script>
