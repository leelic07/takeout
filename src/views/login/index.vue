<template>
  <div class="login-container">
    <el-form
      autocomplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="card-box login-form"
    >
      <h3 class="title">外卖管理系统</h3>
      <el-form-item prop="name">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          name="username"
          type="text"
          v-model="loginForm.name"
          autocomplete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="passwordHash">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          name="password"
          :type="pwdType"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.passwordHash"
          autocomplete="on"
          placeholder="请输入用户密码"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;"
          :loading="loading"
          @click.native.prevent="handleLogin"
        >登录</el-button>
      </el-form-item>
      <div class="tips"></div>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'login',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        name: '',
        passwordHash: ''
      },
      loginRules: {
        name: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
        passwordHash: [ { required: true, trigger: 'blur', validator: validatePass } ]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  watch: {
    users () {
      this.$router.push({
        path: '/seller/index'
      })
    },
    // 监听用户名自动补全密码
    'loginForm.name' (val) {
      const password = localStorage[ val ]
      if (password) this.loginForm.passwordHash = password
    }
  },
  computed: {
    ...mapGetters({
      users: 'users'
    })
  },
  methods: {
    ...mapActions({
      login: 'login',
      linkWebsocket: 'linkWebsocket'
    }),
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        this.loading = true
        if (valid) {
          this.login(this.loginForm)
          this.loading = false
        } else {
          console.log('error submit!!')
          this.loading = false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 20px;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
