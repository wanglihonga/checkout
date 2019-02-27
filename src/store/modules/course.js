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
  courseList: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.courseList(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 课程详情
  courseInfo: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.courseInfo(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 课程报名
  courseSignUp: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.courseSignUp(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 组员列表
  courseMemberList: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.courseMemberList(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 组员互评
  courseMemberReview: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.courseMemberReview(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 课程导师列表
  courseTeacherList: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.courseTeacherList(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 导师列表
  TeacherList: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.TeacherList(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 导师详情
  courseTeacherDetail: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.courseTeacherDetail(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 导师评价
  courseTeacherReview: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.courseTeacherReview(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 助教列表
  courseAssistantList: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.courseAssistantList(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 助教评价
  courseAssistantReview: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.courseAssistantReview(data).then((res) => {
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
