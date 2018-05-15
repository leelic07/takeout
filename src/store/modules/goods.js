import http from '@/service'
import router from '@/router'

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
    propertyForEdit: {},
    saveStandardResult: {},
    updateStandardResult: {},
    updateGoodsResult: {},
    deletePropertyResult: {},
    propertyParents: [],
    proertyChildren: [],
    groundGoodsResult: {},
    withdrawGoodsResult: {}
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
      const merchants = []
      const pictures = []
      const propertys = []
      goods.itemMerchants.forEach(merchant => {
        merchants.push({
          merchantId: merchant,
          isPuton: goods.isPuton
        })
      })
      goods.pictures.forEach(picture => {
        pictures.push({
          url: picture
        })
      })
      goods.itemPropertys.forEach(property => {
        property.subPropertys.forEach(sub => {
          sub.propertyId = sub.id
          sub.isOpen = sub.isOpen ? 1 : 0
          delete sub.id
          propertys.push(sub)
        })
      })
      goods.itemMerchants = merchants
      goods.pictures = pictures
      goods.itemPropertys = propertys
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
        name: goodsType.name,
        code: goodsType.code
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
    groundGoodsConfirmForSuper({ commit }, goodsInfo) {
      http.groundGoodsConfirmForSuper(goodsInfo).then(res => res.code === 200 && commit('groundGoodsConfirmForSuper', res)).catch(err => console.log(err))
    },
    getPropertiesPage({ commit }, pagination) {
      http.getPropertiesPage(pagination).then(res => res.code === 200 && commit('getPropertiesPage', res)).catch(err => console.log(err))
    },
    editProperty({ commit }, id) {
      http.editProperty({ id }).then(res => res.code === 200 && commit('editProperty', res)).catch(err => console.log(err))
    },
    saveStandard({ commit }, standard) {
      http.saveStandard(standard).then(res => res.code === 200 && commit('saveStandard', res)).catch(err => console.log(err))
    },
    updateStandard({ commit }, standard) {
      http.updateStandard(standard).then(res => res.code === 200 && commit('updateStandard', res)).catch(err => console.log(err))
    },
    updateGoods({ commit }, goods) {
      const merchants = []
      const pictures = []
      const propertys = []
      goods.itemMerchants.forEach(merchant => {
        merchants.push({
          merchantId: merchant,
          isPuton: goods.isPuton
        })
      })
      goods.pictures.forEach(picture => {
        if (picture.url) {
          pictures.push({
            url: picture.url
          })
        } else {
          pictures.push({
            url: picture
          })
        }
      })
      goods.itemPropertys.forEach(property => {
        property.subPropertys.forEach(sub => {
          sub.propertyId = sub.id
          sub.isOpen = sub.isOpen ? 1 : 0
          delete sub.id
          propertys.push(sub)
        })
      })
      goods.itemMerchants = merchants
      goods.pictures = pictures
      goods.itemPropertys = propertys
      delete goods.createdAt
      delete goods.updatedAt
      http.updateGoods(goods).then(res => res.code === 200 && commit('updateGoods', res)).catch(err => console.log(err))
    },
    deleteProperty({ commit }, id) {
      http.deleteProperty({ id }).then(res => res.code === 200 && commit('deleteProperty', res)).catch(err => console.log(err))
    },
    getPropertysParent({ commit }) {
      http.getPropertysParent().then(res => res.code === 200 && commit('getPropertysParent', res)).catch(err => console.log(err))
    },
    getPropertysChildren({ commit }, property) {
      http.getPropertysChildren({ pid: property.id }).then(res => {
        if (res.code === 200) {
          res.property = property
          commit('getPropertysChildren', res)
        }
      }).catch(err => console.log(err))
    }
  },
  mutations: {
    getGoodsList(state, goodsListResult) {
      const items = goodsListResult.data.items
      // items.forEach((item, index, arr) => {
      //   for (let i = index + 1; i < arr.length; i++) {
      //     if (item.id === arr[i].id) arr.splice(i, 1)
      //   }
      // })
      state.goodsList = items
    },
    editGoods(state, editGoodsResult) {
      const goodsForEdit = editGoodsResult.data.items
      const merchants = []
      goodsForEdit.pictures.forEach(picture => {
        picture.url && (picture.name = picture.url.substring(picture.url.lastIndexOf('/') + 1))
      })
      goodsForEdit.merchants.forEach(merchant => {
        merchants.push(merchant.id)
      })
      goodsForEdit.propertys.forEach(prop => {
        prop.subPropertys.forEach(sub => {
          sub.isOpen = sub.isOpen === '1'
        })
      })
      goodsForEdit.itemMerchants = merchants
      goodsForEdit.itemPropertys = goodsForEdit.propertys.length ? goodsForEdit.propertys : [{ subPropertys: [] }]
      goodsForEdit.price = goodsForEdit.price ? goodsForEdit.price.toString() : ''
      goodsForEdit.packingCharge = goodsForEdit.packingCharge ? goodsForEdit.packingCharge.toString() : ''
      state.goodsForEdit = goodsForEdit
    },
    getGoodsTypeList(state, goodsTypeResult) {
      const goodsTypeList = goodsTypeResult.data.itemTypes
      goodsTypeList.forEach(type => {
        type.id = type.id.toString()
      })
      state.goodsTypeList = goodsTypeList
    },
    saveGoods(state, saveGoodsResult) {
      state.saveGoodsResult = saveGoodsResult
      router.push({
        path: '/goods/list'
      })
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
    groundGoodsConfirmForSuper(state, groundGoodsResult) {
      state.groundGoodsResult = groundGoodsResult
    },
    getPropertiesPage(state, propertiesPageResult) {
      const propertys = propertiesPageResult.data.propertys
      const total = propertiesPageResult.data.totalCount
      propertys.forEach(property => {
        property.standardOption = ''
        property.subPropertys.forEach((sub, index, arr) => {
          (arr.length === index + 1) && (property.standardOption += `${sub.name || ''}`) || (property.standardOption += `${sub.name || ''} / `)
        })
      })
      state.propertiesList = propertys
      state.propertiesTotal = total
    },
    editProperty(state, propertyForEditResult) {
      const property = propertyForEditResult.data.propertys
      property.subPropertys.length === 0 && (property.subPropertys.push({ name: '' }))
      state.propertyForEdit = property
    },
    saveStandard(state, saveStandardResult) {
      state.saveStandardResult = saveStandardResult
      router.push({
        path: '/goods/standard'
      })
    },
    updateStandard(state, updateStandardResult) {
      state.updateStandardResult = updateStandardResult
      router.push({
        path: '/goods/standard'
      })
    },
    updateGoods(state, updateGoodsResult) {
      state.updateGoodsResult = updateGoodsResult
      router.push({
        path: '/goods/list'
      })
    },
    deleteProperty(state, deletePropertyResult) {
      state.deletePropertyResult = deletePropertyResult
    },
    getPropertysParent(state, propertysParentResult) {
      state.propertyParents = propertysParentResult.data.propertys
    },
    getPropertysChildren(state, propertysChildrenResult) {
      const property = propertysChildrenResult.property
      const subPropertys = propertysChildrenResult.data.propertys
      property.subPropertys = subPropertys
      state.proertyChildren = subPropertys
    }
  }
}
