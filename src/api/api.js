import request from '../utils/request'

export function login(data) {
    return request({
        url: '/api/User/Logintest',
        method: 'post',
        data: data,
    })
}

export function departmentInfos(params) {
    return request({
        url: '/ser/maindisplay/maindisplay',
        method: 'get',
        params: params
    })
}

export function addDepartment(data) {
    return request({
        url: '/ser/maindisplay/AddMainDisplay',
        method: 'post',
        data: data,
    })
}

