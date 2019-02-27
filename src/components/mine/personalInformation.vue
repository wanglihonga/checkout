<template>
  <div class="bg-style">
    <Header @click="goLogin" :showBack="true">
      <span slot="title">个人信息</span>
    </Header>
    <div class="personal-headpic border-bottom-1px">
        <div class="head-word">头像</div>
        <div class="head-pic">
          <img v-lazy="userDetail.photo">
        </div>
        <div class="nav-next"><img src="../../assets/images/icon_more.png"></div>
    </div> <!--头像-->
    <div class="item-bg">
      <ul>
        <li class="personal-item border-bottom-1px" @click="changeName">
            <div class="item-name"><p>姓名</p></div>
            <div class="item-content"><p>{{userDetail.nikeName}}</p></div>
            <div class="item-next"><img src="../../assets/images/icon_more.png"></div>
        </li>
        <li @click="showSexPicker" class="personal-item border-bottom-1px">
            <div class="item-name"><p>性别</p></div>
            <div class="item-content">
              <p v-if="userDetail.sex == 1">男</p>
              <p v-else-if="userDetail.sex == 2">女</p>
              <p v-else>请选择</p>
            </div>
            <div class="item-next"><img src="../../assets/images/icon_more.png"></div>
        </li>
        <li @click="showUserBirthdayPicker" class="personal-item border-bottom-1px">
            <div class="item-name"><p>生日</p></div>
            <div class="item-content"><p v-if="userBirthday">{{userBirthday}}</p></div>
            <div class="item-next"><img src="../../assets/images/icon_more.png"></div>
        </li>
        <li class="personal-item border-bottom-1px" @click="gochangeMobile">
            <div class="item-name"><p>手机号</p></div>
            <div class="item-content"><p v-if="userDetail.mobile">{{userDetail.mobile}}</p></div>
            <div class="item-next"><img src="../../assets/images/icon_more.png"></div>
        </li>
        <li @click="goChangeWechat" class="personal-item border-bottom-1px">
            <div class="item-name"><p>微信号</p></div>
            <div class="item-content"><p v-if="userDetail.wxAccount">{{userDetail.wxAccount}}</p></div>
            <div class="item-next"><img src="../../assets/images/icon_more.png"></div>
        </li>
        <li @click="goPersonalLike" class="personal-item border-bottom-1px">
            <div class="item-name"><p>兴趣爱好</p></div>
            <div class="item-content"><p v-if="userDetail.like">{{userDetail.like}}</p></div>
            <div class="item-next"><img src="../../assets/images/icon_more.png"></div>
        </li>
        <li @click="goPersonalEducation" class="personal-item border-bottom-1px">
            <div class="item-name"><p>教育经历</p></div>
            <div class="item-content"><p>编辑</p></div>
            <div class="item-next"><img src="../../assets/images/icon_more.png"></div>
        </li>
        <li @click="goWorkExperience" class="personal-item border-bottom-1px">
            <div class="item-name"><p>工作经历</p></div>
            <div class="item-content"><p>编辑</p></div>
            <div class="item-next"><img src="../../assets/images/icon_more.png"></div>
        </li>
        <li @click="goSelfIntroduction" class="personal-item border-bottom-1px">
            <div class="item-name"><p>自我介绍</p></div>
            <div class="item-content"><p>编辑</p></div>
            <div class="item-next"><img src="../../assets/images/icon_more.png"></div>
        </li>
        <li @click="goPersonalLabel" class="personal-item border-bottom-1px">
            <div class="item-name"><p>我的标签</p></div>
            <div class="item-content"><p>编辑</p></div>
            <div class="item-next"><img src="../../assets/images/icon_more.png"></div>
        </li>
      </ul>
    </div> <!--个人信息-->

  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  export default {
    name: 'personalInformation',
    components: {
      Header
    },
    data () {
      return {
        userDetail: {},
        userBirthday: '',
        flag: false
      }
    },
    created: function () {
      this.userBirthday = this.userDetail.birthday
    },
    beforeMount: function () {
    },
    mounted: function () {
      // 性别选择器
      let _this = this
      this.sexPicker = this.$createPicker({
        title: '请选择性别',
        data: [[{text: '男', value: 1}, {text: '女', value: '2'}]],
        onSelect: function (selectedVal, selectedIndex, selectedText) {
          _this.userDetail.sex = selectedVal[0]
          // 更新服务端数据
          _this.$store.dispatch('editSex', {sex: selectedVal[0]}).then(function (res) {
            if (res.code == 0) {
              _this.$createToast({
                time: 2000,
                txt: '修改成功',
                type: 'correct'
              }).show()
            } else {
              _this.$createToast({
                time: 2000,
                txt: res.msg,
                type: 'warn'
              }).show()
            }
          })
        }
      })
    },
    activated: function () {
      // 获取用户详情
      let _this = this
      this.$store.dispatch('userDetail', {}).then(function (res) {
        if (res.code == 0) {
          _this.userDetail = res.data
          _this.userBirthday = res.data.birthday
        } else {
          _this.$createToast({
            time: 2000,
            txt: res.msg,
            type: 'warn'
          }).show()
        }
      })
    },
    /**
     * 组件内方法
     */
    methods: {
      goLogin: function () {
        this.$router.push('/personalMine')
      },
      showSexPicker: function () { // 显示性别选择器
        this.sexPicker.show()
      },
      showUserBirthdayPicker: function () { // 显示生日日期控件
        // 日期选择器
        this.datePicker = this.$createDatePicker({
          min: [1970, 1, 1],
          max: [2020, 12, 31],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            this.userBirthday = selectedVal[0] + '-' + selectedVal[1] + '-' + selectedVal[2]
            this.callbackUserBirthdayPicker()
          }
        }).show()
      },
      callbackUserBirthdayPicker: function () { // 生日日期控件回调
        let _this = this
        this.$store.dispatch('editBirthday', {birthday: this.userBirthday}).then(function (res) {
          if (res.code == 0) {
            _this.$createToast({
              time: 2000,
              txt: '修改成功',
              type: 'correct'
            }).show()
          } else {
            _this.$createToast({
              time: 2000,
              txt: res.msg,
              type: 'error'
            }).show()
          }
        })
      },
      goPersonalLike: function () { // 跳转兴趣爱好
        this.$router.push('personalLike')
      },
      goChangeWechat: function () { // 跳转修改微信
        this.$router.push('changeWechat')
      },
      gochangeMobile: function () { // 跳转修改手机号
        this.$router.push({path: '/changeMobile', query: {mobile: this.userDetail.mobile}})
      },
      goPersonalEducation: function () { // 跳转教育经历
        this.$router.push('personalEducation')
      },
      goSelfIntroduction: function () { // 跳转修改自我介绍
        this.$router.push('selfIntroduction')
      },
      goWorkExperience: function () { // 跳转工作经历
        this.$router.push('workExperience')
      },
      goPersonalLabel: function () { // 跳转我的标签
        this.$router.push('personalLabel')
      },
      changeName: function () { // 跳转修改姓名
        this.$router.push('/changeName')
      }
    },
    /**
     * 计算属性
     */
    computed: {
    }
  }
