import { MessageBox } from 'element-ui';

export default {
    install(Vue, options) {
        Vue.prototype.$errMsg = function (message, callback) {
            MessageBox({
                title: '错误提示',
                message: message,
                showCancelButton: false,
                showClose: false,
                type: 'error',
            }).then(action => {
                if (callback) {
                    callback(action)
                }
            }).catch(action => {
            })
        };

        Vue.prototype.$errConfirmMsg = function (message, btnText, callback, cancelCallback) {
            MessageBox({
                title: '错误提示',
                message: message,
                showCancelButton: true,
                showClose: false,
                confirmButtonText: btnText,
                cancelButtonText: '取消',
                type: 'error',

            }).then(action => {
                if (callback) {
                    callback(action)
                }
            }).catch(action => {
                if (cancelCallback) {
                    cancelCallback(action)
                }
            })
        };
    }
}


