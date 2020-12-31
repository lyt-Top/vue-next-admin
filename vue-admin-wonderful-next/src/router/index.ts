import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('/@/views/layout/index.vue'),
        redirect: '/home',
        meta: {
            title: '首页',
            index: 0
        },
        children: [{
            path: '/home',
            name: 'home',
            component: () => import('/@/views/home/index.vue'),
            meta: {
                title: '首页',
                index: 0
            }
        },
        {
            path: '/docs',
            name: 'docs',
            component: () => import('/@/views/docs/index.vue'),
            meta: {
                title: '文档',
                index: 1
            }
        },
        {
            path: '/docs1',
            name: 'docs1',
            component: () => import('/@/views/docs copy 1/index.vue'),
            meta: {
                title: '文档1',
                index: 2
            }
        },
        {
            path: '/docs2',
            name: 'docs2',
            component: () => import('/@/views/docs copy 2/index.vue'),
            meta: {
                title: '文档2',
                index: 3
            }
        },
        {
            path: '/docs3',
            name: 'docs3',
            component: () => import('/@/views/docs copy 3/index.vue'),
            meta: {
                title: '文档3',
                index: 4
            }
        },
        {
            path: '/docs4',
            name: 'docs4',
            component: () => import('/@/views/docs copy 4/index.vue'),
            meta: {
                title: '文档4',
                index: 5
            }
        },
        {
            path: '/docs5',
            name: 'docs5',
            component: () => import('/@/views/docs copy 5/index.vue'),
            meta: {
                title: '文档5',
                index: 6
            }
        },
        {
            path: '/docs6',
            name: 'docs6',
            component: () => import('/@/views/docs copy 6/index.vue'),
            meta: {
                title: '文档6',
                index: 7
            }
        },
        {
            path: '/docs7',
            name: 'docs7',
            component: () => import('/@/views/docs copy 7/index.vue'),
            meta: {
                title: '文档7',
                index: 8
            }
        },
        {
            path: '/docs8',
            name: 'docs8',
            component: () => import('/@/views/docs copy 8/index.vue'),
            meta: {
                title: '文档8',
                index: 9
            }
        },
        {
            path: '/docs9',
            name: 'docs9',
            component: () => import('/@/views/docs copy 9/index.vue'),
            meta: {
                title: '文档9',
                index: 10
            }
        },
        {
            path: '/docs10',
            name: 'docs10',
            component: () => import('/@/views/docs copy 10/index.vue'),
            meta: {
                title: '文档10',
                index: 11
            }
        },
        {
            path: '/docs11',
            name: 'docs11',
            component: () => import('/@/views/docs copy 11/index.vue'),
            meta: {
                title: '文档11',
                index: 12
            }
        },
        {
            path: '/docs12',
            name: 'docs12',
            component: () => import('/@/views/docs copy 12/index.vue'),
            meta: {
                title: '文档12',
                index: 13
            }
        },
        {
            path: '/docs13',
            name: 'docs13',
            component: () => import('/@/views/docs copy 13/index.vue'),
            meta: {
                title: '文档13',
                index: 14
            }
        },
        {
            path: '/docs14',
            name: 'docs14',
            component: () => import('/@/views/docs copy 14/index.vue'),
            meta: {
                title: '文档14',
                index: 15
            }
        },
        {
            path: '/docs15',
            name: 'docs15',
            component: () => import('/@/views/docs copy 15/index.vue'),
            meta: {
                title: '文档15',
                index: 16
            }
        },
        {
            path: '/docs16',
            name: 'docs16',
            component: () => import('/@/views/docs copy 16/index.vue'),
            meta: {
                title: '文档16',
                index: 17
            }
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('/@/views/login/index.vue'),
        meta: {
            title: '登陆'
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('/@/views/error/404.vue'),
        meta: {
            title: '找不到此页面'
        }
    },
    {
        path: '/401',
        name: '401',
        component: () => import('/@/views/error/401.vue'),
        meta: {
            title: '没有权限'
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes
})

// router.afterEach((to, from) => {

// })

export default router