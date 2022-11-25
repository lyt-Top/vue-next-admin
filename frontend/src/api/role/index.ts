/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 21:35:46
 * @FilePath: \tsplatform\frontend\src\api\menu\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '/@/utils/request';

export function getPage(params: object) {
	return request({
		url: '/role/getPage',
		method: 'get',
		params
	});
}
export function getList(params: object) {
	return request({
		url: '/role/getList',
		method: 'get',
		params
	});
}
export function add(params: object) {
	return request({
		url: '/role/add',
		method: 'post',
		data: params
	});
}
export function edit(params: object) {
	return request({
		url: '/role/edit',
		method: 'post',
		data: params
	});
}
export function del(params: object) {
	return request({
		url: '/role/del',
		method: 'post',
		data: params
	});
}
export function setStatus(params: object) {
	return request({
		url: '/role/setStatus',
		method: 'post',
		data: params
	});
}