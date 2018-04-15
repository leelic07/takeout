import http from '@/service'

export default {
  state: {
    goodsList: [],
    goodsForEdit: {},
    goodsTypeList: [],
    saveGoodsResult: {},
    goodsTypePage: [],
    goodsTypeTotal: 0,
    goodsTypeForEdit: {},
    updateGoodsTypeResult: {},
    saveGoodsTypeResult: {},
    deleteGoodsTypeResult: {},
    propertiesList: [],
    propertiesTotal: 0,
    propertyForEdit: {}
  },
  actions: {
    getGoodsList({ commit }, pagination) {
      http.getGoodsList(pagination).then(res => res.code === 200 && commit('getGoodsList', res)).catch(err => console.log(err))
    },
    editGoods({ commit }, id) {
      http.editGoods({ id }).then(res => res.code === 200 && commit('editGoods', res)).catch(err => console.log(err))
    },
    getGoodsTypeList({ commit }) {
      http.getGoodsTypeList().then(res => res.code === 200 && commit('getGoodsTypeList', res)).catch(err => console.log(err))
    },
    saveGoods({ commit }, goods) {
      http.saveGoods(goods).then(res => res.code === 200 && commit('saveGoods', res)).catch(err => err)
    },
    getGoodsTypePage({ commit }, pagination) {
      http.getGoodsTypePage(pagination).then(res => res.code === 200 && commit('getGoodsTypePage', res)).catch(err => err)
    },
    editGoodsType({ commit }, id) {
      http.editGoodsType({ id }).then(res => res.code === 200 && commit('editGoodsType', res)).catch(err => console.log(err))
    },
    updateGoodsType({ commit }, goodsType) {
      http.updateGoodsType({
        id: goodsType.id,
        name: goodsType.name
      }).then(res => res.code === 200 && commit('updateGoodsType', res)).catch(err => console.log(err))
    },
    saveGoodsType({ commit }, goodsType) {
      http.saveGoodsType(goodsType).then(res => res.code === 200 && commit('saveGoodsType', res)).catch(err => console.log(err))
    },
    deleteGoodsType({ commit }, id) {
      http.deleteGoodsType({ id }).then(res => res.code === 200 && commit('deleteGoodsType', res)).catch(err => console.log(err))
    },
    withdrawGoodsConfirm({ commit }, goodsInfo) {
      http.withdrawGoodsConfirm(goodsInfo).then(res => res.code === 200 && commit('withdrawGoodsConfirm', res)).catch(err => console.log(err))
    },
    withdrawGoodsConfirmForSuper({ commit }, goodsInfo) {
      http.withdrawGoodsConfirmForSuper(goodsInfo).then(res => res.code === 200 && commit('withdrawGoodsConfirmForSuper', res)).catch(err => console.log(err))
    },
    getPropertiesPage({ commit }, pagination) {
      http.getPropertiesPage(pagination).then(res => res.code === 200 && commit('getPropertiesPage', res)).catch(err => console.log(err))
    },
    getPropertyForEdit({ commit }, id) {
      http.getPropertyForEdit({ id }).then(res => res.code === 200 && commit('getPropertyForEdit', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getGoodsList(state, goodsListResult) {
      state.goodsList = goodsListResult.data.items
    },
    editGoods(state, editGoodsResult) {
      state.goodsForEdit = editGoodsResult.data.items
    },
    getGoodsTypeList(state, goodsTypeResult) {
      state.goodsTypeList = goodsTypeResult.data.itemTypes
    },
    saveGoods(state, saveGoodsResult) {
      state.saveGoodsResult = saveGoodsResult
    },
    getGoodsTypePage(state, goodsTypesResult) {
      const data = goodsTypesResult.data
      state.goodsTypePage = data.itemTypes
      state.goodsTypeTotal = data.totalCount
    },
    editGoodsType(state, editGoodsTypeResult) {
      state.goodsTypeForEdit = editGoodsTypeResult.data.itemTypes
    },
    updateGoodsType(state, updateGoodsTypeResult) {
      state.updateGoodsTypeResult = updateGoodsTypeResult
    },
    saveGoodsType(state, saveGoodsTypeResult) {
      state.saveGoodsTypeResult = saveGoodsTypeResult
    },
    deleteGoodsType(state, deleteGoodsTypeResult) {
      state.deleteGoodsTypeResult = deleteGoodsTypeResult
    },
    withdrawGoodsConfirm(state, withdrawGoodsResult) {
      state.withdrawGoodsResult = withdrawGoodsResult
    },
    withdrawGoodsConfirmForSuper(state, withdrawGoodsResult) {
      state.withdrawGoodsResult = withdrawGoodsResult
    },
    getPropertiesPage(state, propertiesPageResult) {
      state.propertiesList = propertiesPageResult.data.propertys
      state.propertiesTotal = propertiesPageResult.data.totalCount
    },
    getPropertyForEdit(state, propertyForEditResult) {
      state.propertyForEdit = propertyForEditResult.data.property
    }
  }
}
