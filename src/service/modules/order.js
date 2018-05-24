import * as service from '../base/service'

export default {
  // 获取订单信息
  getOrderAcceptionList: pagination => service.get('/orders/page', pagination).then(res => res).catch(err => err),
  // 获取预订单信息
  getOrderReservationList: pagination => service.get('/order_reserves/page', pagination).then(res => res).catch(err => err),
  getOrderRetreatList: pagination => service.get('/order_cancles/page', pagination).then(res => res).catch(err => err),
  getOrderRecordsList: pagination => service.get('/order_historys/page', pagination).then(res => res).catch(err => err),
  getOrdersRecordsPage: pagination => service.get('/orders/page', pagination).then(res => res).catch(err => err),
  getOrderReminderByStatus: pagination => service.get('/orders/reminderPage', pagination).then(res => res).catch(err => err),
  retreatOrder: order => service.post('/weixin/wxrefund', order).then(res => res).catch(err => err),
  distributionOrder: id => service.post('/orders/updateDistribution', id).then(res => res).catch(err => err)
}
