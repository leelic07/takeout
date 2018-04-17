import * as service from '../base/service'

export default {
  getUsersPage: pagination => service.get('/users/page', pagination).then(res => res).catch(err => err),
  editUser: id => service.get('/users/edit', id).then(res => res).catch(err => err)
}
