import * as service from '../base/service'

export default {
  getActivityList: pagination => service.get('/activitys/page', pagination).then(res => res).catch(err => err),
  getCouponList: pagination => service.get('/coupons/page', pagination).then(res => res).catch(err => err),
  editActivity: id => service.get('/activitys/edit', id).then(res => res).catch(err => err),
  editCoupon: id => service.get('/coupons/edit', id).then(res => res).catch(err => err),
  updateActivity: activity => service.post('/activitys/update', activity).then(res => res).catch(err => err),
  updateCoupon: coupon => service.post('/coupons/update', coupon).then(res => res).catch(err => err),
  getCouponTypeList: () => service.get('/coupon_send_types/list').then(res => res).catch(err => err),
  saveActivity: activity => service.post('/activitys/save', activity).then(res => res).catch(err => err),
  saveCoupon: coupon => service.post('/coupons/save', coupon).then(res => res).catch(err => err),
  getMerchantsList: () => service.get('/merchants/list').then(res => res).catch(err => err),
  deleteActivity: id => service.post('/activitys/delete', id).then(res => res).catch(err => err),
  deleteCoupon: id => service.post('/coupons/delete', id).then(res => res).catch(err => err),
  getBackCouponList: () => service.get('/coupons/backList').then(res => res).catch(err => err)
}
