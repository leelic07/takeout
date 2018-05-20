import axios from 'axios'
import config from '../config/base'
import { agency } from '../base/service'
import { Toast } from 'mint-ui'
import router from '@/router'
const instance = axios.create(config)

instance.interceptors.request.use(
  config => {
    const name = localStorage['name']
    const passwordHash = localStorage['passwordHash']
    config.url = `${agency}${config.url}`
    if (config.url !== `${agency}/login` && !name) {
      Toast({
        message: '未登录',
        position: 'middle',
        duration: 2000
      })
      if (name && passwordHash) {
        instance.post('/login', { name, passwordHash })
          .then(res => {
            if (res.code === 200) {
              localStorage.setItem('bossMerchantId', res.data.users.merchantId)
              localStorage.setItem('bossType', res.data.users.type)
              Toast({
                message: '登录成功',
                position: 'middle',
                duration: 2000
              })
            }
          }).catch(err => console.log(err))
      } else router.push({ path: '/boss/login' })
    }

    return config
  },
  error => Promise.reject(error)
)
// http response 拦截器
instance.interceptors.response.use(
  response => {
    const name = localStorage['name']
    const passwordHash = localStorage['passwordHash']
    const code = response.data.code
    const config = response.config
    switch (code) {
      case 999:
        Toast({
          message: '登录超时',
          position: 'middle',
          duration: 2000
        })
        if (config.url !== `${config.baseURL}${agency}/logout`) {
          instance.post('/login', { name, passwordHash })
            .then(res => {
              if (res.code === 200) {
                localStorage.setItem('bossMerchantId', res.data.users.merchantId)
                localStorage.setItem('bossType', res.data.users.type)
                Toast({
                  message: '登录成功',
                  position: 'middle',
                  duration: 2000
                })
              }
            }).catch(err => console.log(err))
        }
        break
    }
    return response.data
  },
  error => {
    const status = error.response ? error.response.status : 'undefined'
    switch (status) {
      case 500:
        Toast({
          message: '服务错误',
          position: 'middle',
          duration: 2000
        })
        break
      case 404:
        Toast({
          message: '未找到资源',
          position: 'middle',
          duration: 2000
        })
        break
      case 504:
        Toast({
          message: '检查服务是否启动',
          position: 'middle',
          duration: 2000
        })
        break
      default:
        Toast({
          message: '请求超时',
          position: 'middle',
          duration: 2000
        })
        break
    }
    Promise.reject(error)
  }
)

export default {
  bossLogin: boss => instance.post('/login', boss).then(res => res).catch(err => err),
  bossLogout: () => instance.get('/logout').then(res => res).catch(err => err),
  getBossMessag: message => instance.get('/data_report/bossPage', { params: message }).then(res => res).catch(err => err)
}
