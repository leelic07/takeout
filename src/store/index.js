import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import shop from './modules/shop'
import order from './modules/order'
import goods from './modules/goods'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    shop,
    order,
    goods
  },
  getters
})

export default store
