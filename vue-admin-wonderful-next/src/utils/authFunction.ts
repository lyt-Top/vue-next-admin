import { store } from "/@/store/index.ts";

// 判断两数组是否相同
export function judementSameArr(news: Array<string>, old: Array<string>) {
    let count = 0
    const leng = old.length
    for (let i in old) {
        for (let j in news) {
            if (old[i] === news[j]) count++
        }
    }
    return count === leng ? true : false
}

// 单个权限验证
export function auth(value: string) {
    return store.state.userInfos.authBtnList.some((v: any) => v === value)
}

// 多个权限验证，满足一个则为 true
export function auths(value: Array<string>) {
    let flag = false
    store.state.userInfos.authBtnList.map((val: any) => {
        value.map((v: any) => {
            if (val === v) flag = true
        })
    })
    return flag
}

// 多个权限验证，全部满足则为 true
export function authAll(value: Array<string>) {
    return judementSameArr(value, store.state.userInfos.authBtnList)
}

