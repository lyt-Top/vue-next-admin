// components/navBar/navBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navData: {
      type: Array,
      default: () => []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0,
    scrollLeft: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onNavClicks(e) {
      let index = e.currentTarget.dataset.index

      // 添加 `active` 样式
      this.setData({activeIndex: index})

      // 子组件向父组件传值
      const myEventDetail = { param: e.currentTarget.dataset.item, index: e.currentTarget.dataset.index} // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('navClick', myEventDetail, myEventOption)

      // 判断 `nav` 滚动
      index > 3 ? this.setData({ scrollLeft: e.target.offsetLeft - 55 * 3 }) : this.setData({ scrollLeft: 0})
    }
  }
})
