import { getSession } from '@/utils/storage.js';

const userInfosModule = {
	namespaced: true,
	state: {
		userInfos: {},
	},
	mutations: {
		// 设置用户信息
		getUserInfos(state, data) {
			state.userInfos = data;
		},
	},
	actions: {
		// 设置用户信息
		async setUserInfos({ commit }, data) {
			if (data) {
				commit('getUserInfos', data);
			} else {
				if (getSession('userInfo')) commit('getUserInfos', getSession('userInfo'));
			}
		},
	},
};

export default userInfosModule;
