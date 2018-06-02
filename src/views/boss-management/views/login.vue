<template>
  <div class="boss-login-container">
    <mt-field label="用户名"
      placeholder="请输入用户名"
      v-model="loginForm.name"></mt-field>
    <mt-field label="密码"
      placeholder="请输入密码"
      type="password"
      v-model="loginForm.passwordHash"></mt-field>
    <mt-button type="primary"
      @click="login">登录</mt-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      loginForm: {
        name: '',
        passwordHash: ''
      }
    }
  },
  methods: {
    ...mapActions({
      bossLogin: 'bossLogin'
    }),
    login() {
      if (this.loginForm.name === '' || this.loginForm.passwordHash === '') {
        Toast({
          message: '用户名和密码不能为空',
          position: 'middle',
          duration: 2000
        })
      } else this.bossLogin(this.loginForm)
    }
  }
}
</script>
