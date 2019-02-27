<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">导师详情</span>
    </Header>
    <div class="tutor-box">
      <div class="itempic">
        <img :src="datalist.photo" alt="">
      </div>
      <ul class="tutor-list">
        <li>
          <ol class="tutor-item">
            <li>{{datalist.name}} <span class="teacher_title">/ {{datalist.teacherTitle}}</span></li>
            <!--<li v-if="datalist.teacherTitle"></li>-->
          </ol>
        </li>
        <li>{{datalist.label}}#</li>
      </ul>
    </div>
    <div class="content">
      <div class="content-pic border-bottom-1px">
        <ul>
          <li>导师介绍</li>
          <!--<li>导师空闲时间：{{datalist.teacherFreeTime}}</li>-->
        </ul>
      </div><!--导师姓名-->
      <div class="content-word">
        <p class="content-p" v-html="datalist.selfIntroduction"></p>
        <!-- <img class="inset-pic" src="../../assets/images/bg_daoshi.jpg"> -->
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import Tutor from '../common/Tutor.vue'
  export default {
    name: 'tutorDetails',
    components: {
      Header,
      Tutor
    },
    data () {
      return {
        datalist: []
      }
    },
    methods: {
      getCreated () {
        let _this = this
        // 获取活动id
        this.userId = this.$route.query.userId
        // 查询详情数据
        let param = {
          userId: this.userId
        }
        console.log(this.userId)
        this.$store.dispatch('courseTeacherDetail', param).then(function (res) {
          console.log(res)
          _this.datalist = res.data[0]
          console.log(_this.datalist)
        })
      }
    },
    activated () {
      this.getCreated()
    }
  }
</script>

<style scoped>
  .bg-style{background: rgb(238,238,238);height: 100%;position: absolute;}
  .tutor-box{width: 375px;height: 160px;background-size: 375px;padding-top: 45px;}
  .tutor-list {
     position: absolute;
  }
  .tutor-item{overflow: hidden;}
  .tutor-item li{color: #fff;float: left;margin-top: 34px;z-index: 999;}
  .tutor-item li:nth-child(1){font-size: 20px;margin-left: 14px;z-index: 999;}
  .tutor-item li:nth-child(2){z-index: 999;font-size: 12px;margin-left: 8px;padding-left: 8px;border-left:1px solid white;height: 14px;padding-top: 2px;}
  .tutor-list{overflow: hidden;}
  .tutor-list>li:nth-child(2){font-size: 14px;color: rgba(255, 255, 255, 0.75);margin-left: 14px;margin-top: 10px;}
  .content{width: 353px;margin-left: 11px;background: white;border-radius: 4px;position: absolute;top:192px;min-height: 300px;}
  .content-pic{height: 50px;line-height:50px;background: url("../../assets/images/iocn_teacher.png") center left no-repeat;background-size: 20px;
    background-position: 17px;}
  .content-pic ul li:nth-child(1){font-size: 15px;color:#333333;margin-left: 40px;padding-top: 1px;}
  .content-pic ul li:nth-child(2){font-size: 15px;color: #666666;margin-left: 28px;margin-bottom: 15px;}
  .content-word{font-size: 14px;color: #999999;padding: 10px;line-height: 1.5;text-align: justify}
  .teacher_title {font-size: 14px;color: #fff;padding: 10px 15px;opacity: 0.9;}
  .itempic {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
  }
  .itempic img {
    width: 100%;
    max-height: 210px;
  }
</style>