</script>

<style scoped>
  .bg-style{background: rgb(238,238,238);padding-top: 44px;min-height: 667px;}
  .personal-headpic{width: 375px;height: 60px;line-height: 60px;background: white;}
  .personal-headpic div{float: left;}
  .head-word{margin-left: 11px;font-size: 15px;color: #333333;}
  .head-pic{width: 50px;height: 50px;margin-left: 262px;margin-top: 5px;}
  .head-pic img{width: 50px;height: 50px;border-radius: 50%;}
  .nav-next{width: 8px;height: 15px;margin-left: 7px;}
  .nav-next img{height: 15px;vertical-align:middle;}
  .personal-item{width: 375px;height: 50px;line-height:50px;overflow: hidden;}
  .personal-item div{float: left;}
  .item-bg{background: white;}
  .item-bg ul li:last-child{border: 0;}
  .item-name{font-size: 15px;margin-left: 12px;line-height: 50px;color: #333333;float: left;width: 100px;}
  .item-content{width: 240px;}
  .item-content p{color: #666666;font-size: 15px;line-height: 50px;float: right;display: inline-block;}
  .item-next{height: 50px;margin-left: 7px;line-height: 50px;}
  .item-next img{height: 15px;}
  .item-bg li>div{min-height: 30px;}
</style>
