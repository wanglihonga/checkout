/**
 * Created by lx on 2018/3/1.
 */
import API from '../../api/resource'
import * as types from '../mutation-types'

const state = {
  userData: {}
}

const actions = {
  // 登录
  login: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.login(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 注册第一步
  register: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.register(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 注册第二部 包含选择角色
  registerSecond: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.registerSecond(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 获取用户详情
  userDetail: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.userDetail(data).then((res) => {
        commit(types.USER, res.data)
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 修改性别
  editSex: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.editSex(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 修改生日
  editBirthday: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.editBirthday(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 修改姓名
  editName: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.editName(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 修改微信
  editWeChat: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.editWeChat(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 修改微信
  editSelf: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.editSelf(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 修改手机号
  editMobile: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.editMobile(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 修改公司
  editCompany: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.editCompany(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 修改兴趣爱好
  editInterest: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.editInterest(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 教育背景
  education: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.education(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 添加教育背景
  addEducation: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.addEducation(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 删除教育背景
  deleteEducation: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.deleteEducation(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 工作经历
  work: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.work(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 添加工作经历
  addWork: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.addWork(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 添加工作经历
  deleteWork: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.deleteWork(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 我的标签
  lable: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.lable(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 添加标签
  addLable: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.addLable(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  balance: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.balance(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 我的群组
  myGroup: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.myGroup(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 忘记密码
  forgetPassword: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.forgetPassword(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 微信登录
  wxLogin: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.wxLogin(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 我的活动
  activity: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.activity(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 我的课程
  course: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.course(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 获取分享背景
  findShareUserImage: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.findShareUserImage(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  },
  // 添加分享背景
  addShareUserImage: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      API.addShareUserImage(data).then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      })
    })
  }
}

const mutations = {
  [types.USER] (state, respData) {
    if (respData.code == 0) {
      state.userData = respData.data
    }
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
