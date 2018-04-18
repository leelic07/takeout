import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import shop from './modules/shop'
import order from './modules/order'
import goods from './modules/goods'
import activity from './modules/activity'
import upload from './modules/upload'
import member from './modules/member'
import customer from './modules/customer'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    shop,
    order,
    goods,
    activity,
    upload,
    member,
    customer
  },
  getters
})

export default store
