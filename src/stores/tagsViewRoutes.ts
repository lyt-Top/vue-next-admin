import { defineStore } from 'pinia';
import { TagsViewRoutesState } from './interface';
import { Session } from '/@/utils/storage';

// TagsView 路由列表
export const useTagsViewRoutes = defineStore('tagsViewRoutes', {
	state: (): TagsViewRoutesState => ({
		tagsViewRoutes: [],
		isTagsViewCurrenFull: false,
	}),
	actions: {
		async setTagsViewRoutes(data: Array<string>) {
			this.tagsViewRoutes = data;
		},
		setCurrenFullscreen(bool: Boolean) {
			Session.set('isTagsViewCurrenFull', bool);
			this.isTagsViewCurrenFull = bool;
		},
	},
});
