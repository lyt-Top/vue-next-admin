// 用户登录信息
const userInfoStatus = {
	state: {
		info: {
			photo: '../../static/my/user.png',
			name: 'web前端工程师',
			isRenz: '去认证',
			badge: 7
		}
	},
	mutations: {
		getUserInfo: (state, obj) => {
			obj == '' ? state.info = state.info : state.info = obj
		}
	},
	actions: {
		setUserInfo(context, obj) {
			context.commit('getUserInfo', obj)
		}
	}
}

export default userInfoStatus
