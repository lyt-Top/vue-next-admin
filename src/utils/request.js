import store from '@/store';
import router, { resetRouter } from '@/router/index';
import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { Session } from '@/utils/storage';

// 创建 axios 实例
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么 token
		if (Session.get('token')) {
			config.headers.common['Authorization'] = `${Session.get('token')}`;
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
		if (res.code && res.code !== 0) {
			// `token` 过期或者账号已在别处登录
			if (res.code === 401 || res.code === 4001) {
				// 清除浏览器全部临时缓存
				Session.clear();
				router.push('/login');
				store.commit('setMenuData', {});
				resetRouter(); // 重置路由
				MessageBox.alert('你已被登出，请重新登录', '提示', {})
					.then(() => {})
					.catch(() => {});
			}
			return Promise.reject(service.interceptors.response.error);
		} else {
			return response.data;
		}
	},
	(error) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			Message.error('网络超时');
		} else if (error.message == 'Network Error') {
			Message.error('网络连接错误');
		} else {
			Message.error(error.response.data.message);
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
