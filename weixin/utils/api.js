function api() {
  const url = 'https://way.jd.com'
  const url1 = 'https://api.apiopen.top'
  return {
    navList: `${url}/jisuapi/channel?appkey=33410aae7959efa885187ab6cebc9162`,  // 首页顶部导航数据
    indexList: `${url}/jisuapi/get`,                                            // 获取首页列表组件数据
    navVideo: `${url1}/videoHomeTab`,                                           // 获取视频导航数据
    videoList: `${url1}/videoCategoryDetails`,                                  // 获取视频列表组件数据
    videoUser: `${url1}/videoRecommend`                                         // 根据当前用户(点击)ID推荐视频
  }
}

module.exports = api()