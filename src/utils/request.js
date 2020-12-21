import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {getToken} from '@/utils/auth'
import Message from "element-ui/packages/message/src/main";

const service = axios.create({
    publicPath: process.env.BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 100000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['token'] = getToken()
            config.headers['Authorization'] = "Bearer " + getToken()
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
        // console.log('err: ', error) // for debug
        let status = error.response.status
        if (status === 401) {
            alert("登录超时，请重新登录")
            // Message.error("Session expired.");
            store.dispatch('user/Logout').then(res => {
                next(`/`)
            })
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error.response.data);
        }
    }
)

export default service
