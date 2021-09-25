import { Module } from 'vuex';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { RoutesListState, RootStateTypes } from '/@/store/interface/index';

const routesListModule: Module<RoutesListState, RootStateTypes> = {
	namespaced: true,
	state: {
		routesList: [],
		isColumnsMenuHover: false,
		isColumnsNavHover: false,
	},
	mutations: {
		// 设置路由，菜单中使用到
		getRoutesList(state: any, data: Array<object>) {
			state.routesList = data;
		},
		// 设置分栏布局，鼠标是否移入移出（菜单）
		getColumnsMenuHover(state: any, bool: Boolean) {
			state.isColumnsMenuHover = bool;
		},
		// 设置分栏布局，鼠标是否移入移出（导航）
		getColumnsNavHover(state: any, bool: Boolean) {
			state.isColumnsNavHover = bool;
		},
	},
	actions: {
		// 设置路由，菜单中使用到
		async setRoutesList({ commit }, data: any) {
			commit('getRoutesList', data);
		},
		// 设置分栏布局，鼠标是否移入移出（菜单）
		async setColumnsMenuHover({ commit }, bool: Boolean) {
			commit('getColumnsMenuHover', bool);
		},
		// 设置分栏布局，鼠标是否移入移出（菜单）
		async setColumnsNavHover({ commit }, bool: Boolean) {
			commit('getColumnsNavHover', bool);
		},
	},
};

export default routesListModule;
