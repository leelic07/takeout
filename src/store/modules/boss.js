import http from '@/service/modules/boss'
import router from '@/router'
import { Toast } from 'mint-ui'
const toast = (message = '', position = 'middle', duration = 2000) => Toast({ message, position, duration })

export default {
  state: {
    boss: {},
    report: {}
  },
  actions: {
    bossLogin({ commit }, boss) {
      http.bossLogin(boss).then(res => res.code === 200 && commit('bossLogin', Object.assign(res, boss))).catch(err => console.log(err))
    },
    bossLogout({ commit }) {
      http.bossLogout().then(res => res.code === 999 && commit('bossLogout', res)).catch(err => console.log(err))
    },
    getBossMessag({ commit }, message) {
      http.getBossMessag(message).then(res => res.code === 200 && commit('getBossMessag', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    bossLogin(state, res) {
      const boss = res.data.users
      const name = res.name
      const passwordHash = res.passwordHash
      localStorage.setItem('bossMerchantId', boss.merchantId)
      localStorage.setItem('bossType', boss.type)
      localStorage.setItem('name', name)
      localStorage.setItem('passwordHash', passwordHash)
      state.boss = boss
      toast('登录成功')
      router.push({ path: '/boss/message' })
    },
    bossLogout(state, res) {
      localStorage.setItem('bossMerchantId', '')
      localStorage.setItem('bossType', '')
      toast('退出登录成功')
      router.push({ path: '/boss/login' })
    },
    getBossMessag(state, res) {
      state.report = res.data.report || {}
    }
  }
}
