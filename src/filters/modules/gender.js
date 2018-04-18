export default {
  gender(val) {
    switch (val) {
      case 0:
        return '女'
      case 1:
        return '男'
      default:
        return ''
    }
  }
}
