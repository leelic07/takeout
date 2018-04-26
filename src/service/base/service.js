import base from '../config/base'
import axios from 'axios'
import store from '@/store'
import router from '../../router/index'
import { Message } from 'element-ui'
import qs from 'qs'
const instance = axios.create(base)

// 代理服务器
export const agency = ''
// export const agency = '/takeaway'
// 获取异步请求的url
const getUrl = (url) => `${agency}${url}`
// 处理服务端错误的方法
const handleError = (error) => {
  if (error.response !== undefined) {
    switch (error.response.status) {
      case 401:
        Message.error('当前用户无权限，请重新登录！')
        router.push({
          path: '/login'
        })
        break
      case 403:
        Message.error('当前用户无权限，请重新登录！')
        router.push({
          path: '/login'
        })
        break
      case 404:
        Message.error('找不到对应的资源！')
        break
      case 500:
        Message.error('服务器内部错误！')
        break
      case 504:
        Message.error('请检查服务是否启动！')
        break
      default:
        Message.error('出错了！')
        break
    }
    return true
  } else if (!error.response && error.message) {
    switch (error.message) {
      case 'Network Error':
        Message.error('服务器内部错误！')
        break
      case 'timeout of 10000ms exceeded':
        Message.error('请求超时,请稍后再试')
        break
      default:
        Message.error('出错了')
    }
    return true
  } else return false
}
// 服务端成功的处理
const handleSuccess = (res) => {
  if (res.data.code) {
    switch (res.data.code) {
      case 200:
        Message({
          type: 'success',
          message: res.data.msg ? res.data.msg : '查询数据成功'
        })
        break
      case 999:// 用户登录超时，返回登录页面
        Object.keys(sessionStorage).map(key => {
          sessionStorage.setItem(key, 'undefined')
        })
        Message.error(res.data.msg)
        router.push({
          path: '/login'
        })
        break
      default:
        Message.error(res.data.msg ? res.data.msg : '无法找到对应的信息')
        break
    }
    return true
  }
  return false
}
// http request 拦截器
instance.interceptors.request.use(
  config => {
    sessionStorage['token'] && (config.headers.common['Authorization'] = sessionStorage['token'])// 每次发送请求是给请求头加上token
    // else if (config.url.substring(0, config.url.lastIndexOf('?')) !== `${agency}/authentication`) {//没有token提示‘先登录’再跳转到登录页面
    //   Message({type: 'warning', message: '当前用户无权限，请先登录！'})
    //   router.push({
    //     path: '/login'
    //   })
    //   return
    // }
    // 加载loading遮罩层
    // store.commit('showLoading')
    return config
  },
  error => Promise.reject(error)
)
// http response 拦截器
instance.interceptors.response.use(
  response => {
    handleSuccess(response) || (response.errors && Message.error(response.errors[0]))
    // 隐藏loading遮罩层
    store.commit('hideLoading')
    return response
  },
  error => {
    if (handleError(error)) {
      // 隐藏loading遮罩层
      store.commit('hideLoading')
      Promise.reject(error)
    }
  }
)
/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export const get = (url, params = {}) =>
  instance.get(getUrl(url), { params: params }).then(res => res.data).catch(err => err)
/**
 * 封装post请求
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
export const post = (url, data = {}, config = {}) =>
  instance.post(getUrl(url), data, config).then(res => res.data).catch(err => err)
  // instance.post(getUrl(url), qs.stringify(data), config).then(res => res.data).catch(err => err)
// instance.post(url, qs.stringify(data), config).then(res => res.data).catch(err => err)
/**
 * 封装post文件请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export const postFile = (url, data = {}) => {
  // data.toString() !== {}.toString() && data.append('jail_id', sessionStorage['jail_id'])
  return instance.post(agency + url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data).catch(err => err)
}
/**
 * 封装patch文件请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export const patchFile = (url, data = {}) => {
  // data.toString() !== {}.toString() && data.append('jail_id', sessionStorage['jail_id'])
  return instance.patch(agency + url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data).catch(err => err)
}
/**
 * 封装patch请求
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
export const patch = (url, data = {}, config = {}) =>
  instance.patch(getUrl(url), qs.stringify(data), config).then(res => res.data).catch(err => err)
// instance.patch(url, qs.stringify(data), config).then(res => res.data).catch(err => err)
/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export const put = (url, data = {}) =>
  instance.put(getUrl(url), qs.stringify(data)).then(res => res.data).catch(err => err)
/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export const remove = (url, data = {}) =>
  instance.delete(getUrl(url), qs.stringify(data)).then(res => res.data).catch(err => err)
/**
 * 封装all请求
 * @param urls
 * @returns {Promise}
 */
export const all = (urls = []) =>
  axios.all(urls.map(url => instance.get(getUrl(url)))).then(axios.spread((...res) => res.map(res => res.data))).catch(err => err)
