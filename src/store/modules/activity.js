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
  // 活动列表
  activityList: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.activityList(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 活动详情
  activityInfo: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.activityInfo(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 活动报名
  activitySign: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.activitySign(data).then((res) => {
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
