import http from '@/service'

export default {
  state: {
    shopList: {},
    saveShopResult: {},
    editShopResult: {}
  },
  actions: {
    // 获取商户列表
    getShopList({ commit }, pagination) {
      http.getShopList(pagination).then(res => commit('getShopList', res)).catch(err => console.log(err))
    },
    // 添加商户信息
    saveShop({ commit }, shopInfo) {
      http.saveShop(shopInfo).then(res => commit('saveShop', res)).catch(err => console.log(err))
    },
    // 编辑商户信息
    editShop({ commit }, shopInfo) {
      http.editShop(shopInfo).then(res => commit('editShop', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    // 获取商户列表
    getShopList(state, shopList) {
      state.shopList = shopList.data.merchants
    },
    // 添加商户信息
    saveShop(state, saveShopResult) {
      state.saveShopResult = saveShopResult
    },
    // 编辑商户信息
    editShop(state, editShopResult) {
      state.editShopResult = editShopResult
    }
  }
}
