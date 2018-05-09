import http from '@/service'
import router from '@/router'

export default {
  state: {
    activityList: [],
    activityTotal: 0,
    couponList: [],
    // couponTotal: 0,
    couponSendTypes: [],
    activityForEdit: {},
    couponForEdit: {},
    updateActivityResult: {},
    couponTypeList: [],
    saveActivityResult: {},
    saveCouponResult: {},
    updateCouponResult: {},
    deleteActivityResult: {},
    deleteCouponResult: {},
    backCouponList: []
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
    editCoupon({ commit }, id) {
      http.editCoupon({ id }).then(res => res.code === 200 && commit('editCoupon', res)).catch(err => console.log(err))
    },
    updateActivity({ commit }, activity) {
      const merchants = []
      activity.merchants.forEach(merchant => {
        merchants.push({
          merchantId: merchant,
          type: 0
        })
      })
      activity.merchants = merchants
      http.updateActivity(activity).then(res => res.code === 200 && commit('updateActivity', res)).catch(err => console.log(err))
    },
    updateCoupon({ commit }, coupon) {
      const merchants = []
      coupon.merchants.forEach(merchant => {
        merchants.push({
          merchantId: merchant,
          type: 1
        })
      })
      coupon.merchants = merchants
      http.updateCoupon(coupon).then(res => res.code === 200 && commit('updateCoupon', res)).catch(err => console.log(err))
    },
    getCouponTypeList({ commit }) {
      http.getCouponTypeList().then(res => res.code === 200 && commit('getCouponTypeList', res)).catch(err => console.log(err))
    },
    saveActivity({ commit }, activitys) {
      const merchants = []
      activitys.merchants.forEach(merchant => {
        merchants.push({
          merchantId: merchant,
          type: 0
        })
      })
      activitys.merchants = merchants
      http.saveActivity(activitys).then(res => res.code === 200 && commit('saveActivity', res)).catch(err => console.log(err))
    },
    saveCoupon({ commit }, coupons) {
      const merchants = []
      coupons.merchants.forEach(merchant => {
        merchants.push({
          merchantId: merchant,
          type: 1
        })
      })
      coupons.merchants = merchants
      http.saveCoupon(coupons).then(res => res.code === 200 && commit('saveCoupon', res)).catch(err => console.log(err))
    },
    deleteActivity({ commit }, id) {
      http.deleteActivity({ id }).then(res => res.code === 200 && commit('deleteActivity', res)).catch(err => console.log(err))
    },
    deleteCoupon({ commit }, id) {
      http.deleteCoupon({ id }).then(res => res.code === 200 && commit('deleteCoupon', res)).catch(err => console.log(err))
    },
    getBackCouponList({ commit }) {
      http.getBackCouponList().then(res => res.code === 200 && commit('getBackCouponList', res)).catch(err => console.log(err))
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
      const merchants = []
      const activityForEdit = editActivityResult.data.activitys
      activityForEdit.merchants.forEach(merchant => {
        merchants.push(merchant.merchantId)
      })
      activityForEdit.merchants = merchants
      state.activityForEdit = activityForEdit
    },
    editCoupon(state, editCouponResult) {
      const merchants = []
      const couponForEdit = editCouponResult.data.coupons
      couponForEdit.merchants.forEach(merchant => {
        merchants.push(merchant.merchantId)
      })
      couponForEdit.merchants = merchants
      state.couponForEdit = couponForEdit
    },
    updateActivity(state, updateActivityResult) {
      state.updateActivityResult = updateActivityResult
    },
    updateCoupon(state, updateCouponResult) {
      state.updateCouponResult = updateCouponResult
    },
    getCouponTypeList(state, couponTypeListResult) {
      state.couponSendTypes = couponTypeListResult.data.couponSendTypes
    },
    saveActivity(state, saveActivityResult) {
      state.saveActivityResult = saveActivityResult
      router.push({
        path: '/activity/list'
      })
    },
    saveCoupon(state, saveCouponResult) {
      state.saveCouponResult = saveCouponResult
      router.push({
        path: '/activity/list'
      })
    },
    deleteActivity(state, deleteActivityResult) {
      state.deleteActivityResult = deleteActivityResult
    },
    deleteCoupon(state, deleteCouponResult) {
      state.deleteCouponResult = deleteCouponResult
    },
    getBackCouponList(state, backCouponListResult) {
      state.backCouponList = backCouponListResult.data.coupons
    }
  }
}
