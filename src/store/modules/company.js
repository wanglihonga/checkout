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
  companyInformation: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.companyInformation(data).then((res) => {
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
