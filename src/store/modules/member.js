import http from '@/service'

export default {
  state: {
    userList: [],
    userTotal: 0,
    userForEdit: {},
    sendCouponResult: {}
  },
  actions: {
    getUsersPage({ commit }, pagination) {
      http.getUsersPage(pagination).then(res => res.code === 200 && commit('getUsersPage', res)).catch(err => console.log(err))
    },
    editUser({ commit }, id) {
      http.editUser({ id }).then(res => res.code === 200 && commit('editUser', res)).catch(err => console.log(err))
    },
    sendCouponToUser({ commit }, user) {
      http.sendCouponToUser(user).then(res => res.code === 200 && commit('sendCouponToUser', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getUsersPage(state, usersPageResult) {
      const data = usersPageResult.data
      data.users.forEach(user => {
        switch (user.grade) {
          case 0:
            user.gradeType = ''
            break
          case 1:
            user.gradeType = 'warning'
            break
          case 2:
            user.gradeType = 'info'
            break
          case 3:
            user.gradeType = 'danger'
            break
          default:
            user.gradeType = ''
        }
      })
      state.userList = data.users
      state.userTotal = data.totalCount
    },
    editUser(state, editUserResult) {
      state.userForEdit = editUserResult.data.users
    },
    sendCouponToUser(state, sendCouponResult) {
      state.sendCouponResult = sendCouponResult
    }
  }
}
