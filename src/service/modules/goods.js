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
  deleteGoodsType: id => service.post('/item_types/delete', id).then(res => res).catch(err => err),
  withdrawGoodsConfirm: goodsInfo => service.post('/items/updateIsPuton', goodsInfo).then(res => res).catch(err => err),
  withdrawGoodsConfirmForSuper: goodsInfo => service.get('/items/superUpdate', goodsInfo).then(res => res).catch(err => err),
  getPropertiesPage: pagination => service.get('/propertys/page', pagination).then(res => res).catch(err => err),
  getPropertyForEdit: id => service.get('/propertys/edit', id).then(res => res).catch(err => err),
  saveStandard: standard => service.post('/propertys/save', standard).then(res => res).catch(err => err),
  updateGoods: goods => service.post('/items/update', goods).then(res => res).catch(err => err)
}
