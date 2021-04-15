// components/videoList/videoList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoLists: {
      type: Array,
      default: () => []
    },
    isShowList: {
      type: Boolean,
      default: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentPlay: null,
    isAutoPlay: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 蒙蔽播放按钮点击
     */
    onPlayClick(e) {
      this.setData({ currentPlay: e.currentTarget.id})
      // wx.createVideoContext(e.currentTarget.id).play()
    },

    /**
     * 当前用户点击
     */
    onUserClick(e) {
      wx.setStorage({
        key: 'author',
        data: e.currentTarget.dataset.author,
        success(res) {
          // console.log(res)
        }
      })
      wx.navigateTo({
        url: `/pages/videoUserDetails/videoUserDetails?id=${e.currentTarget.id}`
      })
    },

    /**
     * 当前用户评论点击
     */
    onCommentClick(e) {
      wx.navigateTo({
        url: `/pages/webView/webView?url=${e.currentTarget.dataset.url}`,
      })
    }
  }
})
