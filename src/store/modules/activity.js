import http from '@/service'

export default {
  state: {
    activityList: [],
    activityTotal: 0,
    activityForEdit: {},
    updateActivityResult: {}
  },
  actions: {
    getActivityList({ commit }, pagination) {
      http.getActivityList(pagination).then(res => res.code === 200 && commit('getActivityList', res)).catch(err => console.log(err))
    },
    editActivity({ commit }, id) {
      http.editActivity({ id }).then(res => res.code === 200 && commit('editActivity', res)).catch(err => console.log(err))
    },
    updateActivity({ commit }, activity) {
      const params = {
        id: activity.id,
        code: activity.code,
        startDate: activity.startDate,
        endDate: activity.endDate
      }
      http.updateActivity(params).then(res => res.code === 200 && commit('updateActivity', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getActivityList(state, activityListResult) {
      const data = activityListResult.data
      state.activityList = data.couponExchanges
      state.activityTotal = data.totalCount
    },
    editActivity(state, editActivityResult) {
      state.activityForEdit = editActivityResult.data.couponExchanges
    },
    updateActivity(state, updateActivityResult) {
      state.updateActivityResult = updateActivityResult
    }
  }
}
