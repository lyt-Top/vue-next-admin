// 字体图标 url
const urlArr = ["//at.alicdn.com/t/font_2298093_anmim41evr5.css"]

// 动态设置字体图标
export function setIconfont() {
    if (urlArr.length <= 0) return false
    urlArr.map(v => {
        let link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = v
        document.getElementsByTagName('head')[0].appendChild(link)
    })
}