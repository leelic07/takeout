import http from '@/service'

export default {
  state: {
    feedbacksList: [],
    feedbacksTotal: 0,
    replyResult: {}
  },
  actions: {
    getFeedbacksList({ commit }, userId) {
      http.getFeedbacksList({ userId }).then(res => res.code === 200 && commit('getFeedbacksList', res)).catch(err => console.log(err))
    },
    getFeedbacksPage({ commit }, pagination) {
      http.getFeedbacksPage(pagination).then(res => res.code === 200 && commit('getFeedbacksPage', res)).catch(err => console.log(err))
    },
    getFeedbacksByEvaluate({ commit }, pagination) {
      const evaluate = pagination.evaluate
      delete pagination.evaluate
      http.getFeedbacksPage(pagination).then(res => res.code === 200 && commit('getFeedbacksByEvaluate', Object.assign(res, { evaluate }))).catch(err => console.log(err))
    },
    replyFeedbacks({ commit }, reply) {
      http.replyFeedbacks(reply).then(res => res.code === 200 && commit('replyFeedbacks', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getFeedbacksList(state, feedbacksListResult) {
      state.feedbacksList = feedbacksListResult.data.feedbacks.data
      // state.feedbacksTotal = feedbacksListResult.data.totalCount
    },
    getFeedbacksPage(state, feedbacksPageResult) {
      const feedbacks = feedbacksPageResult.data.feedbacks
      feedbacks.forEach(data => {
        data.goodsScore = Number(data.goodsScore)
        data.distributionScore = Number(data.distributionScore)
      })
      state.feedbacksList = feedbacks
      state.feedbacksTotal = feedbacksPageResult.data.totalCount
    },
    getFeedbacksByEvaluate(state, res) {
      const evaluate = res.evaluate
      const data = res.data
      evaluate !== '0' && (data.feedbacks = data.feedbacks.filter(feed => feed.evaluate === evaluate))
      data.feedbacks.forEach(data => {
        data.goodsScore = Number(data.goodsScore)
        data.distributionScore = Number(data.distributionScore)
      })
      state.feedbacksList = data.feedbacks
      state.feedbacksTotal = data.totalCount
    },
    replyFeedbacks(state, res) {
      state.replyResult = res
    }
  }
}
