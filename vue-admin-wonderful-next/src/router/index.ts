import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const dynamicRoutes = [
    {
        path: '/',
        component: () => import('/@/views/layout/index.vue'),
        redirect: '/home',
        meta: {
            title: '首页',
            isLink: '',
            isHide: false
        },
        children: [{
            path: '/home',
            component: () => import('/@/views/home/index.vue'),
            meta: {
                title: '首页',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-shouye'
            }
        },
        {
            path: '/system',
            component: () => import('/@/views/docs/index.vue'),
            redirect: '/system/menu',
            meta: {
                title: '系统设置',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-xitongshezhi'
            },
            children: [
                {
                    path: '/system/menu',
                    component: () => import('/@/views/docs/index.vue'),
                    meta: {
                        title: '菜单管理',
                        isLink: '',
                        isHide: false,
                        icon: 'iconfont icon-caidan'
                    }
                },
                {
                    path: '/system/user',
                    component: () => import('/@/views/docs/index.vue'),
                    meta: {
                        title: '用户管理',
                        isLink: '',
                        isHide: false,
                        icon: 'iconfont icon-icon-'
                    }
                }
            ]
        },
        {
            path: '/limits',
            component: () => import('/@/views/docs/index.vue'),
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
                    component: () => import('/@/views/docs/index.vue'),
                    redirect: '/limits/frontEnd/page',
                    meta: {
                        title: '前端控制',
                        isLink: '',
                        isHide: false
                    },
                    children: [
                        {
                            path: '/limits/frontEnd/page',
                            component: () => import('/@/views/docs/index.vue'),
                            meta: {
                                title: '页面权限',
                                isLink: '',
                                isHide: false
                            }
                        },
                        {
                            path: '/limits/frontEnd/btn',
                            component: () => import('/@/views/docs/index.vue'),
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
                    component: () => import('/@/views/docs/index.vue'),
                    meta: {
                        title: '后端控制',
                        isLink: '',
                        isHide: false
                    }
                }
            ]
        },
        {
            path: '/fun',
            component: () => import('/@/views/docs copy 1/index.vue'),
            meta: {
                title: '功能',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-crew_feature'
            }
        },
        {
            path: '/pages',
            component: () => import('/@/views/docs copy 1/index.vue'),
            meta: {
                title: '页面',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-fuzhiyemian'
            }
        },
        {
            path: '/components',
            component: () => import('/@/views/docs copy 1/index.vue'),
            meta: {
                title: '组件',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-zujian'
            }
        },
        {
            path: '/chart',
            component: () => import('/@/views/docs copy 1/index.vue'),
            meta: {
                title: '大数据图表',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-chanyedashujufuwupingtai'
            }
        },
        {
            path: '/docs1',
            component: () => import('/@/views/docs copy 1/index.vue'),
            meta: {
                title: '个人中心',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-gerenzhongxin'
            }
        },
        {
            path: '/docs2',
            component: () => import('/@/views/docs copy 2/index.vue'),
            meta: {
                title: '工具类集合',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-gongju'
            }
        },
        {
            path: '/docs3',
            component: () => import('/@/views/docs copy 3/index.vue'),
            meta: {
                title: '外链',
                isLink: '',
                isHide: false,
                icon: 'iconfont icon-caozuo-wailian'
            }
        },
        {
            path: '/iframe',
            component: () => import('/@/views/docs copy 3/index.vue'),
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