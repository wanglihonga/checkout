<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">会员详情</span>
    </Header>
    <div class="head-pic">
      <ul class="start">
        <li>
          <div class="head-person">
            <img :src="userDetail.photo">
          </div>
        </li>
        <li class="name">
          <span>{{userDetail.name}}</span>
        </li>
        <li class="introduce">
          <span v-for="(item, index) in labelist" :key="index">#{{item}}</span>
        </li>
      </ul>
    </div> <!--头部头像名字部分-->
    <div>
      <ul class="basic-information">
        <li>
          <div class="show-pic">
            <img src="../../assets/images/icon_information.png">
          </div>
          <span>基本信息</span>
        </li>
        <li>
          <span class="left">联系方式</span>
          <span class="right">{{userDetail.mobile}}</span>
        </li>
        <li>
          <span class="left">微信号</span>
          <span class="right">{{userDetail.wxAccount}}</span>
        </li>
        <li>
          <span class="left">生日</span>
          <span class="right">{{userDetail.birthday}}</span>
        </li>
        <li>
          <span class="left">兴趣爱好</span>
          <span class="right">{{userDetail.interest}}</span>
        </li>
      </ul>
    </div><!--基本信息-->
    <div class="content">
      <p class="title">简介</p>
      <p class="title-word">{{userDetail.selfIntroduction }}</p>
    </div><!--人物简介-->
    <div class="basic-information">
      <ul>
        <li>
          <div class="show-pic">
            <img src="../../assets/images/icon_jianjie.png">
          </div>
          <span>基本信息</span>
        </li>
      </ul>
    </div>
    <div class="content-box">
      <p class="title-word">{{userDetail.interest}}</p>
    </div><!--公司简介-->
    <div style="background: #fff">
      <ul>
        <li class="work-experience">
          <p>工作经历</p>
        </li>
        <li class="work-list" v-for="(item, index) in userDetail.workList" :key="index">
          <ol class="item-content">
            <li>{{item.companyName}}</li>
            <li>
              <p>职位：{{item.position}}</p>
              <p>起止时间：{{item.startTime}}-{{item.endTime}}</p>
            </li>
          </ol>
        </li>
      </ul>

    </div><!--工作经历-->
    <div style="background: #fff;">
      <ul class="education-item">
        <li class="education-experience">
          <p>教育背景</p>
        </li>
        <li v-for="(item1, index1) in userDetail.educationList" :key="index1">
          <ol class="item-content">
            <li>{{item1.school}}</li>
            <li>
              <p>专业：{{item1.major}}</p>
              <p>学历/学位：{{item1.degree}}</p>
              <p>起止时间：{{item1.startTime}}-{{item1.endTime}}</p>
            </li>
          </ol>
        </li>
      </ul>
    </div><!--教育背景-->
    <div style="background: #fff;">
      <ul class="education-item">
        <li class="hope-personal">
          <p>加入VUCA的三个愿望</p>
        </li>
        <li class="hope-content" v-for="(item, index) in userDetail.wishes" :key="index">
          <p>{{item}}</p>
        </li>
      </ul>
    </div><!--愿望-->
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  export default {
    name: 'membershipDetails',
    components: {
      Header
    },
    data () {
      return {
        userId: '',
        userDetail: {},
        labelist: []
      }
    },
    /**
     * 生命周期函数--keep-alive 组件激活时调用
     */
    activated: function () {
      let _this = this
      // 获取群组id
      this.userId = this.$route.query.userId
      let param = {
        userId: this.userId
      }
      console.log(this.userId)
      this.$store.dispatch('memberInfo', param).then(function (res) {
        console.log('会员信息')
        console.log(res)
        _this.labelist = []
        _this.userDetail = res.data
        _this.labelist = res.data.label.split(',')
      })
    }
  }
</script>

<style scoped>
  .bg-style{background: rgb(238,238,238);padding-top: 44px;padding-bottom: 40px;}
  .head-pic{height: 153px;width: 375px;background: url("../../assets/images/bg_people.png") center no-repeat;padding-top: 13px;}
  .start{text-align: center;}
  .head-person{height: 73px;width: 73px;margin-left: 150px;}
  .head-person img{height: 73px;width: 73px; border-radius: 100%;}
  .name{font-size: 17px;color:#ffffff;margin-top: 13px;}
  .introduce{font-size: 13px;color:#ffffff;margin-top: 10px;}
  .basic-information{margin-top: 10px;background: white;}
  .basic-information li{height: 45px;line-height: 43px;padding-left: 9px;border-bottom: 1px solid rgb(238,238,238);padding-right: 12px;}
  .basic-information li:nth-child(1){font-size: 15px;color: #333333;}
  .show-pic{width: 13px;height: 13px;margin-top: 4px;float: left;margin-right: 14px;}
  .show-pic img{width: 20px;}
  .left{font-size: 15px;color: #333333;margin-left: 4px;}
  .right{font-size: 15px;color: #666666;float: right;}
  .content{background: white;padding:15px 12px;padding-bottom: 10px;}
  .content img{width: 20px;}
  .content-box{background: white;padding:0 12px;padding-bottom: 10px;}
  .title{font-size: 15px;color: #333333;}
  .title-word{font-size: 15px;color: #666666;padding-top: 17px;line-height: 22px;}
  .work-experience{height: 55px;font-size:15px;line-height:55px;color:#333333;padding-left:36px;background: url("../../assets/images/icon_work.png") center left no-repeat;
    background-size: 22px; background-position: 10px;}
  .item-content{margin:0 10px;border-radius: 6px;padding: 15px 13px;background: white;}
  .item-content li{line-height: 20px;}
  .item-content li:nth-child(1){font-size: 16px;color: #262831;}
  .item-content li:nth-child(2){font-size: 14px;color: #64656a;margin-top: 18px;}
  .education-experience{height: 45px;font-size:15px;line-height:45px;color:#333333;padding-left:36px;background: url("../../assets/images/icon_jiaoyu.png") center left no-repeat;
    background-size: 22px; background-position: 10px 18px;padding-top: 6px;}
  .education-item>li:not(:first-child){margin-top: 10px;}
  .hope-personal{height: 45px;font-size:15px;line-height:45px;color:#333333;padding-left:36px;background: url("../../assets/images/icon_hope.png") center left no-repeat;
    background-size: 22px; background-position: 10px 18px;padding-top: 6px;}
  .hope-content{height: 70px;padding-left:35px;margin: 0 10px;border-radius: 6px;font-size: 15px;color: #333333;
      line-height: 74px;background: url("../../assets/images/icon_wish@2x.png") center left no-repeat white; background-size: 20px;
      background-position: 10px;}
  .work-list {
    margin-bottom: 10px;
  }
</style>

