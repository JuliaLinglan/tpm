import Vue from 'vue'
import {login, getInfo} from '@/api/api'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'


const state = {
    token: getToken(),
    userId:'',
    username: '',
    // avatar: '',
    // introduction: '',
    roles: [],
    role: '',
    // logo: '',
    // unit: '',
    // tab: null,
    isLogin: true,
}

const mutations = {
    SET_LOGIN: (state, flag) => {
        state.isLogin = flag
    },

    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERID:(state,userId)=>{
        state.userId=userId;
        Vue.set(state, 'userId', userId)
    },
    SET_NAME: (state, username) => {
        state.username = username
        Vue.set(state, 'username', username)
    },
    // SET_AVATAR: (state, avatar) => {
    //     state.avatar = avatar
    // },
    SET_ROLES: (state, roles) => {
        state.roles = roles
        Vue.set(state, 'roles', roles)
    },
    SET_ROLE: (state, role) => {
        Vue.set(state, 'role', role)
    },
    // SET_COMPANY: (state, company) => {
    //     Vue.set(state, 'company', company)
    // },
    // SET_LOGO: (state, logo) => {
    //     Vue.set(state, 'logo', logo)
    // },
    // SET_STATUS: (state, status) => {
    //     Vue.set(state, 'status', status)
    // },
    // SET_EMAIL: (state, email) => {
    //     Vue.set(state, 'email', email)
    // },
    // SET_UNIT: (state, unit) => {
    //     state.unit = unit
    //     Vue.set(state, 'unit', unit)
    // },
    // SET_TAG: (state,tag) => {
    //     state.tag = tag
    //     Vue.set(state,'tag',tag);
    // },
    // SET_ROUTES: (state, roles) => {
    //     state.routes = asyncRoutes;
    // }
}

const actions = {
    Login({commit}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            login({username: username.trim(), password: password}).then(response => {
                let result = response.data.result
                commit('SET_TOKEN', result.token)
                commit('SET_NAME', result.username)
                commit('SET_USERID', result.userId)
                commit('SET_LOGIN', true)
                setToken(result.token)
                resolve(response)
            }).catch(error => {
                console.log("登录失败", error)
                reject(error)
            })
        })
    },

    GetInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                let result = response.data.result
                console.log("bbbbbb")
                console.log(result)
                if (!result) {
                    reject('用户认证失败，请重新登录！')
                }
                let role = result.role
                let roles = [role]
                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }
                commit('SET_TOKEN', result.token)
                commit('SET_ROLES', roles)
                commit('SET_ROLE', role)
                commit('SET_USERID', result.userId)
                commit('SET_NAME', result.username)
                // commit('SET_COMPANY', result.company)
                // commit('SET_LOGO', result.logo)
                // commit('SET_STATUS', result.status)
                // commit('SET_EMAIL', result.email)
                // commit('SET_UNIT', result.unit)
                // commit('SET_TAG',result.tag)
                commit('SET_LOGIN', true)
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    },

    Logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_ROLE', '')
            // commit('SET_COMPANY', '')
            // commit('SET_LOGO', '')
            // commit('SET_TAG',null)
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
