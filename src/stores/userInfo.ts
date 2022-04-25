import { defineStore } from 'pinia';
import { UserInfosStates, UserInfosState } from './interface';
import { Session } from '/@/utils/storage';

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosStates => ({
		userInfos: {
			authBtnList: [],
			photo: '',
			roles: [],
			time: 0,
			userName: '',
		},
	}),
	actions: {
		async setUserInfos(data?: UserInfosState) {
			if (data) {
				this.userInfos = <any>data;
			} else {
				if (Session.get('userInfo')) {
					this.userInfos = Session.get('userInfo');
				}
			}
		},
	},
});
