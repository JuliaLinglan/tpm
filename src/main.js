import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import VueQuillEditor from 'vue-quill-editor'
import locale from 'element-ui/lib/locale/lang/en'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
Vue.use(ElementUI, {locale}, VueQuillEditor)

import './permission' // permission control
import store from './store/index'
import '@/icons' // icon

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
