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
  // 课程列表
  memberInformation: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.memberInformation(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 群组列表
  groupList: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.groupList(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 群组列表
  deleteUserForGroup: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.deleteUserForGroup(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 群组申请列表
  grouplister: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.grouplister(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 群组详情
  groupInfo: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.groupInfo(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 会员详情
  memberInfo: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.memberInfo(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 群组成员审核
  checkMember: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.checkMember(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 申请入群提交信息
  applyGroup: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.applyGroup(data).then((res) => {
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
