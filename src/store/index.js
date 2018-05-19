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
import loading from './modules/loading'
import data from './modules/data'
import finance from './modules/finance'
import system from './modules/system'
import boss from './modules/boss'
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
    customer,
    loading,
    data,
    finance,
    system,
    boss
  },
  getters
})

export default store
