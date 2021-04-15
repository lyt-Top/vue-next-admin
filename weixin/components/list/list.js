// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData: {
      type: Array,
      default: () => []
    },
    isShow: {
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
    onListClicks(e) {
      const myEventDetail = { param: e.currentTarget.dataset.item} // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('listClick', myEventDetail, myEventOption)
    }
  }
})
