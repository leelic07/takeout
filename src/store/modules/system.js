import http from '@/service'
import router from '@/router'

export default {
  state: {
    userRanksResult: {},
    deliveryTimeResult: {},
    advertisements: [],
    advertisementsTotal: 0,
    adForEdit: {},
    saveAdResult: {},
    updateAdResult: {},
    withdrawBannerResult: {},
    userRanks: {},
    updateRanksResult: {}
  },
  actions: {
    saveUserRanks({ commit }, rank) {
      http.saveUserRanks(rank).then(res => res.code === 200 && commit('saveUserRanks', res)).catch(err => console.log(err))
    },
    getUserRanks({ commit }) {
      http.getUserRanks().then(res => res.code === 200 && commit('getUserRanks', res)).catch(err => console.log(err))
    },
    updateUserRanks({ commit }, rank) {
      http.updateUserRanks(rank).then(res => res.code === 200 && commit('updateUserRanks', res)).catch(err => console.log(err))
    },
    updateDeliveryTime({ commit }, time) {
      delete time.oldDeliveryTime
      http.updateDeliveryTime(time).then(res => res.code === 200 && commit('updateDeliveryTime', res)).catch(err => console.log(err))
    },
    getAdvertisements({ commit }, ad) {
      http.getAdvertisements(ad).then(res => res.code === 200 && commit('getAdvertisement', res)).catch(err => console.log(err))
    },
    withdrawBanner({ commit }, banner) {
      http.withdrawBanner(banner).then(res => res.code === 200 && commit('withdrawBanner', res)).catch(err => console.log(err))
    },
    editBanner({ commit }, id) {
      http.editBanner({ id }).then(res => res.code === 200 && commit('editBanner', res)).catch(err => console.log(err))
    },
    saveAdvertisement({ commit }, ad) {
      http.saveAdvertisement(ad).then(res => res.code === 200 && commit('saveAdvertisement', res)).catch(err => console.log(err))
    },
    updateBanner({ commit }, ad) {
      http.updateBanner(ad).then(res => res.code === 200 && commit('updateBanner', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    saveUserRanks(state, userRanksResult) {
      state.userRanksResult = userRanksResult
    },
    getUserRanks(state, res) {
      state.userRanks = res.data.userRanks
    },
    updateUserRanks(state, res) {
      state.updateRanksResult = res
    },
    updateDeliveryTime(state, deliveryTimeResult) {
      state.deliveryTimeResult = deliveryTimeResult
    },
    getAdvertisement(state, res) {
      const data = res.data
      state.advertisements = data.advertisements
      state.advertisementsTotal = data.totalCount
    },
    withdrawBanner(state, res) {
      state.withdrawBannerResult = res
    },
    editBanner(state, res) {
      const data = res.data
      state.adForEdit = data.advertisements
    },
    saveAdvertisement(state, res) {
      state.saveAdResult = res
      router.push({
        path: '/system/banner'
      })
    },
    updateBanner(state, res) {
      state.updateAdResult = res
      router.push({
        path: '/system/banner'
      })
    }
  }
}
