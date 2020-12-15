import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import router from '@/router'
import {getToken} from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 100000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        // console.log('err' + error) // for debug
        let status = error.response.status
        if (status === 401) {
            // Message.error("Session expired.");
            store.dispatch('user/Logout').then(res => {
            }).catch(() => {
            })
            router.push('/index')
            return Promise.reject(error);
        } else {
            return Promise.reject(error);
        }
    }
)

export default service
