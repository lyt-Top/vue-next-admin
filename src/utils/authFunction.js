import { store } from '/@/store/index';
import { judementSameArr } from '/@/utils/arrayOperation';

/**
 * 单个权限验证
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auth(value) {
	return store.state.userInfos.userInfos.authBtnList.some((v) => v === value);
}

/**
 * 多个权限验证，满足一个则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auths(value) {
	let flag = false;
	store.state.userInfos.userInfos.authBtnList.map((val) => {
		value.map((v) => {
			if (val === v) flag = true;
		});
	});
	return flag;
}

/**
 * 多个权限验证，全部满足则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function authAll(value) {
	return judementSameArr(value, store.state.userInfos.userInfos.authBtnList);
}
