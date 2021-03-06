import http from '@/service'
import router from '@/router'
import { Message, Notification } from 'element-ui'
const mp3 = require('../../../static/audio/takeaway.mp3')

const user = {
  state: {
    users: {},
    resetResult: {},
    manager: {},
    type: '',
    orderMessage: {}
  },
  actions: {
    // 登录
    login({ commit }, userInfo) {
      http.login(userInfo).then(res => {
        if (res.code === 200) {
          localStorage[ userInfo.name ] = userInfo.passwordHash
          commit('login', res)
        }
      }).catch(err => console.log(err))
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
    },
    linkWebsocket({ commit, dispatch }) {
      const merchantId = sessionStorage[ 'merchantId' ]
      let socket = ''
      var host = 'app.pandax.vip'
      var url = `wss://${host}/ws/${sessionStorage[ 'merchantId' ]}`
      if (merchantId) {
        socket = new WebSocket(url)
        setInterval(() => {
          socket.close()
          dispatch('linkWebsocket')
        }, 600000) // 每隔10分钟 链接一次websocket
        // 打开事件
        socket.onopen = function() {
          console.log('Socket 已打开')
          // socket.send("这是来自客户端的消息" + location.href + new Date());
        }
        // 获得消息事件
        socket.onmessage = function(msg) {
          commit('linkWebsocket', msg)
          // 发现消息进入    调后台获取
        }
        // 关闭事件
        socket.onclose = function() {
          Message({
            type: 'warning',
            message: 'websocket已经关闭',
            showClose: true
          })
          // socket = new WebSocket(url)
          dispatch('linkWebsocket')
        }
        // 发生了错误事件
        socket.onerror = function() {
          Message.error({
            message: 'websocket发生错误',
            showClose: true
          })
          // socket = new WebSocket(url)
          dispatch('linkWebsocket')
        }
      }
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
      state.users = users
      state.type = sessionStorage.getItem('type')
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
    },
    linkWebsocket(state, msg) {
      const audios = document.createElement('audio')
      // audios.src = '../../../static/audio/takeaway.mp3'// 订单语音播放
      audios.src = mp3
      const data = JSON.parse(msg.data)
      if (data.msg !== '连接成功') {
        switch (data.type) {
          case 1:
            Notification.success({
              title: '订单提醒',
              message: `您有一笔新的订单 <a style="color:red" href='#/order/acception'>查看>></a>`,
              duration: 0,
              dangerouslyUseHTMLString: true,
              onClick: function() {
                router.push({ path: '/order/acception' })
                this.close()
              }
            })
            audios.play()
            break
          case 2:
            Notification.warning({
              title: '退单提醒',
              message: `您有一笔新的退单 <a style="color:red" href='#/order/retreat'>查看>></a>`,
              duration: 0,
              dangerouslyUseHTMLString: true,
              onClick: function() {
                router.push({ path: '/order/retreat' })
                this.close()
              }
            })
            break
          case 3:
            Notification.warning({
              title: '催单提醒',
              message: `您有一笔新的催单 <a style="color:red" href='#/order/reminder'>查看>></a>`,
              duration: 0,
              dangerouslyUseHTMLString: true,
              onClick: function() {
                router.push({ path: '/order/reminder' })
                this.close()
              }
            })
            break
        }
      }
      state.orderMessage = data
    }
  }
}

export default user
