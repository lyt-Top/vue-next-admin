const apiUrl = require("../../utils/api.js")
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navList: [],
    indexList: [],
    newArr: [],
    indexListParam: {
      channel: '头条',
      num: 10,
      start: 0
    },
    show: false,
    reachBottomText: '数据加载中...',
    reachBottomStatus: '',
    page: 0,
    isShowTopBtn: false,
    isPullDownRefresh: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 初始化数据
    this.getNavListData()
    this.getIndexList()
  },

  /**
   * 获取首页顶部导航组件数据
   */
  getNavListData() {
    let _this = this
    wx.request({
      url: apiUrl.navList,
      method: 'GET',
      success(res) {
        if (res.statusCode == 200) {
          let arr = _this.data.navList
          res.data.result.result.forEach(item => {
            _this.data.navList.push({
              name: item
            })
          })
          _this.setData({ navList: arr})
        }
      }
    })
  },

  /**
   * 首页顶部导航组件点击事件
   */
  onNavClick(e) {
    this.data.indexList = []
    this.data.indexListParam.channel = e.detail.param.name
    this.setData({
      show: false,
      reachBottomStatus: ''
    })
    this.getIndexList()
  },

  /**
   * 获取首页列表组件数据
   */
  getIndexList() {
    let _this = this
    wx.request({
      url: apiUrl.indexList,
      method: 'GET',
      data: {
        appkey: '33410aae7959efa885187ab6cebc9162',
        channel: this.data.indexListParam.channel,
        num: 10,
        start: this.data.indexListParam.start
      },
      success(res) {
        if (res.statusCode == 200) {
          _this.data.newArr = _this.data.indexList
          // 下拉刷新数组反转
          if (_this.data.isPullDownRefresh) {
            _this.data.newArr = _this.data.indexList.reverse()
          } else {
            _this.data.newArr.push(...res.data.result.result.list)
            _this.data.newArr = _this.data.indexList
          }
          // 下拉刷新关闭
          wx.stopPullDownRefresh()
          _this.setData({  })

          _this.setData({
            indexList: _this.data.newArr,
            reachBottomStatus: '',
            isPullDownRefresh: false
          })

          // 点击顶部导航，模拟无数据时背景图片的显示时长
          setTimeout(()=> {
            _this.setData({
              show: true
            })
          },300)
        }
      }
    })
  },

  /**
   * 首页列表数据点击
   */
  onListClick(e) {
    let _this = this
    wx.setStorage({
      key: 'indexListData',
      data: e.detail.param,
      success(res) {
        wx.navigateTo({
          url: `/pages/listDetails/listDetails?data=${e.detail.param.title}`
        })
      }
    })
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh () {
    this.getIndexList()
    this.setData({ isPullDownRefresh: true})
  },

  /**
   * 上拉加载更多
   */
  onReachBottom() {
    this.setData({reachBottomStatus: '0'})
    this.data.indexListParam.start = this.data.page++
    this.getIndexList()
  },

  /**
   * 返回顶部监听
   */
  onPageScroll(e) {
    e.scrollTop > 500 ? this.setData({ isShowTopBtn: true }) : this.setData({ isShowTopBtn: false })
  },

  /**
   * 返回顶部点击
   */
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  }
})
