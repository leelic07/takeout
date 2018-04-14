import * as service from '../base/service'

export default {
  getActivityList: pagination => service.get('/coupon_exchanges/page', pagination).then(res => res).catch(err => err),
  editActivity: id => service.get('/coupon_exchanges/edit', id).then(res => res).catch(err => err),
  updateActivity: activity => service.post('/coupon_exchanges/update', activity).then(res => res).catch(err => err)
}
