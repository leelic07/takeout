import http from '@/service'

export default {
  state: {
    orderList: []
  },
  actions: {
    // 获取接单信息
    getOrderAcceptionList({ commit }, pagination) {
      http.getOrderAcceptionList(pagination).then(res => commit('getOrderAcceptionList', res)).catch(err => err)
    },
    // 获取预订单信息
    getOrderReservationList({ commit }, pagination) {
      http.getOrderReservationList(pagination).then(res => commit('getOrderReservationList', res)).catch(err => err)
    }
  },
  mutations: {
    // 获取接单信息
    getOrderAcceptionList(state, orderAcceptionList) {
      state.orderList = orderAcceptionList.data.orders
    },
    // 获取预订单信息
    getOrderReservationList(state, orderReservationList) {
      state.orderList = orderReservationList.data.orders
    }
  }
}
