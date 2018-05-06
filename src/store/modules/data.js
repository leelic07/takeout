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
      let startTime = ''
      let endTime = ''
      if (pagination.datetime) {
        startTime = pagination.datetime[0]
        endTime = pagination.datetime[1]
      }
      http.getBusinessList({ ...pagination, startTime, endTime }).then(res => res.code === 200 && commit('getBusinessList', res)).catch(err => console.log(err))
    },
    getAccessList({ commit }, pagination) {
      let startTime = ''
      let endTime = ''
      if (pagination.datetime) {
        startTime = pagination.datetime[0]
        endTime = pagination.datetime[1]
      }
      http.getAccessList({ ...pagination, startTime, endTime }).then(res => res.code === 200 && commit('getAccessList', res)).catch(err => console.log(err))
    },
    getSalesList({ commit }, pagination) {
      http.getSalesList(pagination).then(res => res.code === 200 && commit('getSalesList', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getBusinessList(state, businessListResult) {
      const data = businessListResult.data
      state.businessList = data.report
      state.businessTotal = data.totalCount
    },
    getAccessList(state, accessListResult) {
      const data = accessListResult.data
      state.accessList = data.report
      state.accessTotal = data.totalCount
    },
    getSalesList(state, salesListResult) {
      const data = salesListResult.data
      state.salesList = data.report
      state.salesTotal = data.totalCount
    }
  }
}
