import { Module } from 'vuex';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { RequestOldRoutesState, RootStateTypes } from '/@/store/interface/index';

const requestOldRoutesModule: Module<RequestOldRoutesState, RootStateTypes> = {
	namespaced: true,
	state: {
		requestOldRoutes: [],
	},
	mutations: {
		// 后端控制路由
		getBackEndControlRoutes(state: any, data: object) {
			state.requestOldRoutes = data;
		},
	},
	actions: {
		// 后端控制路由
		setBackEndControlRoutes({ commit }, routes: Array<string>) {
			commit('getBackEndControlRoutes', routes);
		},
	},
};

export default requestOldRoutesModule;
