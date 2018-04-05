import http from '@/service'

export default {
  state: {
    shopList: {}
  },
  actions: {
    // 获取商户列表
    getShopList({ commit }, shopPagination) {
      http.getShopList(shopPagination).then(res => commit('getShopList', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    // 获取商户列表
    getShopList(state, shopList) {
      state.shopList = shopList.merchants
    }
  }
}
