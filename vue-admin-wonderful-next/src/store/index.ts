import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import themeConfig from '/@/utils/themeConfig.ts'
import { getSession } from "/@/utils/storage.ts";
export interface RootStateTypes {
    themeConfig: {
        isDrawer: boolean,
        primary: string,
        success: string,
        info: string,
        warning: string,
        danger: string,
        topBar: string,
        menuBar: string,
        columnsMenuBar: string,
        topBarColor: string,
        menuBarColor: string,
        columnsMenuBarColor: string,
        isTopBarColorGradual: boolean,
        isMenuBarColorGradual: boolean,
        isMenuBarColorHighlight: boolean,
        isCollapse: boolean,
        isUniqueOpened: boolean,
        isFixedHeader: boolean,
        isFixedHeaderChange: boolean,
        isClassicSplitMenu: boolean,
        isLockScreen: boolean,
        lockScreenTime: number,
        isShowLogo: boolean,
        isShowLogoChange: boolean,
        isBreadcrumb: boolean,
        isTagsview: boolean,
        isBreadcrumbIcon: boolean,
        isTagsviewIcon: boolean,
        isCacheTagsView: boolean,
        isSortableTagsView: boolean,
        isFooter: boolean,
        isGrayscale: boolean,
        isInvert: boolean,
        isWartermark: boolean,
        wartermarkText: string,
        tagsStyle: string,
        animation: string,
        columnsAsideStyle: string,
        layout: string
    },
    routes: Array<object>,
    caches: Array<string>,
    tagsViewRoutes: Array<object>,
    auths: Array<string>
}

export const key: InjectionKey<Store<RootStateTypes>> = Symbol()

export const store = createStore<RootStateTypes>({
    state: {
        themeConfig,
        routes: [],
        caches: [],
        tagsViewRoutes: [],
        auths: []
    },
    mutations: {
        // 设置布局配置
        getThemeConfig(state: any, data: object) {
            state.themeConfig = Object.assign({}, data)
        },
        // 设置路由，菜单中使用到
        getRoutes(state: any, data: Array<object>) {
            state.routes = data
        },
        // 设置缓存（name字段）
        getCacheKeepAlive(state: any, data: Array<string>) {
            state.caches = data
        },
        // 设置 TagsView 路由
        getTagsViewRoutes(state: any, data: Array<string>) {
            state.tagsViewRoutes = data
        },
        // 设置权限
        getAuths(state: any, data: Array<string>) {
            state.auths = data
        }
    },
    actions: {
        // 设置布局配置
        setThemeConfig({ commit }, data: object) {
            commit('getThemeConfig', data)
        },
        // 设置路由，菜单中使用到
        async setRoutes({ commit }, data: any) {
            commit('getRoutes', data)
        },
        // 设置缓存（name字段）
        async setCacheKeepAlive({ commit }, data: Array<string>) {
            commit('getCacheKeepAlive', data)
        },
        // 设置 TagsView 路由
        async setTagsViewRoutes({ commit }, data: Array<string>) {
            commit('getTagsViewRoutes', data)
        },
        // 设置权限
        async setAuths({ commit }, data: Array<string>) {
            // 模拟权限，实际项目中，请通过直接走接口获取权限标识
            let authList: Array<string> = []
            if (getSession('defaultAuthList')) {
                authList = getSession('defaultAuthList')
            } else {
                let defaultAuthList: Array<string> = ['admin', 'btn.add', 'btn.del', 'btn.edit']
                if (data && data.length > 0) authList = data
                else authList = defaultAuthList
            }
            commit('getAuths', authList)
        },
    }
})

export function useStore() {
    return baseUseStore(key)
}