import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import themeConfig from '/@/utils/themeConfig.ts'
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
    tagsViewRoutes: Array<object>
}

export const key: InjectionKey<Store<RootStateTypes>> = Symbol()

export const store = createStore<RootStateTypes>({
    state: {
        themeConfig,
        routes: [],
        caches: [],
        tagsViewRoutes: []
    },
    mutations: {
        getThemeConfig(state: any, data: object) {
            state.themeConfig = Object.assign({}, data)
        },
        getRoutes(state: any, data: Array<object>) {
            state.routes = data
        },
        getCacheKeepAlive(state: any, data: Array<string>) {
            state.caches = data
        },
        getTagsViewRoutes(state: any, data: Array<string>) {
            state.tagsViewRoutes = data
        }
    },
    actions: {
        setThemeConfig({ commit }, data: object) {
            commit('getThemeConfig', data)
        },
        async setRoutes({ commit }, data: any) {
            commit('getRoutes', data)
        },
        async setCacheKeepAlive({ commit }, data: Array<string>) {
            commit('getCacheKeepAlive', data)
        },
        async setTagsViewRoutes({ commit }, data: Array<string>) {
            commit('getTagsViewRoutes', data)
        },
    }
})

export function useStore() {
    return baseUseStore(key)
}