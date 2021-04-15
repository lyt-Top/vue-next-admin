// pages/video/video.js
const apiUrl = require("../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    videoList: [],
    newArr: [],
    navId: '-1',
    isShowList: false,
    isPullDownRefresh: false
  },

  onLoad: function() {
    this.getNavListData()
    this.getVideoList()
  },

  /**
   * 获取首页顶部导航组件数据
   */
  getNavListData() {
    let _this = this
    wx.request({
      url: apiUrl.navVideo,
      method: 'GET',
      success(res) {
        if (res.statusCode == 200) {
          _this.setData({
            navList: res.data.result
          })
        }
      }
    })
  },

  /**
   * 视频顶部导航组件点击事件
   */
  onNavClick(e) {
    this.data.videoList = []
    this.setData({ isShowList: false})
    this.setData({ navId: e.detail.param.id})
    this.getVideoList()
  },

  /**
   * 获取视频列表组件数据
   */
  getVideoList() {
    let _this = this
    wx.request({
      url: apiUrl.videoList,
      method: 'GET',
      data: {
        id: _this.data.navId
      },
      success(res) {
        if (res.statusCode == 200) {
          _this.data.newArr = _this.data.videoList
          // 下拉刷新数组反转
          if (_this.data.isPullDownRefresh) {
            _this.data.newArr = _this.data.videoList.reverse()
          } else {
            _this.data.newArr.push(...res.data.result)
            _this.data.newArr = _this.data.videoList
          }
          // 赋值
          _this.setData({videoList: _this.data.newArr})
         
          // 下拉刷新关闭
          wx.stopPullDownRefresh()

          // 延时显示视频数据(防止数据闪烁)
          setTimeout(() => {
            _this.setData({ 
              isShowList: true,
              isPullDownRefresh: false
            })
          },300)
        }
      }
    })
  },


  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    this.getVideoList()
    this.setData({ isPullDownRefresh: true })
  },
})