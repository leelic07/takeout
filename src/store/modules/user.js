import http from '@/service'
import router from '@/router'

const user = {
  state: {
    user: {},
    resetResult: {},
    manager: {}
  },
  actions: {
    // 登录
    login({ commit }, userInfo) {
      http.login(userInfo).then(res => res.code === 200 && commit('login', res)).catch(err => console.log(err))
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
    },
    getManagerById({ commit }, id) {
      http.getManagerById({ id }).then(res => res.code === 200 && commit('getManagerById', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    // 登录
    login(state, userResult) {
      const users = userResult.data.users
      sessionStorage.setItem('type', users.type)
      sessionStorage.setItem('userId', users.id)
      sessionStorage.setItem('userName', users.name)
      sessionStorage.setItem('merchantId', users.merchantId)
      state.users = users
      router.push({
        path: '/seller/index'
      })
    },
    // 登出
    logout(state) {
      router.push({
        path: '/login'
      })
    },
    // 修改密码
    resetPwd(state, resetResult) {
      state.resetResult = resetResult
    },
    getManagerById(state, getManagerResult) {
      state.manager = getManagerResult.data.managers
    }
  }
}

export default user
