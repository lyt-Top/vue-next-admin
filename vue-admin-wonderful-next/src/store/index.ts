import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import themeConfig from '../utils/themeConfig'
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
        topBarColor: string,
        menuBarColor: string,
        isTopBarColorGradual: boolean,
        isMenuBarColorGradual: boolean,
        isMenuBarColorHighlight: boolean,
        isCollapse: boolean,
        isUniqueOpened: boolean,
        isFixedHeader: boolean,
        isFixedHeaderChange: boolean,
        isCollapse1: boolean,
        menuWidth1: number,
        isShowLogo: boolean,
        isShowLogoChange: boolean
    }
}

export const key: InjectionKey<Store<RootStateTypes>> = Symbol()

export const store = createStore<RootStateTypes>({
    state: {
        themeConfig
    },
    mutations: {
        getThemeConfig(state: any, data: object) {
            state.themeConfig = Object.assign({}, data)
        }
    },
    actions: {
        setThemeConfig({ commit }, data: object) {
            commit('getThemeConfig', data)
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}