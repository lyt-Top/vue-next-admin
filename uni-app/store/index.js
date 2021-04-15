import Vue from 'vue'
import Vuex from 'vuex'
import usersInfo from './modules/my/userInfo'
import tabssList from './modules/my/tabsList'
import tablesList from './modules/my/tableList'
import indexsNavList from './modules/index/navList'
import indexsTellList from './modules/index/tellList'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		usersInfo,
		tabssList,
		tablesList,
		indexsNavList,
		indexsTellList
	},
	getters
})

export default store
