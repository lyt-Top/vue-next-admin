// 当前登录用户信息
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorData: {},
    isShowView: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: 'LiuHaiMei...', mask: true })
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        authorData: JSON.parse(options.data),
        isShowView: true
      })
    },700)
  },

  /**
     * 编辑资料按钮点击
     */
  onEditClick() {
    wx.navigateTo({
      url: '/pages/editUserInfo/editUserInfo'
    })
  }
})