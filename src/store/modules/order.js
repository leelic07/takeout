import http from '@/service'

export default {
  state: {
    orderAcceptionList: [],
    orderReservationList: [],
    orderRetreatList: [],
    orderRecordsList: [],
    orderReminderList: []
  },
  actions: {
    // 获取接单信息
    getOrderAcceptionList({ commit }, pagination) {
      http.getOrderAcceptionList(pagination).then(res => res.code === 200 && commit('getOrderAcceptionList', res)).catch(err => console.log(err))
    },
    // 获取预订单信息
    getOrderReservationList({ commit }, pagination) {
      http.getOrderReservationList(pagination).then(res => res.code === 200 && commit('getOrderReservationList', res)).catch(err => console.log(err))
    },
    getOrderReservationByStatus({ commit }, pagination) {
      const status = pagination.status
      delete pagination.status
      http.getOrderReservationList(pagination).then(res => res.code === 200 && commit('getOrderReservationByStatus', { ...res, status })).catch(err => console.log(err))
    },
    getOrderAcceptionByStatus({ commit }, pagination) {
      const status = pagination.status
      delete pagination.status
      http.getOrderAcceptionList(pagination).then(res => res.code === 200 && commit('getOrderAcceptionByStatus', { ...res, status })).catch(err => console.log(err))
    },
    getOrderRetreatList({ commit }, pagination) {
      http.getOrderRetreatList(pagination).then(res => res.code === 200 && commit('getOrderRetreatList', res)).catch(err => console.log(err))
    },
    getOrderRetreatByStatus({ commit }, pagination) {
      const status = pagination.status
      delete pagination.status
      http.getOrderRetreatList(pagination).then(res => res.code === 200 && commit('getOrderRetreatByStatus', { ...res, status })).catch(err => console.log(err))
    },
    getOrderRecordsList({ commit }, pagination) {
      http.getOrderRecordsList(pagination).then(res => res.code === 200 && commit('getOrderRecordsList', res)).catch(err => console.log(err))
    },
    getOrderReminderByStatus({ commit }, pagination) {
      const status = pagination.status
      delete pagination.status
      http.getOrderReminderByStatus(pagination).then(res => res.code === 200 && commit('getOrderReminderByStatus', { ...res, status })).catch(err => console.log(err))
    }
  },
  mutations: {
    // 获取接单信息
    getOrderAcceptionList(state, orderAcceptionList) {
      state.orderAcceptionList = orderAcceptionList.data.orders
    },
    // 获取预订单信息
    getOrderReservationList(state, orderReservationList) {
      state.orderReservationList = orderReservationList.data.orders
    },
    getOrderReservationByStatus(state, orderReservationList) {
      const orders = orderReservationList.data.orders
      const status = orderReservationList.status
      state.orderReservationList = orders.filter(order => order.status === Number(status))
    },
    getOrderAcceptionByStatus(state, orderAcceptionList) {
      const orders = orderAcceptionList.data.orders
      const status = orderAcceptionList.status
      state.orderAcceptionList = orders.filter(order => order.status === Number(status))
    },
    getOrderRetreatList(state, orderRetreatList) {
      state.orderRetreatList = orderRetreatList.data.orders
    },
    getOrderRetreatByStatus(state, orderRetreatList) {
      const orders = orderRetreatList.data.orders
      const status = orderRetreatList.status
      state.orderRetreatList = orders.filter(order => order.status === Number(status))
    },
    getOrderRecordsList(state, orderRecordsList) {
      state.orderRecordsList = orderRecordsList.data.orders
    },
    getOrderReminderByStatus(state, orderReminderList) {
      const orders = orderReminderList.data.orders
      const status = orderReminderList.status
      state.orderReminderList = orders.filter(order => order.status === Number(status))
    }
  }
}
