import http from '@/service'

export default {
  state: {
    businessList: [],
    businessTotal: 0,
    salesList: [],
    salesTotal: 0,
    accessList: [],
    accessTotal: 0
  },
  actions: {
    getBusinessList({ commit }, pagination) {
      pagination.startTime = pagination.datetime[0]
      pagination.endTime = pagination.datetime[1]
      delete pagination.datetime
      http.getBusinessList(pagination).then(res => res.code === 200 && commit('getBusinessList', res)).catch(err => console.log(err))
    },
    getAccessList({ commit }, pagination) {
      pagination.startTime = pagination.datetime[0]
      pagination.endTime = pagination.datetime[1]
      delete pagination.datetime
      http.getAccessList(pagination).then(res => res.code === 200 && commit('getAccessList', res)).catch(err => console.log(err))
    },
    getSalesList({ commit }, pagination) {
      http.getSalesList(pagination).then(res => res.code === 200 && commit('getSalesList', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getBusinessList(state, businessListResult) {
      state.businessList = businessListResult.data.report
      state.businessTotal = businessListResult.data.totalCount
    },
    getAccessList(state, accessListResult) {
      state.accessList = accessListResult.data.report
      state.accessTotal = accessListResult.data.totalCount
    },
    getSalesList(state, salesListResult) {
      state.salesList = salesListResult.data.report
      state.salesTotal = salesListResult.data.totalCount
    }
  }
}
