import http from '@/service'

export default {
  state: {
    feedbacksList: []
  },
  actions: {
    getFeedbacksList({ commit }, userId) {
      http.getFeedbacksList({ userId }).then(res => res.code === 200 && commit('getFeedbacksList', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getFeedbacksList(state, feedbacksListResult) {
      state.feedbacksList = feedbacksListResult.data.feedbacks
      // state.feedbacksTotal = feedbacksListResult.data.totalCount
    }
  }
}
