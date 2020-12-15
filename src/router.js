import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/login',
        title: 'login',
        component: () => import('./views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        title: '404',
        component: () => import('./views/notFound'),
        hidden: true
    },
]

export const asyncRoutes = [
    {
        path: '/',
        component: Layout,
        meta: {title: 'TPM', icon: 'home'},
        children: [
            {
                path: '',
                redirect: '/department',
                name: 'department index',
                component: () => import('./views/department/index.vue'),
                meta: {title: '部门设置', icon: 'eye'},
                hidden: true,
            },
        ]
    },
    {
        path: '',
        component: Layout,
        meta: {title: '控制台', icon: 'home'},
        redirect: '/index',
        children: [
            {
                path: 'index',
                redirect: '/department',
                name: 'index',
                component: () => import('./views/department/index.vue'),
                meta: {title: '首页', icon: 'eye'},
                hidden: false,
            },
            {
                path: 'workunit',
                name: 'workunit',
                component: () => import('./views/workunit/index.vue'),
                meta: {title: '单位', icon: 'eye'},
                hidden: false,
            },
            {
                path: 'department',
                name: 'department',
                meta: {title: '部门', icon: 'eye'},
                component: () => import('./views/department/index.vue'),
            },
            {
                path: 'staff',
                name: 'staff',
                meta: {title: 'staff', icon: 'eye'},
                component: () => import('./views/staff/index.vue'),
            },
            {
                path: 'servicecategory',
                name: 'servicecategory',
                meta: {title: 'servicecategory', icon: 'eye'},
                component: () => import('./views/servicecategory/index.vue'),
            },
            {
                path: 'workstation',
                name: 'workstation',
                meta: {title: 'workstation', icon: 'eye'},
                component: () => import('./views/workstation/index.vue'),
            },
            {
                path: 'priority',
                name: 'priority',
                meta: {title: 'priority', icon: 'eye'},
                component: () => import('./views/priority/index.vue'),
            },
            {
                path: 'maindisplaydevice',
                name: 'maindisplaydevice',
                meta: {title: 'maindisplaydevice', icon: 'eye'},
                component: () => import('./views/maindisplaydevice/index.vue'),
            },
            {
                path: 'voice',
                name: 'voice',
                meta: {title: 'voice', icon: 'eye'},
                component: () => import('./views/voice/index.vue'),
            },
            {
                path: 'ticket',
                name: 'ticket',
                meta: {title: 'ticket', icon: 'eye'},
                component: () => import('./views/ticket/index.vue'),
            },
            {
                path: 'servicekey',
                name: 'servicekey',
                meta: {title: 'servicekey', icon: 'eye'},
                component: () => import('./views/servicekey/index.vue'),
            },
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true,
    },
]

const createRouter = () => new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes
})

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

const router = createRouter()
router.beforeEach((to, from, next) => {
    // chrome
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    // safari
    window.pageYOffset = 0
    next()
})

export default router
