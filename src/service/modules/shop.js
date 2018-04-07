import * as service from '../base/service'

export default {
  // 获取商户信息
  getShopList(pagination) {
    service.get('/merchants/page', pagination).then(res => res).catch(err => err)
  },
  // 添加商户信息
  saveShop(shopInfo) {
    service.post('/merchants/save', shopInfo).then(res => res).catch(err => err)
  },
  // 编辑商户信息
  editShop(shopInfo) {
    service.post('/merchants/update', shopInfo).then(res => res).catch(err => err)
  }
}
