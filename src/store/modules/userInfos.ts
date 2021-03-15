import { Module } from 'vuex';
import { getSession } from '/@/utils/storage.ts';

const userInfosModule: Module<UserInfosState, RootStateTypes> = {
	namespaced: true,
	state: {
		userInfos: {},
	},
	mutations: {
		// 设置用户信息
		getUserInfos(state: any, data: object) {
			state.userInfos = data;
		},
	},
	actions: {
		// 设置用户信息
		async setUserInfos({ commit }, data: object) {
			if (data) {
				commit('getUserInfos', data);
			} else {
				if (getSession('userInfo')) commit('getUserInfos', getSession('userInfo'));
			}
		},
	},
};

export default userInfosModule;
