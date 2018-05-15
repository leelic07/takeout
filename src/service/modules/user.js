import { post, get, ajax, agency } from '../base/service'
// import config from '../config/base'

export default {
  // 登录
  login: userInfo => post('/login', userInfo).then(res => res).catch(err => err),
  // 登出
  logout: () => get('/logout').then(res => res).catch(err => err),
  // 修改密码
  resetPwd: passwordInfo => post('/resetPwd', passwordInfo).then(res => res).catch(err => err),
  getUserById: id => get('/managers/edit', id).then(res => res).catch(err => err),
  linkWebsocket: () => ajax(`ws://pandax.mofasion.com/${agency}/websocket`).then(res => res).catch(err => err)
}
