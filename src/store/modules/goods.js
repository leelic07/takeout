import http from '@/service'

export default {
  state: {
    goodsList: [],
    goodsForEdit: {}
  },
  actions: {
    getGoodsList({ commit }, pagination) {
      http.getGoodsList(pagination).then(res => res.code === 200 && commit('getGoodsList', res)).catch(err => console.log(err))
    },
    editGoods({ commit }, id) {
      console.log('id', id)
      http.editGoods({ id }).then(res => res.code === 200 && commit('editGoods', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getGoodsList(state, goodsListResult) {
      state.goodsList = goodsListResult.data.items
    },
    editGoods(state, editGoodsResult) {
      state.goodsForEdit = editGoodsResult.data.items
    }
  }
}
