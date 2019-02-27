/**
 * Created by lx on 2018/3/1.
 */
import axios from 'axios'
import router from '../router'
// 基本配置
localStorage.WT_IMAGE_URL = ''
axios.defaults.baseURL = window.wtEnv.serverBaseUrl
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.headers.post['x-access-token'] = localStorage.token
axios.defaults.headers.get['x-access-token'] = localStorage.token

// 响应拦截器
axios.interceptors.response.use((response) => {
  // 拦截未登录状态
  if (response.data.code == 1000) {
    localStorage.router = window.location.href.split('#')[1]
    setTimeout(function () {
      router.push({path: '/login'})
    }, 500)
  }
  return response
}, (error) => {
  console.log('请求超时', error)
})

/**
 * 接口请求Url整理 命名以Url结束，如 groupUrl
 */

const UserController = {
  login: '/api/user/login'
}

/**
 * 接口请求方法封装 GET && POST
 */
function apiPost (url, data) {
  axios.defaults.headers.post['x-access-token'] = localStorage.token
  var str = Object.keys(data).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
  }).join('&')
  console.log('发起 post 请求 -> ', url, data)
  return axios.post(url + '?' + str, data)
}

function apiGet (url, data) {
  axios.defaults.headers.get['x-access-token'] = localStorage.token
  var str = Object.keys(data).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
  }).join('&')
  console.log('发起 post 请求 -> ', url, data)
  return axios.get(url + '?' + str, data)
}
/**
 * 接口请求地址封装
 * 规则：
 */
export default {
  login: (data) => apiPost(UserController.login, data), // 登录
}
