const requestOldRoutesModule = {
	namespaced: true,
	state: {
		requestOldRoutes: [],
	},
	mutations: {
		// 后端控制路由
		getBackEndControlRoutes(state, data) {
			state.requestOldRoutes = data;
		},
	},
	actions: {
		// 后端控制路由
		setBackEndControlRoutes({ commit }, routes) {
			commit('getBackEndControlRoutes', routes);
		},
	},
};

export default requestOldRoutesModule;
