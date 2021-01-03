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