import { Module } from 'vuex';
import { Session } from '/@/utils/storage';
import { UserInfosState, RootStateTypes } from '/@/store/interface/index';

const userInfosModule: Module<UserInfosState, RootStateTypes> = {
	namespaced: true,
	state: {
		userInfos: {
			authBtnList: [],
			photo: '',
			roles: [],
			time: 0,
			userName: '',
		},
	},
	mutations: {
		// 设置用户信息
		getUserInfos(state, data: any) {
			state.userInfos = data;
		},
	},
	actions: {
		// 设置用户信息
		async setUserInfos({ commit }, data: UserInfosState) {
			if (data) {
				commit('getUserInfos', data);
			} else {
				if (Session.get('userInfo')) commit('getUserInfos', Session.get('userInfo'));
			}
		},
	},
};

export default userInfosModule;
