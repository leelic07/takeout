import http from '@/service'

export default {
  state: {
    userRanksResult: {},
    deliveryTimeResult: {}
  },
  actions: {
    saveUserRanks({ commit }, rank) {
      http.saveUserRanks(rank).then(res => res.code === 200 && commit('saveUserRanks', res)).catch(err => console.log(err))
    },
    updateDeliveryTime({ commit }, time) {
      http.updateDeliveryTime(time).then(res => res.code === 200 && commit('updateDeliveryTime', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    saveUserRanks(state, userRanksResult) {
      state.userRanksResult = userRanksResult
    },
    updateDeliveryTime(state, deliveryTimeResult) {
      state.deliveryTimeResult = deliveryTimeResult
    }
  }
}
