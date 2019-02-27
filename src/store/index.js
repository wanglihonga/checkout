/**
 * Created by lx on 2018/3/1.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import user from './modules/user'
import activity from './modules/activity'
import course from './modules/course'
import member from './modules/member'
import company from './modules/company'
import order from './modules/order'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    'common': common,
    'user': user,
    'activity': activity,
    'course': course,
    'member': member,
    'company': company,
    'order': order
  }
})
