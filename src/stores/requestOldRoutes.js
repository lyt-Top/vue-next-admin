import { defineStore } from 'pinia';

/**
 * 后端返回原始路由(未处理时)
 * @methods setCacheKeepAlive 设置接口原始路由数据
 */
export const useRequestOldRoutes = defineStore('requestOldRoutes', {
	state: () => ({
		requestOldRoutes: [],
	}),
	actions: {
		async setRequestOldRoutes(routes) {
			this.requestOldRoutes = routes;
		},
	},
});
