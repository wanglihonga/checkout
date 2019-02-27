import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login.vue'
import search from '@/components/search.vue'
import personalMine from '@/components/mine/personalMine.vue'
import forgetPassword from '@/components/login/forgetPassword.vue'
import register from '@/components/register/register.vue'
import choiceRole from '@/components/register/choiceRole.vue'
import desire from '@/components/register/desire.vue'
import finish from '@/components/register/finish.vue'
import personalInformation from '@/components/mine/personalInformation.vue'
import personalIntegral from '@/components/mine/personalIntegral.vue'
import personalEducation from '@/components/mine/personalEducation.vue'
import workExperience from '@/components/mine/workExperience.vue'
import companyInformation from '@/components/mine/companyInformation.vue'
import friendInvite from '@/components/mine/friendInvite.vue'
import myGroup from '@/components/mine/myGroup.vue'
import activitySign from '@/components/activity/activitySign.vue'
import activityList from '@/components/activity/activityList.vue'
import activityDetail from '@/components/activity/activityDetail.vue'
import payFinish from '@/components/order/payFinish.vue'
// import orderDetail from '@/components/activity/orderDetail.vue'
import courseList from '@/components/course/courseList.vue'
import courseDetail from '@/components/course/courseDetail.vue'
import personalLabel from '@/components/mine/personalLabel.vue'
import personalLike from '@/components/mine/personalLike.vue'
import courseMember from '@/components/course/courseMember.vue'
import courseScore from '@/components/course/courseScore.vue'
import courseTeacher from '@/components/course/courseTeacher.vue'
import groupJoin from '@/components/group/groupJoin.vue'
import groupCreate from '@/components/group/groupCreate.vue'
import membershipDetails from '@/components/group/membershipDetails.vue'
import tutorList from '@/components/tutor/tutorList.vue'
import tutorDetails from '@/components/tutor/tutorDetails.vue'
import changeName from '@/components/mine/changeName.vue'
import addEducation from '@/components/mine/addEducation.vue'
import addWork from '@/components/mine/addWork.vue'
import changeWechat from '@/components/mine/changeWechat.vue'
import myActivityList from '@/components/mine/myActivityList.vue'
import selfIntroduction from '@/components/mine/selfIntroduction.vue'
import groupList from '@/components/group/groupList.vue'
import groupDetail from '@/components/group/groupDetail.vue'
import groupApply from '@/components/mine/groupApply.vue'
import pay from '@/components/common/pay.vue'
import changeMobile from '@/components/mine/changeMobile.vue'
import registerOther from '@/components/register/registerOther.vue'
import contactUs from '@/components/mine/contactUs.vue'
import myorder from '@/components/common/Myorder.vue'
import assistant from '@/components/assistant/assistant.vue'
import orderDetail from '@/components/order/orderDetail.vue'
import share from '@/components/mine/share.vue'
import myCourseList from '@/components/mine/myCourseList.vue'
import cellList from '@/components/xCell/topImg.vue'

