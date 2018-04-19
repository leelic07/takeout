import * as service from '../base/service'

export default {
  getActivityList: pagination => service.get('/activitys/page', pagination).then(res => res).catch(err => err),
  getCouponList: pagination => service.get('coupons/page', pagination).then(res => res).catch(err => err),
  editActivity: id => service.get('/coupon_exchanges/edit', id).then(res => res).catch(err => err),
  updateActivity: activity => service.post('/coupon_exchanges/update', activity).then(res => res).catch(err => err),
  getCouponTypeList: () => service.get('/coupon_send_types/list').then(res => res).catch(err => err),
  saveActivity: activity => service.post('/activitys/save', activity, { headers: {
    'Content-Type': 'application/json'
  }}).then(res => res).catch(err => err),
  saveCoupon: coupon => service.post('/coupons/save', coupon).then(res => res).catch(err => err),
  getMerchantsList: () => service.get('/merchants/list').then(res => res).catch(err => err)
}
