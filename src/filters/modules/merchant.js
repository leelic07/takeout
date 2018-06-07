export default {
  isOnline(param) {
    const status = Number(param)
    switch (status) {
      case 1:
        return '上线'
      case 0:
        return '下线'
      default:
        return ''
    }
  }
}
