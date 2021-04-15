// 作者信息详情页
const apiUrl = require("../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: [],
    isShowView: false,
    authorData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    this.getUserData(options.id)
    wx.showLoading({ title: 'LiuHaiMei...', mask: true})
    wx.getStorage({
      key: 'author',
      success(res) {
        _this.setData({ authorData: res.data})
      },
    })
  },

  getUserData(id) {
    let _this = this
    wx.request({
      url: apiUrl.videoUser,
      data: {
        id: id
      },
      success(res) {
        wx.hideLoading()
        _this.setData({ userData: res.data.result, isShowView: true})
      }
    })
  },

  /**
   * 滚动监听
   */
  onPageScroll(e) {
    let str = this.data.authorData.data.content.data.author.name
    e.scrollTop > 70 ? wx.setNavigationBarTitle({title: str}) : wx.setNavigationBarTitle({title: ""})
  }
})