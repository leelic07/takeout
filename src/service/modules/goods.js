import * as service from '../base/service'

export default {
  getGoodsList: pagination => service.get('/items/page', pagination).then(res => res).catch(err => err),
  editGoods: id => service.get('/items/edit', id).then(res => res).catch(err => err)
}
