import { Module } from 'vuex';

const keepAliveNamesModule: Module<KeepAliveNamesState, RootStateTypes> = {
	namespaced: true,
	state: {
		keepAliveNames: [],
	},
	mutations: {
		// 设置路由缓存（name字段）
		getCacheKeepAlive(state: any, data: Array<string>) {
			state.keepAliveNames = data;
		},
	},
	actions: {
		// 设置路由缓存（name字段）
		async setCacheKeepAlive({ commit }, data: Array<string>) {
			commit('getCacheKeepAlive', data);
		},
	},
};

export default keepAliveNamesModule;
