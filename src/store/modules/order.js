/**
 * Created by lx on 2018/3/5.
 */
/**
 * Created by lx on 2018/3/1.
 */
import API from '../../api/resource'
// import * as types from '../mutation-types'

const state = {
}

const actions = {
  // 提交订单
  submitRechargeOrder: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.submitRechargeOrder(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 支付
  preparePay: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.preparePay(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 订单详情
  orderInfo: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.orderInfo(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 注册微信
  wxConfig: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.wxConfig(data).then((res) => {
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
