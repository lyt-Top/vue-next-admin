// pages/listDetails/listDetails.js
/**
 * https://github.com/icindy/wxParse
 */
const WxParse = require('../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes: '',
    isShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    _this.setData({ isShow: true})

    // Loading
    wx.showLoading({ title: 'LiuHaiMei...', mask: true })

    wx.setNavigationBarTitle({
      title: options.data
    })
    
    wx.getStorage({
      key: 'indexListData',
      success: function(res) {
        WxParse.wxParse('nodes', 'html', res.data.content, _this, 0)
        setTimeout(()=>{
          _this.setData({ isShow: false })
          wx.hideLoading()
        },700)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})