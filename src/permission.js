import store from './store'
import router from './router'
import Cookies from "js-cookie";

let whiteList = ['/login']
import {Message} from 'element-ui'

router.beforeEach(async (to, from, next) => {
    Message.closeAll()
    //获取token
    // let hasToken = Cookies.get("token")
    let hasToken = true
    if (hasToken) {
        if (to.path === '/login') {
            next(`/`)
        } else {
            try {
                store.dispatch('user/generateRoutes').then((accessRoutes) => {
                    let pathInfo = JSON.stringify({path: from.path, query: from.query})
                    localStorage.setItem("path", pathInfo)
                    // console.log("path: ",pathInfo)
                    next()
                }).catch(err => {
                    console.log('generateRoutes error', err)
                    store.dispatch('user/Logout').then(res => {
                        next(`/login?redirect=${to.path}`)
                    })
                })
            } catch (error) {
                alert(error || 'Has Error')
                next(`/login?redirect=${to.path}`)
            }
        }
    } else {
        //没有token
        if (whiteList.includes(to.path)) {
            // 白名单直接进入
            next()
        } else {
            // 不在白名单，将to.path放到query中，等待之后解析
            next(`/login?redirect=${to.path}`)
        }
    }
})
