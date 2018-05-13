import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
import infiniteScroll from 'vue-infinite-scroll'
import 'babel-polyfill'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import filters from './filters'
import config from '@/service/config/base'

import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI)
Vue.use(infiniteScroll)

Vue.config.productionTip = false
Vue.prototype.$_baseURL = config.baseURL
Vue.prototype.$_type = sessionStorage.getItem('type')
Vue.prototype.$_uploadURL = '/takeaway/upload/uploadfile'
// Vue.prototype.$_uploadURL = '/upload/uploadfile'

// 声明过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
