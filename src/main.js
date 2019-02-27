import 'amfe-flexible'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './assets/style/wt_reset.css'
import DatePicker from './components/common/DatePicker.vue'

Cube.createAPI(Vue, DatePicker, ['select', 'cancel'], false)

Vue.use(Cube)

Vue.config.productionTip = false

// 路径跳转判断
router.beforeEach((route, redirect, next) => {
  function GetQueryString (name) {
    let str = window.location.search.substr(1)
    var strList = str.split('&')
    for (var index in strList) {
      if (strList[index].split('=')[0] == name) {
        return strList[index].split('=')[1]
      }
    }
  }
  localStorage.code = GetQueryString('code')
  let type = GetQueryString('type')
  if (route.path == '/') {
    // 判断用户信息是否存在
    if (!localStorage.token) {
      switch (type) {
        case '1':
          localStorage.router = '/groupList'
          router.push({path: '/login', query: {url: 'groupList'}})
          break
        case '2':
          localStorage.router = '/tutorList'
          router.push({path: '/login', query: {url: 'tutorList'}})
          break
        case '3':
          localStorage.router = '/courseList'
          router.push({path: '/login', query: {url: 'courseList'}})
          break
        case '4':
          localStorage.router = '/activityList'
          router.push({path: '/login', query: {url: 'activityList'}})
          break
        case '5':
          localStorage.router = '/personalMine'
          router.push({path: '/login', query: {url: 'personalMine'}})
          break
      }
    } else {
      switch (type) {
        case '1':
          router.replace('/groupList')
          break
        case '2':
          router.replace('/tutorList')
          break
        case '3':
          router.replace('/courseList')
          break
        case '4':
          router.replace('/activityList')
          break
        case '5':
          router.replace('/personalMine')
          break
      }
    }
  }
  next()
})

// 图片懒加载
Vue.use(VueLazyload, {
  loading: require('@/assets/images/default.jpg'),
  error: require('@/assets/images/default.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
