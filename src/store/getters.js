const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  // 商户管理
  shopList: state => state.shop.shopList,
  shopTotal: state => state.shop.shopTotal,
  shopTypeList: state => state.shop.shopTypeList,
  shopForEdit: state => state.shop.shopForEdit,
  editShopResult: state => state.shop.editShopResult,
  // 商品管理
  goodsList: state => state.goods.goodsList,
  goodsForEdit: state => state.goods.goodsForEdit
}

export default getters
