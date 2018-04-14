// const fillPre = (val) => {
//   return `00${val}`.slice(-2)
// }
export default {
  // 日期过滤器
  Date(time) {
    if (!time) return
    // const date = new Date(time)
    // const year = date.getFullYear()
    // const month = fillPre(date.getMonth() + 1)
    // const day = fillPre(date.getDate())
    // const hour = fillPre(date.getHours())
    // const minute = fillPre(date.getMinutes())
    // const second = fillPre(date.getSeconds())
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
}
