const routesListModule = {
	namespaced: true,
	state: {
		routesList: [],
		isColumnsMenuHover: false,
		isColumnsNavHover: false,
	},
	mutations: {
		// 设置路由，菜单中使用到
		getRoutesList(state, data) {
			state.routesList = data;
		},
		// 设置分栏布局，鼠标是否移入移出（菜单）
		getColumnsMenuHover(state, bool) {
			state.isColumnsMenuHover = bool;
		},
		// 设置分栏布局，鼠标是否移入移出（导航）
		getColumnsNavHover(state, bool) {
			state.isColumnsNavHover = bool;
		},
	},
	actions: {
		// 设置路由，菜单中使用到
		async setRoutesList({ commit }, data) {
			commit('getRoutesList', data);
		},
		// 设置分栏布局，鼠标是否移入移出（菜单）
		async setColumnsMenuHover({ commit }, bool) {
			commit('getColumnsMenuHover', bool);
		},
		// 设置分栏布局，鼠标是否移入移出（菜单）
		async setColumnsNavHover({ commit }, bool) {
			commit('getColumnsNavHover', bool);
		},
	},
};

export default routesListModule;
