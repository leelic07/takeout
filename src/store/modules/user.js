import http from '@/service'
import router from '@/router'

const user = {
  state: {
    users: {},
    resetResult: {},
    manager: {},
    type: ''
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
    getUserById({ commit }, id) {
      http.getUserById({ id }).then(res => res.code === 200 && commit('getUserById', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    // 登录
    login(state, userResult) {
      const users = userResult.data.users
      sessionStorage.setItem('type', users.type)
      sessionStorage.setItem('userId', users.id)
      sessionStorage.setItem('userName', users.name)
      users.merchantId ? sessionStorage.setItem('merchantId', users.merchantId) : sessionStorage.setItem('merchantId', '')
      localStorage.setItem('type', users.type)
      state.users = users
      state.type = users.type
      router.replace({
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
      router.push({
        path: '/login'
      })
    },
    getUserById(state, getManagerResult) {
      const managers = getManagerResult.data.managers
      managers.merchants = managers.merchants || []
      managers.type = managers.type.toString()
      state.manager = managers
    }
  }
}

export default user
