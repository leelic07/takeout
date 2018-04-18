export default {
  grade(val) {
    switch (val) {
      case 0:
        return '普通会员'
      case 1:
        return '铜牌会员'
      case 2:
        return '银牌会员'
      case 3:
        return '金牌会员'
      default:
        return '未知'
    }
  }
}
