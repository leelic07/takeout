export default {
  couponSendTypes(id) {
    switch (id) {
      case '1' || 1:
        return '首页领取普通优惠券'
      case '2' || 2:
        return '实付满多少送券'
      case '3' || 3:
        return '后台操作送券'
      case '4' || 4:
        return '首次点餐成功送券'
      case '5' || 5:
        return '满多少直接减钱'
      case '6' || 6:
        return '首次进入小程序送券'
      default:
        return ''
    }
  }
}
