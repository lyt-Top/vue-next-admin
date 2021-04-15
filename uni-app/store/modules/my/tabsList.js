// 用户订单等信息
const tabsList = {
	state: {
		list: [{
				value: '05',
				title: '我的船盘'
			},
			{
				value: '01',
				title: '我的货盘'
			},
			{
				value: '03',
				title: '我的订单'
			}
		],
	},
	mutations: {
		getTabsList: (state, Arr) => {
			Arr.length <= 0 ? state.list = state.list : state.list = Arr
		}
	},
	actions: {
		setTabsList(context, Arr) {
			context.commit('getTabsList', Arr)
		}
	}
}

export default tabsList
