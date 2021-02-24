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
        layout: string,
        isRequestRoutes: boolean
    },
    routes: Array<object>,
    keepAliveNames: Array<string>,
    tagsViewRoutes: Array<object>,
    userInfos: object,
    requestOldRoutes: Array<object>,
}

export const key: InjectionKey<Store<RootStateTypes>> = Symbol()

export const store = createStore<RootStateTypes>({
    state: {
        themeConfig,
        routes: [],
        keepAliveNames: [],
        tagsViewRoutes: [],
        userInfos: {},
        requestOldRoutes: []
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
            state.keepAliveNames = data
        },
        // 设置 TagsView 路由
        getTagsViewRoutes(state: any, data: Array<string>) {
            state.tagsViewRoutes = data
        },
        // 设置用户信息
        getUserInfos(state: any, data: object) {
            state.userInfos = data
        },
        // 后端控制路由
        getBackEndControlRoutes(state: any, data: object) {
            state.requestOldRoutes = data
        },
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
        // 设置用户信息
        async setUserInfos({ commit }, data: object) {
            if (data) {
                commit('getUserInfos', data)
            } else {
                if (getSession('userInfo')) commit('getUserInfos', getSession('userInfo'))
            }
        },
        // 后端控制路由
        setBackEndControlRoutes({ commit }, routes: Array<string>) {
            commit('getBackEndControlRoutes', routes)
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}