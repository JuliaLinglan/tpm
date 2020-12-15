import router from './router'
import store from './store'
import {getToken} from '@/utils/auth'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach(async (to, from, next) => {
    const hasToken = getToken()
    if (hasToken) {
        // determine whether the user has obtained his permission roles through getInfo
        const hasRoles = store.getters.role
        if (to.path === '/login') {
            next(`/`)
        }
        if (hasRoles) {
            next()
        } else {
            if (whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                store.dispatch('user/GetInfo').then(userInfo => {
                    let role = userInfo.role
                    store.dispatch('permission/generateRoutes', [role]).then((accessRoutes) => {
                        router.addRoutes(accessRoutes)
                        // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                        next({ ...to, replace: true })
                    }).catch(err => {
                        console.log('generateRoutes error', err)
                        store.dispatch('user/Logout').then(res => {
                            next(`/login?redirect=${to.path}`)
                        })
                    })
                }).catch( (result) => {
                    let status = result.response? result.response.status:403
                    if (status === 403 || status === 401) {
                        if (whiteList.indexOf(to.path) !== -1) {
                            next()
                        } else {
                            next(`/login?redirect=${to.path}`)
                        }
                    } else {
                        next(`/login?redirect=${to.path}`)
                    }
                })
            }
        }
    } else {
        console.log("no token")
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('login')
        }

    }
})
