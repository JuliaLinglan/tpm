import index from './index.vue'
const InputNumber = {
    install: function (Vue) {
        // 注册并获取组件，然后在main.js中引用，在Vue.use()就可以了
        Vue.component('InputNumber', index)
    }
}
export default InputNumber