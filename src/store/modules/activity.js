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
    backCouponList: [],
    effectiveDate: [{
      label: '一个月',
      value: 1
    }, {
      label: '两个月',
      value: 2
    }, {
      label: '三个月',
      value: 3
    }, {
      label: '四个月',
      value: 4
    }, {
      label: '五个月',
      value: 5
    }, {
      label: '六个月',
      value: 6
    }, {
      label: '七个月',
      value: 7
    }, {
      label: '八个月',
      value: 8
    }, {
      label: '九个月',
      value: 9
    }, {
      label: '十个月',
      value: 10
    }, {
      label: '十一个月',
      value: 11
    }, {
      label: '十二个月',
      value: 12
    }]
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
      delete activity.createdAt
      delete activity.updatedAt
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
      coupon.pictures.forEach(picture => {
        delete picture.createdAt
      })
      coupon.merchants = merchants
      coupon.startDate = new Date(coupon.startDate)
      coupon.endDate = new Date(coupon.endDate)
      delete coupon.createdAt
      delete coupon.updatedAt
      delete coupon.sendStartTime
      delete coupon.sendEndTime
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
      activitys.startDate = new Date(activitys.startDate)
      activitys.endDate = new Date(activitys.endDate)
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
      couponForEdit.pictures.forEach(picture => {
        picture.name = picture.url.substring(picture.url.lastIndexOf('/') + 1)
      })
      couponForEdit.merchants = merchants
      couponForEdit.couponSendType = Number(couponForEdit.couponSendType) || ''
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
        path: '/activity/coupon-list'
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
