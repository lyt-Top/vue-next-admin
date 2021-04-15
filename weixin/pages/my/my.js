// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCollection: [
      { imgPath: '../../images/follow.png', title: '我的关注', urlPath: '' },
      { imgPath: '../../images/notice.png', title: '消息通知', urlPath: '' },
      { imgPath: '../../images/collection.png', title: '我的收藏', urlPath: '' }
    ],
    mySetList: [
      { urlPath: '', title: '配置路径'},
      { urlPath: '', title: '观看历史'},
      { urlPath: '', title: '离线缓存'}
    ],
    mySetList1: [
      { urlPath: '', title: '设置' },
      { urlPath: '', title: '反馈' }
    ],
    myServerList: [
      { title: '我的服务', children: [
        { icon: '../../images/myServer/server1.png', title: '我的订单', urlPath: '' },
        { icon: '../../images/myServer/server2.png', title: '我要直播', urlPath: '' },
        { icon: '../../images/myServer/server3.png', title: '我的钱包', urlPath: '' },
        { icon: '../../images/myServer/server4.png', title: '我的卡券', urlPath: '' },
        { icon: '../../images/myServer/server5.png', title: '我的游戏', urlPath: '' },
        { icon: '../../images/myServer/server6.png', title: '免流量', urlPath: '' },
        { icon: '../../images/myServer/server7.png', title: '广告合作', urlPath: '' }
      ]}
    ],
    userInfo: {
      imgPath: '../../images/photo.png',
      btnTxt: '登录/注册',
      msg: '登录一下，内容更精彩',
      isLogin: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },

  /**
   * 初始化授权
   */
  onShow() {
    this.getUserInfo()
  },

  /**
   * 顶部三个按钮点击
   */
  onMyCollectionClick(e) {
    this.showToast(e.currentTarget.dataset.content.title)
  },

  /**
   * 公用弹窗
   */
  showToast(el) {
    wx.showToast({
      icon: 'success',
      title: el
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo() {
    let _this = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              _this.setUserInfo(res.userInfo)
            }
          })
        } else {
          _this.userInfoInit()
        }
      }
    })
  },

  /**
   * 设置用户信息
   */
  setUserInfo(data) {
    if(data) {
      let setUserInfo = {
        imgPath: data.avatarUrl,
        btnTxt: data.nickName,
        msg: `这个人很懒，什么都没有留下`,
        isLogin: true
      }
      this.setData({
        userInfo: setUserInfo
      })
    }
  },

  /**
   * 取消授权后，数据初始化
   */
  userInfoInit() {
    let setUserInfo = {
      imgPath: '../../images/photo.png',
      btnTxt: '登录/注册',
      msg: '登录一下，内容更精彩',
      isLogin: false
    }
    this.setData({
      userInfo: setUserInfo
    })
  },

  /**
   * 登录按钮点击获取用户信息
   */
  bindGetUserInfo(e) {
    this.setUserInfo(e.detail.userInfo)
  },

  /**
   * 授权登录后用户信息点击跳转
   */
  onUserinfoClick(e) {
    let str = e.currentTarget.dataset.setuserinfo
    if (str.isLogin) {
      wx.navigateTo({
        url: `/pages/myInfo/myInfo?data=${JSON.stringify(str)}`
      })
    }
  }
})