import http from '@/service'

export default {
  state: {
    activityList: [],
    activityTotal: 0,
    couponList: [],
    // couponTotal: 0,
    couponSendTypes: [],
    activityForEdit: {},
    updateActivityResult: {},
    couponTypeList: [],
    saveActivityResult: {},
    saveCouponResult: {}
  },
  actions: {
    getActivityList({ commit }, pagination) {
      delete pagination.activityType
      http.getActivityList(pagination).then(res => res.code === 200 && commit('getActivityList', res)).catch(err => console.log(err))
    },
    getCouponList({ commit }, pagination) {
      delete pagination.activityType
      http.getCouponList(pagination).then(res => res.code === 200 && commit('getCouponList', res)).catch(err => console.log(err))
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
    },
    getCouponTypeList({ commit }) {
      http.getCouponTypeList().then(res => res.code === 200 && commit('getCouponTypeList', res)).catch(err => console.log(err))
    },
    saveActivity({ commit }, activity) {
      http.saveActivity(activity).then(res => res.code === 200 && commit('saveActivity', res)).catch(err => console.log(err))
    },
    saveCoupon({ commit }, coupon) {
      http.saveCoupon(coupon).then(res => res.code === 200 && commit('saveCoupon', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getActivityList(state, activityListResult) {
      const data = activityListResult.data
      state.activityList = data.activitys
      state.activityTotal = data.totalCount
    },
    getCouponList(state, couponListResult) {
      const data = couponListResult.data
      state.couponList = data.coupons
      state.activityTotal = data.totalCount
    },
    editActivity(state, editActivityResult) {
      state.activityForEdit = editActivityResult.data.couponExchanges
    },
    updateActivity(state, updateActivityResult) {
      state.updateActivityResult = updateActivityResult
    },
    getCouponTypeList(state, couponTypeListResult) {
      state.couponSendTypes = couponTypeListResult.data.couponSendTypes
    },
    saveActivity(state, saveActivityResult) {
      state.saveActivityResult = saveActivityResult
    },
    saveCoupon(state, saveCouponResult) {
      state.saveCouponResult = saveCouponResult
    }
  }
}
