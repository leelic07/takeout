import http from '@/service'

const user = {
  state: {
    user: {},
    resetResult: {}
  },
  actions: {
    // 登录
    login({ commit }, userInfo) {
      http.login(userInfo).then(res => commit('login', res)).catch(err => console.log(err))
    },
    // 登出
    logout({ commit }) {
      http.logout().then(res => commit('logout', res)).catch(err => console.log(err))
    },
    // 修改密码
    resetPwd({ commit }, passwordInfo) {
      http.resetPwd({
        old_password: passwordInfo.old_password,
        new_password: passwordInfo.new_password
      }).then(res => commit('resetPwd', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    // 登录
    login(state, user) {
      state.user = user
    },
    // 登出
    logout(state) {

    },
    // 修改密码
    resetPwd(state, resetResult) {
      state.resetResult = resetResult
    }
  }
}

export default user
