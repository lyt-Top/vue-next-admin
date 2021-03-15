import { Module } from 'vuex';

const tagsViewRoutesModule: Module<TagsViewRoutesState, RootStateTypes> = {
	namespaced: true,
	state: {
		tagsViewRoutes: [],
	},
	mutations: {
		// 设置 TagsView 路由
		getTagsViewRoutes(state: any, data: Array<string>) {
			state.tagsViewRoutes = data;
		},
	},
	actions: {
		// 设置 TagsView 路由
		async setTagsViewRoutes({ commit }, data: Array<string>) {
			commit('getTagsViewRoutes', data);
		},
	},
};

export default tagsViewRoutesModule;
