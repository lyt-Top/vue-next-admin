import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { store } from "/@/store/index.ts";

// 定义动态路由
export const dynamicRoutes = [
    {
        path: '/',
        name: '/',
        component: () => import('/@/views/layout/index.vue'),
        redirect: '/home',
        meta: {
            title: '首页',
            isLink: '',
            isHide: false,
            isKeepAlive: true,
            icon: 'iconfont icon-shouye'
        },
        children: [{
            path: '/home',
            name: 'home',
            component: () => import('/@/views/home/index.vue'),
            meta: {
                title: '首页',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-shouye'
            }
        },
        {
            path: '/system',
            name: 'system',
            component: () => import('/@/views/layout/routerView/parent.vue'),
            redirect: '/system/menu',
            meta: {
                title: '系统设置',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-xitongshezhi'
            },
            children: [
                {
                    path: '/system/menu',
                    name: "systemMenu",
                    component: () => import('/@/views/system/menu/index.vue'),
                    meta: {
                        title: '菜单管理',
                        isLink: '',
                        isHide: false,
                        isKeepAlive: true,
                        icon: 'iconfont icon-caidan'
                    }
                },
                {
                    path: '/system/user',
                    name: "systemUser",
                    component: () => import('/@/views/system/user/index.vue'),
                    meta: {
                        title: '用户管理',
                        isLink: '',
                        isHide: false,
                        isKeepAlive: true,
                        icon: 'iconfont icon-icon-',
                    }
                }
            ]
        },
        {
            path: '/limits',
            name: 'limits',
            component: () => import('/@/views/layout/routerView/parent.vue'),
            redirect: '/limits/frontEnd',
            meta: {
                title: '权限管理',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-quanxian'
            },
            children: [
                {
                    path: '/limits/frontEnd',
                    name: 'limitsFrontEnd',
                    component: () => import('/@/views/layout/routerView/parent.vue'),
                    redirect: '/limits/frontEnd/page',
                    meta: {
                        title: '前端控制',
                        isLink: '',
                        isHide: false,
                        isKeepAlive: true
                    },
                    children: [
                        {
                            path: '/limits/frontEnd/page',
                            name: 'limitsFrontEndPage',
                            component: () => import('/@/views/limits/frontEnd/page/index.vue'),
                            meta: {
                                title: '页面权限',
                                isLink: '',
                                isHide: false,
                                isKeepAlive: true
                            }
                        },
                        {
                            path: '/limits/frontEnd/btn',
                            name: 'limitsFrontEndBtn',
                            component: () => import('/@/views/limits/frontEnd/btn/index.vue'),
                            meta: {
                                title: '按钮权限',
                                isLink: '',
                                isHide: false,
                                isKeepAlive: true
                            }
                        }
                    ]
                },
                {
                    path: '/limits/backEnd',
                    name: 'limitsBackEnd',
                    component: () => import('/@/views/layout/routerView/parent.vue'),
                    meta: {
                        title: '后端控制',
                        isLink: '',
                        isHide: false,
                        isKeepAlive: true
                    },
                    children: [
                        {
                            path: '/limits/backEnd/page',
                            name: 'limitsBackEndEndPage',
                            component: () => import('/@/views/limits/backEnd/page/index.vue'),
                            meta: {
                                title: '页面权限',
                                isLink: '',
                                isHide: false,
                                isKeepAlive: true
                            }
                        },
                        {
                            path: '/limits/backEnd/btn',
                            name: 'limitsBackEndEndBtn',
                            component: () => import('/@/views/limits/backEnd/btn/index.vue'),
                            meta: {
                                title: '按钮权限',
                                isLink: '',
                                isHide: false,
                                isKeepAlive: true
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: '/menu',
            name: 'menu',
            component: () => import('/@/views/layout/routerView/parent.vue'),
            redirect: '/menu/menu1',
            meta: {
                title: '路由嵌套',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-xitongshezhi'
            },
            children: [
                {
                    path: '/menu/menu1',
                    name: 'menu1',
                    component: () => import('/@/views/layout/routerView/parent.vue'),
                    redirect: '/menu/menu1/menu11',
                    meta: {
                        title: '菜单1',
                        isLink: '',
                        isHide: false,
                        isKeepAlive: true,
                        icon: 'iconfont icon-caidan'
                    },
                    children: [
                        {
                            path: '/menu/menu1/menu11',
                            name: 'menu11',
                            component: () => import('/@/views/menu/menu1/menu11/index.vue'),
                            meta: {
                                title: '菜单11',
                                isLink: '',
                                isHide: false,
                                isKeepAlive: true,
                                icon: 'iconfont icon-caidan'
                            }
                        },
                        {
                            path: '/menu/menu1/menu12',
                            name: 'menu12',
                            component: () => import('/@/views/layout/routerView/parent.vue'),
                            redirect: '/menu/menu1/menu12/menu121',
                            meta: {
                                title: '菜单12',
                                isLink: '',
                                isHide: false,
                                isKeepAlive: true,
                                icon: 'iconfont icon-caidan'
                            },
                            children: [
                                {
                                    path: '/menu/menu1/menu12/menu121',
                                    name: 'menu121',
                                    component: () => import('/@/views/menu/menu1/menu12/menu121/index.vue'),
                                    meta: {
                                        title: '菜单121',
                                        isLink: '',
                                        isHide: false,
                                        isKeepAlive: true,
                                        icon: 'iconfont icon-caidan'
                                    }
                                },
                                {
                                    path: '/menu/menu1/menu12/menu122',
                                    name: 'menu122',
                                    component: () => import('/@/views/menu/menu1/menu12/menu122/index.vue'),
                                    meta: {
                                        title: '菜单122',
                                        isLink: '',
                                        isHide: false,
                                        isKeepAlive: true,
                                        icon: 'iconfont icon-caidan'
                                    }
                                }
                            ]
                        },
                        {
                            path: '/menu/menu1/menu13',
                            name: 'menu13',
                            component: () => import('/@/views/menu/menu1/menu13/index.vue'),
                            meta: {
                                title: '菜单13',
                                isLink: '',
                                isHide: false,
                                isKeepAlive: true,
                                icon: 'iconfont icon-caidan'
                            }
                        }
                    ]
                },
                {
                    path: '/menu/menu2',
                    name: 'menu2',
                    component: () => import('/@/views/menu/menu2/index.vue'),
                    meta: {
                        title: '菜单2',
                        isLink: '',
                        isHide: false,
                        isKeepAlive: true,
                        icon: 'iconfont icon-caidan'
                    }
                }
            ]
        },
        {
            path: '/fun',
            name: 'funIndex',
            component: () => import('/@/views/fun/index.vue'),
            meta: {
                title: '功能',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-crew_feature'
            }
        },
        {
            path: '/pages',
            name: 'pagesIndex',
            component: () => import('/@/views/pages/index.vue'),
            meta: {
                title: '页面',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-fuzhiyemian'
            }
        },
        {
            path: '/components',
            name: 'componentsIndex',
            component: () => import('/@/views/components/index.vue'),
            meta: {
                title: '组件',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-zujian'
            }
        },
        {
            path: '/chart',
            name: 'chartIndex',
            component: () => import('/@/views/chart/index.vue'),
            meta: {
                title: '大数据图表',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-ico_shuju'
            }
        },
        {
            path: '/personal',
            name: 'personal',
            component: () => import('/@/views/personal/index.vue'),
            meta: {
                title: '个人中心',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-gerenzhongxin'
            }
        },
        {
            path: '/tools',
            name: 'tools',
            component: () => import('/@/views/tools/index.vue'),
            meta: {
                title: '工具类集合',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-gongju'
            }
        },
        {
            path: '/link',
            name: 'link',
            component: () => import('/@/views/layout/routerView/parent.vue'),
            meta: {
                title: '外链',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-caozuo-wailian'
            }
        },
        {
            path: '/iframes',
            name: 'iframes',
            component: () => import('/@/views/layout/routerView/iframes.vue'),
            meta: {
                title: '内嵌 iframe',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                icon: 'iconfont icon-neiqianshujuchucun'
            }
        }]
    }
]

// 定义静态路由
const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        component: () => import('/@/views/login/index.vue'),
        meta: {
            title: '登陆'
        }
    },
    {
        path: '/404',
        component: () => import('/@/views/error/404.vue'),
        meta: {
            title: '找不到此页面'
        }
    },
    {
        path: '/401',
        component: () => import('/@/views/error/401.vue'),
        meta: {
            title: '没有权限'
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
        meta: {
            title: '页面找不到重定向'
        }
    }
]

// 添加静态路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes
})

// 多级嵌套数组处理成一维数组
export function formatFlatteningRoutes(arr: any) {
    if (arr.length < 0) return false
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].children) {
            arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1))
        }
    }
    return arr
}

// 多级嵌套数组处理后的一维数组，再处理成 `定义动态路由` 的格式
// 只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存
// isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
export function formatTwoStageRoutes(arr: any) {
    if (arr.length < 0) return false
    const newArr: any = []
    const cacheList: Array<string> = []
    arr.map((v: any) => {
        if (v.path === '/') {
            newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] })
        } else {
            newArr[0].children.push({ ...v })
            if (newArr[0].meta.isKeepAlive && v.meta.isKeepAlive) {
                cacheList.push(v.name)
                store.dispatch('setCacheKeepAlive', cacheList)
            }
        }
    })
    return newArr
}

// 添加动态路由
export function setAddRoute() {
    formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes)).map((route: any) => {
        router.addRoute(route as RouteRecordRaw)
    })
}

// 删除/重置路由
export function resetRoute() {
    formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes)).map((route: any) => {
        const { name } = route
        router.hasRoute(name) && router.removeRoute(name)
    })
}

// 初始化执行函数
setAddRoute()

// router.afterEach((to, from) => {

// })

export default router