import { parseTime } from '@/utils/index'

export default {
  // 日期过滤器
  Date(time) {
    if (!time) return
    return parseTime(time)
  },
  // 优惠券有效日期
  effectiveTime(param) {
    const month = Number(param)
    switch (month) {
      case 1:
        return '一个月'
      case 2:
        return '两个月'
      case 3:
        return '三个月'
      case 4:
        return '四个月'
      case 5:
        return '五个月'
      case 6:
        return '六个月'
      case 7:
        return '七个月'
      case 8:
        return '八个月'
      case 9:
        return '九个月'
      case 10:
        return '十个月'
      case 11:
        return '十一个月'
      case 12:
        return '十二个月'
      default:
        return ''
    }
  }
}
