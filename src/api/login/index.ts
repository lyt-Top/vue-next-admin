import request from '/@/utils/request';

/**
 * 用户登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function signIn(params: object) {
	return request({
		url: '/user/signIn',
		method: 'post',
		data: params,
	});
}

/**
 * 用户退出登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function signOut(params: object) {
	return request({
		url: '/user/signOut',
		method: 'post',
		data: params,
	});
}
