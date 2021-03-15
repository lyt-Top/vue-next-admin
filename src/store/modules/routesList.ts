import { Module } from 'vuex';

const routesListModule: Module<RoutesListState, RootStateTypes> = {
	namespaced: true,
	state: {
		routesList: [],
	},
	mutations: {
		// 设置路由，菜单中使用到
		getRoutesList(state: any, data: Array<object>) {
			state.routesList = data;
		},
	},
	actions: {
		// 设置路由，菜单中使用到
		async setRoutesList({ commit }, data: any) {
			commit('getRoutesList', data);
		},
	},
};

export default routesListModule;
