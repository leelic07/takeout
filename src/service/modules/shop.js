import * as service from '../base/service'

export default {
  // 获取商户信息
  getShopList: pagination => service.get('/merchants/page', pagination).then(res => res).catch(err => err),
  // 添加商户信息
  saveShop: shopInfo => service.post('/merchants/save', shopInfo).then(res => res).catch(err => err),
  // 编辑商户信息
  getShopTypeList: () => service.get('/merchant_types/list').then(res => res).catch(err => err),
  getShopForEdit: id => service.get('/merchants/edit', id).then(res => res).catch(err => err),
  getMerchantsListByitemId: id => service.get('/merchants/bindItemlist', id).then(res => res).catch(err => err),
  updateShop: shopInfo => service.post('/merchants/update', shopInfo).then(res => res).catch(err => err),
  getMerchantsHomePage: merchantId => service.get('/merchants/homePage', merchantId).then(res => res).catch(err => err),
  getMerchantTypePage: param => service.get('/merchant_types/page', param).then(res => res).catch(err => err),
  saveMerchantType: data => service.post('/merchant_types/save', data).then(res => res).catch(err => err),
  updateMerchantType: data => service.post('/merchant_types/update', data).then(res => res).catch(err => err),
  deleteMerchantType: data => service.post('/merchant_types/delete', data).then(res => res).catch(err => err),
  editMerchantType: param => service.get('/merchant_types/edit', param).then(res => res).catch(err => err)
}
