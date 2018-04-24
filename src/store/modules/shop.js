import http from '@/service'
import router from '@/router'

export default {
  state: {
    shopList: [],
    saveShopResult: {},
    editShopResult: {},
    shopTypeList: [],
    shopTotal: 0,
    shopForEdit: {},
    merchantList: [],
    merchantListByItemId: [],
    updateShopResult: {},
    merchantHomePage: {}
  },
  actions: {
    // 获取商户列表
    getShopList({ commit }, pagination) {
      http.getShopList(pagination).then(res => res.code === 200 && commit('getShopList', res)).catch(err => console.log(err))
    },
    // 添加商户信息
    saveShop({ commit }, shopInfo) {
      shopInfo.startDate = shopInfo.time[0] || ''
      shopInfo.endDate = shopInfo.time[1] || ''
      delete shopInfo.time
      http.saveShop(shopInfo).then(res => res.code === 200 && commit('saveShop', res)).catch(err => console.log(err))
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
      http.getMerchantsListByitemId({ itemId: id }).then(res => res.code === 200 && commit('getMerchantsListByitemId', res)).catch(err => console.log(err))
    },
    updateShop({ commit }, shopInfo) {
      http.updateShop(shopInfo).then(res => res.code === 200 && commit('updateShop', res)).catch(err => console.log(err))
    },
    getMerchantsHomePage({ commit }, merchantId) {
      http.getMerchantsHomePage({ merchantId }).then(res => res.code === 200 && commit('getMerchantsHomePage', res)).catch(err => console.log(err))
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
      router.push({
        path: '/shop/list'
      })
    },
    getShopTypeList(state, shopTypeResult) {
      state.shopTypeList = shopTypeResult.data.merchantTypes
    },
    getShopForEdit(state, shopForEditResult) {
      const shop = shopForEditResult.data.merchants
      shop.isOnline = shop.isOnline ? shop.isOnline.toString() : ''
      shop.time = []
      shop.time.push(shop.startDate)
      shop.time.push(shop.endDate)
      state.shopForEdit = shop
    },
    getMerchantsList(state, merchantsListResult) {
      state.merchantList = merchantsListResult.data.merchants
    },
    getMerchantsListByitemId(state, getMerchantsListResult) {
      state.merchantListByItemId = getMerchantsListResult.data.merchants
    },
    updateShop(state, updateShopResult) {
      state.updateShopResult = updateShopResult
    },
    getMerchantsHomePage(state, merchantHomePageResult) {
      state.merchantHomePage = merchantHomePageResult.data.merchants
    }
  }
}
