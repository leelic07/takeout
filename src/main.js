import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import infiniteScroll from 'vue-infinite-scroll'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import filters from './filters'

import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(infiniteScroll)

Vue.config.productionTip = false
// Vue.prototype.$_baseURL = 'http://localhost:8080/takeaway'
Vue.prototype.$_baseURL = 'http://47.106.143.22:8080/takeaway'
// Vue.prototype.$_baseURL = 'http://10.10.10.21:8080'

Vue.prototype.$_type = sessionStorage.getItem('type')

// 声明过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
