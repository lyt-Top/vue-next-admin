import { Module } from 'vuex';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { TagsViewRoutesState, RootStateTypes } from '/@/store/interface/index';

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
