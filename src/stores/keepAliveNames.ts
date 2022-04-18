import { defineStore } from 'pinia';
import { KeepAliveNamesState } from './interface';

// 路由缓存列表
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
