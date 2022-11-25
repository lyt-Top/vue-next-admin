/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-22 20:39:54
 * @FilePath: \tsplatform\frontend\src\utils\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Session } from '/@/utils/storage';
// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL as any,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
});


// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么 token
		if (Session.get('token')) {
			(<any>config.headers)['Authorization'] = `${Session.get('token')}`;
		}
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		const res = response.data;
		if (res.code && res.code !== 200) {
			ElMessage.error(res.data || res.msg);
		}
		return response;
	},
	(error) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessageBox.alert('网络超时，请重新登录', '提示', {
				confirmButtonText: 'OK',
				showClose: false,
				type: 'error',

			}).then(() => {
				Session.clear(); // 清除浏览器全部临时缓存
				window.location.href = '/'; // 去登录页
			}).catch(() => { });
		} else if (error.message == 'Network Error') {
			ElMessageBox.alert('网络连接错误，请重新登录', '提示', {
				confirmButtonText: 'OK',
				showClose: false,
				type: 'error',

			}).then(() => {
				Session.clear(); // 清除浏览器全部临时缓存
				window.location.href = '/'; // 去登录页
			}).catch(() => { });
		} else {
			if (error.response.data) {
				// HTTPSTATUS：400为参数校验失败，弹出提示即可
				if (error.response.data.statusCode === 400) {
					ElMessageBox.alert(error.response.data.message.toString(), '提示', {
						confirmButtonText: 'OK',
						showClose: false,
						type: 'error',
					}).then(() => {
						window.location.reload();
					}).catch(() => { });
				} else {
					// HTTPSTATUS：401/500等状态码处理
					ElMessageBox.alert('网络连接错误，请重新登录', '提示', {
						confirmButtonText: 'OK',
						showClose: false,
						type: 'error',

					}).then(() => {
						Session.clear(); // 清除浏览器全部临时缓存
						window.location.href = '/'; // 去登录页
					}).catch(() => { });
				}
			}
			else {
				ElMessage.error(error.message);
			}
		}

		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
