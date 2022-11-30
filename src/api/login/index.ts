import request from '/@/utils/request';

/**
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 */
export function useLoginApi() {
	return {
		signIn: (params: object) => {
			return request.post('/user/signIn', params);
		},
		signOut: (params: object) => {
			return request.post('/user/signOut', params);
		},
	};
}
