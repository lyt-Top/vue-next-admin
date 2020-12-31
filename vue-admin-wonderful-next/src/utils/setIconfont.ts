// 动态设置字体图标
export function setIconfont(url: Array<string> = []) {
    if (url.length <= 0) return false
    url.map(v => {
        let link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = v
        document.getElementsByTagName('head')[0].appendChild(link)
    })
}