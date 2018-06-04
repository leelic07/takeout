export default {
  orderStatus(status) {
    status = Number(status)
    switch (status) {
      case 1:
        return '待支付'
      case 2:
        return '待发货'
      case 3:
        return '待收货'
      case 4:
        return '待评价'
      case 5:
        return '已完成'
      case 6:
        return '退款/售后'
      case 7:
        return '已退款'
      case 8:
        return '超时未支付作废'
      default:
        return ''
    }
  }
}
