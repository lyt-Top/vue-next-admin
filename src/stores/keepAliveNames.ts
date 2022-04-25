import { defineStore } from 'pinia';
import { KeepAliveNamesState } from './interface';

/**
 * 路由缓存列表
 * @methods setCacheKeepAlive 设置要缓存的路由 names
 */
export const useKeepALiveNames = defineStore('keepALiveNames', {
	state: (): KeepAliveNamesState => ({
		keepAliveNames: [],
	}),
	actions: {
		async setCacheKeepAlive(data: Array<string>) {
			this.keepAliveNames = data;
		},
	},
});
