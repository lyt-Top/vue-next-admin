/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 17:01:13
 * @FilePath: \tsplatform\frontend\src\api\login\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '/@/utils/request';

/**
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 */
export function signIn(params: object) {
	return request({
		url: '/auth/login',
		method: 'post',
		data: params,
	});
}
export function getUserInfo() {
	return request({
		url: '/auth/getUserInfo',
		method: 'get'
	});
}
export function signOut() {
	return request({
		url: '/auth/loginOut',
		method: 'get'
	});
}
