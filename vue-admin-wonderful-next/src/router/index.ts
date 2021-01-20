import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

export const dynamicRoutes = [
    {
        path: '/',
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
                icon: 'iconfont icon-xitongshezhi',
                isKeepAlive: true
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
                        icon: 'iconfont icon-caidan',
                        isKeepAlive: true
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
                        icon: 'iconfont icon-icon-',
                        isKeepAlive: false
                    }
                }
            ]
        },
        {
            path: '/limits',
            component: () => import('/@/views/layout/routerView/parent.vue'),
            redirect: '/limits/frontEnd',
            meta: {
                title: '权限管理',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-quanxian'
            },
            children: [
                {
                    path: '/limits/frontEnd',
                    component: () => import('/@/views/layout/routerView/parent.vue'),
                    redirect: '/limits/frontEnd/page',
                    meta: {
                        title: '前端控制',
                        isLink: '',
                        isHide: false
                    },
                    children: [
                        {
                            path: '/limits/frontEnd/page',
                            component: () => import('/@/views/limits/frontEnd/page/index.vue'),
                            meta: {
                                title: '页面权限',
                                isLink: '',
                                isHide: false
                            }
                        },
                        {
                            path: '/limits/frontEnd/btn',
                            component: () => import('/@/views/limits/frontEnd/btn/index.vue'),
                            meta: {
                                title: '按钮权限',
                                isLink: '',
                                isHide: false
                            }
                        }
                    ]
                },
                {
                    path: '/limits/backEnd',
                    component: () => import('/@/views/layout/routerView/parent.vue'),
                    meta: {
                        title: '后端控制',
                        isLink: '',
                        isHide: false
                    },
                    children: [
                        {
                            path: '/limits/backEnd/page',
                            component: () => import('/@/views/limits/backEnd/page/index.vue'),
                            meta: {
                                title: '页面权限',
                                isLink: '',
                                isHide: false
                            }
                        },
                        {
                            path: '/limits/backEnd/btn',
                            component: () => import('/@/views/limits/backEnd/btn/index.vue'),
                            meta: {
                                title: '按钮权限',
                                isLink: '',
                                isHide: false
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: '/menu',
            component: () => import('/@/views/layout/routerView/parent.vue'),
            redirect: '/menu/menu1',
            meta: {
                title: '路由嵌套',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-xitongshezhi'
            },
            children: [
                {
                    path: '/menu/menu1',
                    component: () => import('/@/views/layout/routerView/parent.vue'),
                    redirect: '/menu/menu1/menu11',
                    meta: {
                        title: '菜单1',
                        isLink: '',
                        isHide: false,
                        icon: 'iconfont icon-caidan'
                    },
                    children: [
                        {
                            path: '/menu/menu1/menu11',
                            component: () => import('/@/views/menu/menu1/menu11/index.vue'),
                            meta: {
                                title: '菜单11',
                                isLink: '',
                                isHide: false,
                                icon: 'iconfont icon-caidan'
                            }
                        },
                        {
                            path: '/menu/menu1/menu12',
                            component: () => import('/@/views/layout/routerView/parent.vue'),
                            redirect: '/menu/menu1/menu12/menu121',
                            meta: {
                                title: '菜单12',
                                isLink: '',
                                isHide: false,
                                icon: 'iconfont icon-caidan'
                            },
                            children: [
                                {
                                    path: '/menu/menu1/menu12/menu121',
                                    component: () => import('/@/views/menu/menu1/menu12/menu121/index.vue'),
                                    meta: {
                                        title: '菜单121',
                                        isLink: '',
                                        isHide: false,
                                        icon: 'iconfont icon-caidan'
                                    }
                                },
                                {
                                    path: '/menu/menu1/menu12/menu122',
                                    component: () => import('/@/views/menu/menu1/menu12/menu122/index.vue'),
                                    meta: {
                                        title: '菜单122',
                                        isLink: '',
                                        isHide: false,
                                        icon: 'iconfont icon-caidan'
                                    }
                                }
                            ]
                        },
                        {
                            path: '/menu/menu1/menu13',
                            component: () => import('/@/views/menu/menu1/menu13/index.vue'),
                            meta: {
                                title: '菜单13',
                                isLink: '',
                                isHide: false,
                                icon: 'iconfont icon-caidan'
                            }
                        }
                    ]
                },
                {
                    path: '/menu/menu2',
                    component: () => import('/@/views/menu/menu2/index.vue'),
                    meta: {
                        title: '菜单2',
                        isLink: '',
                        isHide: false,
                        icon: 'iconfont icon-caidan'
                    }
                }
            ]
        },
        {
            path: '/fun',
            component: () => import('/@/views/fun/index.vue'),
            meta: {
                title: '功能',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-crew_feature'
            }
        },
        {
            path: '/pages',
            component: () => import('/@/views/pages/index.vue'),
            meta: {
                title: '页面',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-fuzhiyemian'
            }
        },
        {
            path: '/components',
            component: () => import('/@/views/components/index.vue'),
            meta: {
                title: '组件',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-zujian'
            }
        },
        {
            path: '/chart',
            component: () => import('/@/views/chart/index.vue'),
            meta: {
                title: '大数据图表',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-ico_shuju'
            }
        },
        {
            path: '/personal',
            component: () => import('/@/views/personal/index.vue'),
            meta: {
                title: '个人中心',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-gerenzhongxin'
            }
        },
        {
            path: '/tools',
            component: () => import('/@/views/tools/index.vue'),
            meta: {
                title: '工具类集合',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-gongju'
            }
        },
        {
            path: '/link',
            component: () => import('/@/views/layout/routerView/parent.vue'),
            meta: {
                title: '外链',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-caozuo-wailian'
            }
        },
        {
            path: '/iframe',
            component: () => import('/@/views/layout/routerView/iframe.vue'),
            meta: {
                title: '内嵌 iframe',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-neiqianshujuchucun'
            }
        }]
    }
]

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

const router = createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes
})

dynamicRoutes.map((route) => {
    router.addRoute(route as RouteRecordRaw);
});

// router.afterEach((to, from) => {

// })

export default router