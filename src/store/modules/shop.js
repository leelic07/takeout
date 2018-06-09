import http from '@/service'
import router from '@/router'
const type = sessionStorage['type']

export default {
  state: {
    shopList: [],
    saveShopResult: {},
    editShopResult: {},
    shopTypeList: [],
    saveMerchantTypeResult: {},
    merchantTypePage: [],
    merchantTypeTotal: 0,
    updateMerchantTypeResult: {},
    deleteMerchantTypeResult: {},
    merchantTypeForEdit: {},
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
      const pictures = []
      shopInfo.startDate = shopInfo.time[0] || ''
      shopInfo.endDate = shopInfo.time[1] || ''
      shopInfo.pictures.forEach(picture => {
        pictures.push({
          url: picture
        })
      })
      shopInfo.pictures = pictures
      delete shopInfo.time
      http.saveShop(shopInfo).then(res => res.code === 200 && commit('saveShop', res)).catch(err => console.log(err))
    },
    getShopTypeList({ commit }) {
      http.getShopTypeList().then(res => res.code === 200 && commit('getShopTypeList', res)).catch(err => console.log(err))
    },
    saveMerchantType({ commit }, data) {
      http.saveMerchantType(data).then(res => res.code === 200 && commit('saveMerchantType', res)).catch(err => console.log(err))
    },
    getMerchantTypePage({ commit }, param) {
      http.getMerchantTypePage(param).then(res => res.code === 200 && commit('getMerchantTypePage', res)).catch(err => console.log(err))
    },
    updateMerchantType({ commit }, data) {
      http.updateMerchantType(data).then(res => res.code === 200 && commit('updateMerchantType', res)).catch(err => console.log(err))
    },
    deleteMerchantType({ commit }, id) {
      http.deleteMerchantType({ id }).then(res => res.code === 200 && commit('deleteMerchantType', res)).catch(err => console.log(err))
    },
    editMerchantType({ commit }, id) {
      http.editMerchantType({ id }).then(res => res.code === 200 && commit('editMerchantType', res)).catch(err => console.log(err))
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
      const pictures = []
      if (shopInfo.time) {
        shopInfo.startDate = shopInfo.time[0]
        shopInfo.endDate = shopInfo.time[1]
      }
      shopInfo.pictures.forEach(picture => {
        picture.id ? pictures.push(picture)
          : pictures.push({
            url: picture
          })
      })
      shopInfo.pictures = pictures
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
    saveMerchantType(state, res) {
      state.saveMerchantTypeResult = res
    },
    getMerchantTypePage(state, res) {
      const data = res.data
      state.merchantTypePage = data.merchantTypes
      state.merchantTypeTotal = data.totalCount
    },
    updateMerchantType(state, res) {
      state.updateMerchantTypeResult = res
    },
    editMerchantType(state, res) {
      state.merchantTypeForEdit = res.data.merchantTypes
    },
    deleteMerchantType(state, res) {
      state.deleteMerchantTypeResult = res
    },
    getShopForEdit(state, shopForEditResult) {
      const shop = shopForEditResult.data.merchants
      shop.isOnline = shop.isOnline.toString()
      shop.startingPrice = shop.startingPrice ? shop.startingPrice.toString() : ''
      shop.fullFreeDistribution = shop.fullFreeDistribution ? shop.fullFreeDistribution.toString() : ''
      shop.distributionFee = shop.distributionFee ? shop.distributionFee.toString() : ''
      shop.time = []
      shop.time.push(new Date(shop.startDate))
      shop.time.push(new Date(shop.endDate))
      shop.pictures.forEach(picture => {
        picture.url && (picture.name = picture.url.substring(picture.url.lastIndexOf('/') + 1))
      })
      state.shopForEdit = shop
    },
    getMerchantsList(state, merchantsListResult) {
      state.merchantList = merchantsListResult.data.merchants
    },
    getMerchantsListByitemId(state, getMerchantsListResult) {
      const merchantsId = []
      const merchants = getMerchantsListResult.data.merchants
      merchants.forEach(merchant => {
        merchantsId.push(merchant.id)
      })
      state.merchantListByItemId = merchantsId
    },
    updateShop(state, updateShopResult) {
      state.updateShopResult = updateShopResult
      if (type === '1') {
        router.push({
          path: '/shop/list'
        })
      }
    },
    getMerchantsHomePage(state, merchantHomePageResult) {
      state.merchantHomePage = merchantHomePageResult.data.merchants || {}
    }
  }
}
