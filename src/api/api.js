import request from '../utils/request'

export function login(data) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data: data,
    })
}

export function getInfo(token) {
    return request({
        url: '/api/auth/getInfoTPM',
        method: 'post',
        data: {token}
    })
}
export function departmentInfos() {
    return request({
        url: '/api/department/info',
        method: 'get',
    })
}

