import http from '@/service'
import router from '@/router'
const mergeProperty = (array) => {
  array.forEach(arr => {
    arr.orderItems && arr.orderItems.forEach(item => {
      item.orderItemPropertys && item.orderItemPropertys.forEach((property, index, arr) => {
        if (arr.length === 1) item.itemName += `(${property.propertyName})`
        else item.itemName += index !== arr.length - 1 ? `(${property.propertyName}+` : `${property.propertyName})`
        item.itemPrice += property.price
      })
    })
  })
}

export default {
  state: {
    orderAcceptionList: [],
    orderReservationList: [],
    orderRetreatList: [],
    orderRecordsList: [],
    orderRecordsTotal: 0,
    orderReminderList: [],
    retreatResult: {},
    orderForPrint: {},
    distributionResult: {}
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
    getOrdersRecordsPage({ commit }, pagination) {
      http.getOrdersRecordsPage(pagination).then(res => res.code === 200 && commit('getOrdersRecordsPage', res)).catch(err => console.log(err))
    },
    getOrderReminderByStatus({ commit }, pagination) {
      const status = pagination.status
      delete pagination.status
      http.getOrderReminderByStatus(pagination).then(res => res.code === 200 && commit('getOrderReminderByStatus', { ...res, status })).catch(err => console.log(err))
    },
    retreatOrder({ commit }, refundOrder) {
      http.retreatOrder(refundOrder).then(res => res.code === 200 && commit('retreatOrder', res)).catch(err => err)
    },
    distributionOrder({ commit }, id) {
      http.distributionOrder({ id }).then(res => res.code === 200 && commit('distributionOrder', res)).catch(err => err)
    },
    async cancelDistribution({ commit }, param) {
      const res = await http.cancelDistribution(param)
      commit('cancelDistribution', res)
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
      if (status === 2) {
        state.orderReservationList = orders.filter(order => order.status === status)
      } else state.orderReservationList = orders.filter(order => order.status !== 2)
      mergeProperty(state.orderReservationList)
    },
    getOrderAcceptionByStatus(state, orderAcceptionList) {
      const orders = orderAcceptionList.data.orders
      const status = orderAcceptionList.status
      if (status === '2') {
        state.orderAcceptionList = orders.filter(order => order.status === status)
      } else state.orderAcceptionList = orders.filter(order => order.status !== '2' && order.status !== '8')
      state.orderAcceptionList.forEach(order => {
        if (order.status !== '5' && order.status !== '7' && order.status !== '9') order.isDistribution = true
      })
      mergeProperty(state.orderAcceptionList)
    },
    getOrderRetreatList(state, orderRetreatList) {
      state.orderRetreatList = orderRetreatList.data.orders
    },
    getOrderRetreatByStatus(state, orderRetreatList) {
      const orders = orderRetreatList.data.orders
      const status = orderRetreatList.status
      state.orderRetreatList = orders.filter(order => order.orders.isRefund === status)
      mergeProperty(state.orderRetreatList)
    },
    getOrderRecordsList(state, orderRecordsList) {
      const data = orderRecordsList.data
      state.orderRecordsList = data.orders
      state.orderRecordsTotal = data.totalCount
      mergeProperty(state.orderRecordsList)
    },
    getOrdersRecordsPage(state, orderRecordsList) {
      const data = orderRecordsList.data
      state.orderRecordsList = data.orders
      state.orderRecordsTotal = data.totalCount
      mergeProperty(state.orderRecordsList)
    },
    getOrderReminderByStatus(state, orderReminderList) {
      const orders = orderReminderList.data.orders
      const status = orderReminderList.status
      if (status === 2) {
        state.orderReminderList = orders.filter(order => order.status === status)
      } else state.orderReminderList = orders.filter(order => order.status !== 2)
      mergeProperty(state.orderReminderList)
    },
    retreatOrder(state, retreatResult) {
      state.retreatResult = retreatResult
    },
    printOrder(state, orderForPrint) {
      let order = ''
      if (orderForPrint.orders) {
        orderForPrint.orders.orderItems = orderForPrint.orderItems
        order = orderForPrint.orders
      } else order = orderForPrint
      state.orderForPrint = order
      router.push({
        path: '/system/setup'
      })
    },
    distributionOrder(state, res) {
      state.distributionResult = res
    }
  }
}
