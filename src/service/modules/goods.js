import * as service from '../base/service'

export default {
  getGoodsList: pagination => service.get('/items/page', pagination).then(res => res).catch(err => err),
  editGoods: id => service.get('/items/edit', id).then(res => res).catch(err => err),
  getGoodsTypeList: () => service.get('/item_types/list').then(res => res).catch(err => err),
  saveGoods: goods => service.post('/items/save', goods).then(res => res).catch(err => err),
  getGoodsTypePage: pagination => service.get('/item_types/page', pagination).then(res => res).catch(err => err),
  editGoodsType: id => service.get('/item_types/edit', id).then(res => res).catch(err => err),
  updateGoodsType: goodsType => service.post('/item_types/update', goodsType).then(res => res).catch(err => err),
  saveGoodsType: goodsType => service.post('/item_types/save', goodsType).then(res => res).catch(err => err),
  deleteGoodsType: id => service.post('/item_types/delete', id).then(res => res).catch(err => err)
}
