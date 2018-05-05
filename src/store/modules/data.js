import http from '@/service'

export default {
  state: {
    accessList: [],
    businessList: [],
    businessTotal: 0
  },
  actions: {
    getBusinessList({ commit }, pagination) {
      pagination.startTime = pagination.datetime[0]
      pagination.endTime = pagination.datetime[1]
      delete pagination.datetime
      http.getBusinessList(pagination).then(res => res.code === 200 && commit('getBusinessList', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getBusinessList(state, businessListResult) {
      state.businessList = businessListResult.data.report
      state.businessTotal = businessListResult.data.totalCount
    }
  }
}
