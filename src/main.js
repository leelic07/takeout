import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import infiniteScroll from 'vue-infinite-scroll'
import 'babel-polyfill'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import filters from './filters'
import components from '@/components'
import config from '@/service/config/base'
import { agency } from '@/service/base/service'

import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(infiniteScroll)

Vue.config.productionTip = false
Vue.prototype.$_baseURL = config.baseURL
Vue.prototype.$_type = sessionStorage.getItem('type')
Vue.prototype.$_uploadURL = `${agency}/upload/uploadfile`

// 声明过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
// 声明公共组件
Object.keys(components).forEach(key => Vue.component(key, components[key]))

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
