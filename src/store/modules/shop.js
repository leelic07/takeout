import http from '@/service'
import { parseTime } from '@/utils'

export default {
  state: {
    shopList: [],
    saveShopResult: {},
    editShopResult: {},
    shopTypeList: [],
    shopTotal: 0,
    shopForEdit: {},
    merchantList: [],
    merchantListByItemId: []
  },
  actions: {
    // 获取商户列表
    getShopList({ commit }, pagination) {
      http.getShopList(pagination).then(res => commit('getShopList', res)).catch(err => console.log(err))
    },
    // 添加商户信息
    saveShop({ commit }, shopInfo) {
      shopInfo.startDate = parseTime(shopInfo.time[0])
      shopInfo.endDate = parseTime(shopInfo.time[1])
      delete shopInfo.time
      http.saveShop(shopInfo).then(res => commit('saveShop', res)).catch(err => console.log(err))
    },
    // 编辑商户信息
    editShop({ commit }, shopInfo) {
      http.editShop(shopInfo).then(res => commit('editShop', res)).catch(err => console.log(err))
    },
    getShopTypeList({ commit }) {
      http.getShopTypeList().then(res => res.code === 200 && commit('getShopTypeList', res)).catch(err => console.log(err))
    },
    getShopForEdit({ commit }, id) {
      http.getShopForEdit({ id }).then(res => res.code === 200 && commit('getShopForEdit', res)).catch(err => console.log(err))
    },
    getMerchantsList({ commit }) {
      http.getMerchantsList().then(res => res.code === 200 && commit('getMerchantsList', res)).catch(err => console.log(err))
    },
    getMerchantsListByitemId({ commit }, id) {
      http.getMerchantsListByitemId({ id }).then(res => res.code === 200 && commit('getMerchantsListByitemId', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    // 获取商户列表
    getShopList(state, shopList) {
      state.shopList = shopList.data.merchants
      state.shopTotal = shopList.data.totalCount
    },
    // 添加商户信息
    saveShop(state, saveShopResult) {
      state.saveShopResult = saveShopResult
    },
    // 编辑商户信息
    editShop(state, editShopResult) {
      state.editShopResult = editShopResult
    },
    getShopTypeList(state, shopTypeResult) {
      state.shopTypeList = shopTypeResult.data.merchantTypes
    },
    getShopForEdit(state, shopForEditResult) {
      const shop = shopForEditResult.data.merchants
      shop.isOnline = shop.isOnline.toString()
      state.shopForEdit = shop
    },
    getMerchantsList(state, merchantsListResult) {
      state.merchantList = merchantsListResult.data.merchants
    },
    getMerchantsListByitemId(state, getMerchantsListResult) {
      state.merchantListByItemId = getMerchantsListResult.data.merchants
    }
  }
}
