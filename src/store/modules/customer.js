import http from '@/service'

export default {
  state: {
    feedbacksList: [],
    feedbacksTotal: 0
  },
  actions: {
    getFeedbacksList({ commit }, userId) {
      http.getFeedbacksList({ userId }).then(res => res.code === 200 && commit('getFeedbacksList', res)).catch(err => console.log(err))
    },
    getFeedbacksPage({ commit }, pagination) {
      http.getFeedbacksPage(pagination).then(res => res.code === 200 && commit('getFeedbacksPage', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getFeedbacksList(state, feedbacksListResult) {
      state.feedbacksList = feedbacksListResult.data.feedbacks
      // state.feedbacksTotal = feedbacksListResult.data.totalCount
    },
    getFeedbacksPage(state, feedbacksPageResult) {
      state.feedbacksList = feedbacksPageResult.data.feedbacks
      state.feedbacksTotal = feedbacksPageResult.data.totalCount
    }
  }
}
