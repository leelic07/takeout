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
    },
    linkWebsocket({ commit }) {
      // http.linkWebsocket().then(res => res.code === 200 && commit('linkWebsocket')).catch(err => console.log(err))
      // var host = window.location.host
      console.log('websocket')
      var host = '47.106.143.22:8080'
      // var host = 'pandax.mofasion.com'
      var url = 'wss://' + host + '/takeaway/websocket'
      const socket = new WebSocket(url)
      console.log('socket', socket)
      //    socket = new WebSocket("ws://localhost:8081/ywgk/websocket");
      // 打开事件
      socket.onopen = function() {
        console.log('Socket 已打开')
        // socket.send("这是来自客户端的消息" + location.href + new Date());
      }
      // 获得消息事件
      socket.onmessage = function(msg) {
        console.log(msg.data)
        // 发现消息进入    调后台获取
        // document.getElementById('response').innerHTML = msg.data
        //  $("#response").html(msg.data);
      }
      // 关闭事件
      socket.onclose = function() {
        console.log('Socket已关闭')
      }
      // 发生了错误事件
      socket.onerror = function() {
        alert('Socket发生了错误')
      }

      /*           $(window).unload(function(){
                socket.close();
              });   */
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
    }
  }
}

export default user
