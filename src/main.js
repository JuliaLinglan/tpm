import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
Vue.use(ElementUI, {locale})
import "@/directives/el-drag/elDailogDrag";
import dict from "@/common/dict";
import InputNumber from "./components/InputNumber"
Vue.use(InputNumber);
import errMsg from "./common/errMessage"
Vue.use(errMsg)


import './permission' // permission control
import store from './store/index'
import '@/icons' // icon

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
