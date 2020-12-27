import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'
import Login from "./views/login/index";

export const constantRoutes = [
    // {
    //     path: '/404',
    //     title: '404',
    //     component: () => import('./views/notFound'),
    //     hidden: true
    // },
    // {
    //     path: '/login',
    //     title: 'login',
    //     component: Login,
    //     hidden: true
    // },
]

export const asyncRoutes = [
    {
        path: '/404',
        title: '404',
        component: () => import('./views/notFound'),
        hidden: true
    },
    {
        path: '/login',
        title: 'login',
        component: Login,
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        meta: {title: '设置', icon: 'setting'},
        redirect: 'department',
        children: [
            {
                path: 'maindisplaydevice', name: 'maindisplaydevice', meta: {title: '主显示屏'},
                component: () => import('./views/setting/maindisplaydevice/index.vue'),
            },
            {
                path: 'sysfunction', name: 'sysfunction', meta: {title: '系统功能'},
                component: () => import('./views/setting/sysfunction/index.vue'),
            },
            {
                path: 'voice', name: 'voice', meta: {title: '声音'},
                component: () => import('./views/setting/voice/index.vue'),
            },
            {
                path: 'ticket', name: 'ticket', meta: {title: '票号'},
                component: () => import('./views/setting/ticket/index.vue'),
            },
            {
                path: 'ticketdetail', name: 'ticketDetail', meta: {title: '票号详情'}, hidden: true,
                component: () => import('./views/setting/ticket/detail.vue'),
            },
            {
                path: 'reception', name: 'reception', meta: {title: '服务台'},
                component: () => import('./views/setting/reception/index.vue'),
            },
            {
                path: 'workunit', name: 'workunit', meta: {title: '单位'}, hidden: false,
                component: () => import('./views/setting/workunit/index.vue'),
            },
            {
                path: 'department', name: 'department', meta: {title: '部门'},
                component: () => import('./views/setting/department/index.vue'),
            },
            {
                path: 'staff', name: 'staff', meta: {title: '员工'},
                component: () => import('./views/setting/staff/index.vue'),
            },
            {
                path: 'srvgroup', name: 'srvgroup', meta: {title: '服务类别'},
                component: () => import('./views/setting/srvgroup/index.vue'),
            },
            {
                path: 'workstation', name: 'workstation', meta: {title: '工作站'},
                component: () => import('./views/setting/workstation/index.vue'),
            },
            {
                path: 'priority', name: 'priority', meta: {title: '优先级'},
                component: () => import('./views/setting/priority/index.vue'),
            },
            {
                path: 'prioritydetail', name: 'priorityDetail', meta: {title: '优先级详情'}, hidden: true,
                component: () => import('./views/setting/priority/detail.vue'),
            },
        ]
    },
    {
        path: '/count',
        component: Layout,
        meta: {title: '统计', icon: 'count'},
        children: [
            {
                path: 'count',
                name: 'count',
                component: () => import('./views/count/count/index.vue'),
                meta: {title: '统计'},
                hidden: false,
            },
        ]
    },
    {
        path: '/tool',
        component: Layout,
        meta: {title: '工具', icon: 'tool'},
        children: [
            {
                path: 'tool',
                name: 'tool',
                component: () => import('./views/tool/tool/index.vue'),
                meta: {title: '工具'},
                hidden: false,
            },
        ]
    },
    {
        path: "*",
        redirect: "/404",
        hidden: true,
    },
]

const createRouter = () =>
    new Router({
        mode: "history", // require service support , 非history模式，离开页面效果有bug
        scrollBehavior: () => ({
            y: 0,
        }),
        routes: asyncRoutes,
    });

const router = createRouter()
/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
router.onError((error) => {
    console.log("router error:", error)
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});
router.beforeEach((to, from, next) => {
    // chrome
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    // safari
    window.pageYOffset = 0
    next()
})

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
