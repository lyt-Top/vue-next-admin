import request from '/@/utils/request';

/**
 * 用户登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 */
export function useLoginApi() {
	return {
		signIn: (params) => {
			return request({
				url: '/user/signIn',
				method: 'post',
				data: params,
			});
		},
		signOut: (params) => {
			return request({
				url: '/user/signOut',
				method: 'post',
				data: params,
			});
		},
	};
}