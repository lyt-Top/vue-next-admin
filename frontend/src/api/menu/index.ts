/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 00:24:11
 * @FilePath: \tsplatform\frontend\src\api\menu\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '/@/utils/request';
export function getAuthMenu(params: object) {
	return request({
		url: '/menu/getAuthMenuTree',
		method: 'get',
		params,
	});
}
export function getMenuTree(params: object) {
	return request({
		url: '/menu/getMenuTree',
		method: 'get',
		params,
	});
}
export function add(params: object) {
	return request({
		url: '/menu/add',
		method: 'post',
		data: params
	});
}
export function edit(params: object) {
	return request({
		url: '/menu/edit',
		method: 'post',
		data: params
	});
}
export function del(params: object) {
	return request({
		url: '/menu/del',
		method: 'post',
		data: params
	});
}
export function setStatus(params: object) {
	return request({
		url: '/menu/setStatus',
		method: 'post',
		data: params
	});
}
