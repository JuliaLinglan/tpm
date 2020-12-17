import request from '../utils/request'

export function login(data) {
    return request({
        url: '/api/User/Logintest',
        method: 'post',
        data: data,
    })
}

export function departmentInfos() {
    return request({
        url: '/ser/weather/weather',
        method: 'get',
    })
}

