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
  merchantList: state => state.shop.merchantList,
  merchantListByItemId: state => state.shop.merchantListByItemId,
  // 商品管理
  goodsList: state => state.goods.goodsList,
  goodsForEdit: state => state.goods.goodsForEdit,
  goodsTypeList: state => state.goods.goodsTypeList,
  goodsTypePage: state => state.goods.goodsTypePage,
  goodsTypeTotal: state => state.goods.goodsTypeTotal,
  goodsTypeForEdit: state => state.goods.goodsTypeForEdit,
  updateGoodsTypeResult: state => state.goods.updateGoodsTypeResult,
  saveGoodsTypeResult: state => state.goods.saveGoodsTypeResult,
  deleteGoodsTypeResult: state => state.goods.deleteGoodsTypeResult,
  withdrawGoodsResult: state => state.goods.withdrawGoodsResult,
  propertiesList: state => state.goods.propertiesList,
  propertiesTotal: state => state.goods.propertiesTotal,
  propertyForEdit: state => state.goods.propertyForEdit,
  saveStandardResult: state => state.goods.saveStandardResult,
  // 订单管理
  orderAcceptionList: state => state.order.orderAcceptionList,
  orderReservationList: state => state.order.orderReservationList,
  orderRetreatList: state => state.order.orderRetreatList,
  orderRecordsList: state => state.order.orderRecordsList,
  // 活动管理
  activityList: state => state.activity.activityList,
  activityTotal: state => state.activity.activityTotal,
  activityForEdit: state => state.activity.activityForEdit,
  updateActivityResult: state => state.activity.updateActivityResult,
  couponTypeList: state => state.activity.couponTypeList,
  saveActivityResult: state => state.activity.saveActivity,
  saveCouponResult: state => state.activity.saveCoupon,
  couponList: state => state.activity.couponList,
  couponSendTypes: state => state.activity.couponSendTypes,
  // 上传文件
  uploadFileUrl: state => state.upload.uploadFileUrl,
  // 会员管理
  userList: state => state.member.userList,
  userTotal: state => state.member.userTotal,
  userForEdit: state => state.member.userForEdit,
  // 售后管理
  feedbacksList: state => state.customer.feedbacksList
}

export default getters
