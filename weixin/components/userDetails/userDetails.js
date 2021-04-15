// 当前作者信息
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    authorData: {
      type: Object,
      default: {}
    },
    isShowView: {
      type: Boolean,
      default: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 关注按钮点击
     */
    onFollowClick() {
      wx.showToast({
        icon: 'success',
        title: `关注成功`
      })
      setTimeout(()=> {
        wx.navigateBack()
      },1000)
    }
  }
})
