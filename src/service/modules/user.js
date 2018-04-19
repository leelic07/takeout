import * as service from '../base/service'

export default {
  // 登录
  login: userInfo => service.post('/login', userInfo).then(res => res).catch(err => err),
  // 登出
  logout: () => service.get('/logout').then(res => res).catch(err => err),
  // 修改密码
  resetPwd: passwordInfo => service.post('/resetPwd', passwordInfo).then(res => res).catch(err => err),
  getManagerById: id => service.get('/managers/edit', id).then(res => res).catch(err => err)
}
