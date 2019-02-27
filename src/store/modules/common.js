import API from '../../api/resource'

/**
 * Created by lx on 2018/3/1.
 */
// import * as types from '../mutation-types'

const state = {
}

const actions = {
  // 发送验证码
  sendSms: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.sendSms(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  fileUpload: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.fileUpload(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  wxUpload: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.wxUpload(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  }
}

const mutations = {
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
