import Vue from 'vue'
import {login} from '@/api/api'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {constantRoutes, asyncRoutes, resetRouter} from '@/router'

// /**
//  * Filter asynchronous routing tables by recursion
//  * @param routes asyncRoutes
//  * @param roles
//  */
// export function filterAsyncRoutes(routes) {
//     const res = []
//     routes.forEach(route => {
//         const tmp = {...route}
//         if (tmp.children) {
//             tmp.children = filterAsyncRoutes(tmp.children)
//         }
//         res.push(tmp)
//     })
//     return res
// }

const state = {
    token: getToken(),
    userId: '',
    username: '',
    routes: [],
    addRoutes: []

}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERID: (state, userId) => {
        state.userId = userId;
        Vue.set(state, 'userId', userId)
    },
    SET_NAME: (state, username) => {
        state.username = username
        Vue.set(state, 'username', username)
    },
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes

        state.routes = constantRoutes.concat(routes)
        // state.routes = asyncRoutes
    }
}

const actions = {
    generateRoutes({commit}) {
        return new Promise(resolve => {
            // let accessedRoutes = filterAsyncRoutes(asyncRoutes)
            let accessedRoutes = asyncRoutes
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        }).catch(function (reason) {
            //有选择性的在此处抛出错误或不抛出
            console.log('catch:', reason);
        });
    },
    Login({commit}, userInfo) {
        const {username, password} = userInfo
        let form = new FormData();
        form.append('user',username.trim())
        form.append('password',password)
        return new Promise((resolve, reject) => {
            login(form).then(response => {
                let result = response.data.result
                commit('SET_TOKEN', result.token)
                commit('SET_NAME', result.username)
                commit('SET_USERID', result.userId)
                commit('SET_ROUTES', null)
                setToken(result.token)
                resolve(response)
            }).catch(error => {
                console.log("登录失败", error)
                reject(error)
            })
        })
    },

    Logout({commit, state}) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            commit('SET_ROUTES', null)
            removeToken()
            resetRouter()
            resolve()
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
