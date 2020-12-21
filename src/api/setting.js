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

