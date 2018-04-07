import * as service from '../base/service'

export default {
  // 获取订单信息
  getOrderAcceptionList(pagination) {
    service.get('/orders/page', pagination).then(res => res).catch(err => err)
  },
  // 获取预订单信息
  getOrderReservationList(pagination) {
    service.get('/order_reserves/page', pagination).then(res => res).catch(err => err)
  }
}
