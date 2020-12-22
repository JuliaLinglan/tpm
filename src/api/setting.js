import request from '../utils/request'

/**
 * 主显示屏
 * @param params
 * @returns {AxiosPromise}
 */
export function getMaindisplayList(params) {
    return request({url: '/ser/maindisplay/list', method: 'get', params: params})
}

export function addMaindisplay(data, pageIndex, pageSize) {
    return request({
        url: '/ser/maindisplay/add?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

export function updateMaindisplay(data, pageIndex, pageSize) {
    return request({
        url: '/ser/maindisplay/update?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

export function deleteMaindisplay(data, pageIndex, pageSize) {
    return request({
        url: '/ser/maindisplay/delete?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}
/**
 * 服务台
 * @param params
 * @returns {AxiosPromise}
 */
export function getMsdisplayList(params) {
    return request({url: '/ser/msdisplay/list', method: 'get', params: params})
}

export function addMsdisplay(data, pageIndex, pageSize) {
    return request({
        url: '/ser/msdisplay/add?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

export function updateMsdisplay(data, pageIndex, pageSize) {
    return request({
        url: '/ser/msdisplay/update?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

export function deleteMsdisplay(data, pageIndex, pageSize) {
    return request({
        url: '/ser/msdisplay/delete?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

/**
 * 系统功能设置
 * @param params
 * @returns {AxiosPromise}
 */
export function getSysFunctionList(params) {
    return request({url: '/ser/setting/list', method: 'get', params: params})
}

export function addSysFunction(data, pageIndex, pageSize) {
    return request({
        url: '/ser/setting/add?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

export function updateSysFunction(data, pageIndex, pageSize) {
    return request({
        url: '/ser/setting/update?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

export function deleteSysFunction(data, pageIndex, pageSize) {
    return request({
        url: '/ser/setting/delete?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}
/**
 * 服务类别设置
 * @param params
 * @returns {AxiosPromise}
 */
export function getSrvGroupList(params) {
    return request({url: '/ser/srvgroup/list', method: 'get', params: params})
}

export function addSrvGroup(data, pageIndex, pageSize) {
    return request({
        url: '/ser/srvgroup/add?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

export function updateSrvGroup(data, pageIndex, pageSize) {
    return request({
        url: '/ser/srvgroup/update?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

export function deleteSrvGroup(data, pageIndex, pageSize) {
    return request({
        url: '/ser/srvgroup/delete?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

/**
 * 员工设置
 * @param params
 * @returns {AxiosPromise}
 */
export function getStaffList(params) {
    return request({url: '/ser/staffinfo/list', method: 'get', params: params})
}

export function addStaff(data, pageIndex, pageSize) {
    return request({
        url: '/ser/staffinfo/add?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

export function updateStaff(data, pageIndex, pageSize) {
    return request({
        url: '/ser/staffinfo/update?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

export function deleteStaff(data, pageIndex, pageSize) {
    return request({
        url: '/ser/staffinfo/delete?pageIndex=' + pageIndex + "&pageSize=" + pageSize,
        method: 'post',
        data: data
    })
}

