export default {
  goodsPuton(status) {
    status = Number(status)
    switch (status) {
      case 1:
        return '在售'
      case 0:
        return '下架'
      default:
        return '下架'
    }
  },
  stockStatus(status) {
    status = Number(status)
    switch (status) {
      case 1:
        return '无限'
      case 0:
        return '有限'
    }
  }
}