import product from '@/modules/hotProduct/index'
import money from '@/modules/hotProduct/money'
import activity from '@/modules/activityNotice/index'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/login', name: 'login', component: login}, // 登录
    {path: '/activity', name: 'activity', component: activity}, // 活动通知
    {path: '/product', name: 'product', component: product }, // 热销产品
    {path: '/money', name: 'money', component: money }, // 热销产品--现金管理

    {path: '/pay', name: 'pay', component: pay}, // 充值
    {path: '/search', name: 'search', component: search}, // 搜索
    {path: '/forgetPassword', name: 'forgetPassword', component: forgetPassword}, // 忘记密码
    {path: '/register', name: 'register', component: register}, // 注册
    {path: '/choiceRole', name: 'choiceRole', component: choiceRole}, // 选择角色
    {path: '/desire', name: 'desire', component: desire}, // 加入愿望
    {path: '/finish', name: 'finish', component: finish}, // 完成注册
    {path: '/personalMine', name: 'personalMine', component: personalMine}, // 我的
    {path: '/personalInformation', name: 'personalInformation', component: personalInformation}, // 个人信息
    {path: '/changeName', name: 'changeName', component: changeName}, // 修改姓名
    {path: '/addEducation', name: 'addEducation', component: addEducation}, // 添加教育经历
    {path: '/addWork', name: 'addWork', component: addWork}, // 添加工作经历
    {path: '/personalIntegral', name: 'personalIntegral', component: personalIntegral}, // 积分
    {path: '/personalEducation', name: 'personalEducation', component: personalEducation}, // 教育背景
    {path: '/workExperience', name: 'workExperience', component: workExperience}, // 工作经历
    {path: '/companyInformation', name: 'companyInformation', component: companyInformation}, // 公司信息
    {path: '/friendInvite', name: 'friendInvite', component: friendInvite}, // 好友邀请
    {path: '/activityList', name: 'activityList', component: activityList}, // 活动列表
    {path: '/activityDetail', name: 'activityDetail', component: activityDetail}, // 活动详情
    {path: '/activityDetail/orderDetail', name: 'orderDetail', component: orderDetail}, // 活动订单详情
    {path: '/personalLabel', name: 'personalLabel', component: personalLabel}, // 我的标签
    {path: '/personalLike', name: 'personalLike', component: personalLike}, // 兴趣爱好
    {path: '/courseMember', name: 'courseMember', component: courseMember}, // 组员互评
    {path: '/courseList', name: 'courseList', component: courseList}, // 课程列表
    {path: '/courseDetail', name: 'courseDetail', component: courseDetail}, // 课程详情
    {path: '/courseScore', name: 'courseScore', component: courseScore}, // 导师评分
    {path: '/courseTeacher', name: 'courseTeacher', component: courseTeacher}, // 助教评分
    {path: '/groupJoin', name: 'groupJoin', component: groupJoin}, // 申请入组
    {path: '/groupCreate', name: 'groupCreate', component: groupCreate}, // 创建小组
    {path: '/membershipDetails', name: 'membershipDetails', component: membershipDetails}, // 会员详情
    {path: '/tutorList', name: 'tutorList', component: tutorList}, // 导师
    {path: '/tutorDetails', name: 'tutorDetails', component: tutorDetails}, // 导师详情
    {path: '/changeWechat', name: 'changeWechat', component: changeWechat}, // 修改微信号
    {path: '/changeMobile', name: 'changeMobile', component: changeMobile}, // 修改手机号
    {path: '/selfIntroduction', name: 'selfIntroduction', component: selfIntroduction}, // 修改自我介绍
    {path: '/groupList', name: 'groupList', component: groupList}, // 群组列表
    {path: '/groupDetail', name: 'groupDetail', component: groupDetail}, // 群组详情
    {path: '/myGroup', name: 'myGroup', component: myGroup}, // 我的群组
    {path: '/activitySign', name: 'activitySign', component: activitySign}, // 我要报名
    {path: '/groupApply', name: 'groupApply', component: groupApply}, // 群组申请
    {path: '/registerOther', name: 'registerOther', component: registerOther}, // 其它注册
    {path: '/contactUs', name: 'contactUs', component: contactUs}, // 联系我们
    {path: '/myorder', name: 'myorder', component: myorder}, // 我的订单
    {path: '/assistant', name: 'assistant', component: assistant}, // 助教详情
    {path: '/myActivityList', name: 'myActivityList', component: myActivityList}, // 我的活动
    {path: '/orderDetail', name: 'orderDetail', component: orderDetail}, // 订单详情
    {path: '/myCourseList', name: 'myCourseList', component: myCourseList}, // 我的课程
    {path: '/share', name: 'share', component: share}, // 分享页面
    {path: '/payFinish', name: 'payFinish', component: payFinish}, // 分享页面
    {path: '/', name: 'cellList', component: cellList} // 上中下分布列表页面
  ]
})
