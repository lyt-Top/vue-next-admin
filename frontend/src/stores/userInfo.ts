/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 09:39:08
 * @FilePath: \frontend\src\stores\userInfo.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { UserInfosStates } from './interface';
import { Session } from '/@/utils/storage';
import { getUserInfo } from '/@/api/login';
/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosStates => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			roleId: 0,
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				const userInfos: any = await this.getApiUserInfo();
				this.userInfos = userInfos;
			}
		},
		async getApiUserInfo() {
			return new Promise(async (resolve) => {
				const result = await getUserInfo();
				if (result.data.code === 200) {
					const userInfo = result.data.data.userInfo;
					const permission = result.data.data.permission;
					const userName = userInfo.UserName;
					Session.set('roleId', userInfo.RoleId);
					const userInfos = {
						userName: userName,
						photo: userInfo.Avatar,
						time: result.data.timespan, permission,
						authBtnList: permission,
						roleId: userInfo.RoleId
					};
					resolve(userInfos);
				}
			});
		},
	},
});
