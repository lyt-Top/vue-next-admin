const getters = {
	usersInfo: state => state.userInfoStatus.userInfo,
	tabssList: state => state.tabsList.list,
	tablesList: state => state.tableList.list,
	indexsNavList: state => state.indexNavList.list,
	indexsTellList: state => state.indexTellList.list,
}

export default getters
