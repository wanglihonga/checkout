<template>
  <div id="ActivityDetail">
    <Header :showBack="true">
      <span slot="title"></span>
    </Header>
    <section class="content">
      <div class="pic-show">
        <img v-lazy="detailData.listImg" alt="">
      </div>
      <div class="title border-bottom-1px">
        <h4>{{detailData.title}}</h4>
        <div class="txt">
          <label>费用</label>
          <span>{{detailData.price}}元</span>
          <div class="right-num">
            已报名：{{detailData.joinNum}}人
          </div>
        </div>

      </div>
      <ul class="location">
        <li>
          <div><i class="time"></i></div>
          <div>活动时间：{{detailData.startTime}} - {{detailData.endTime}}</div>
        </li>
        <li>
          <div><i class="time"></i></div>
          <div>截止时间：{{detailData.limitTime}}</div>
        </li>
        <li>
          <div><i class="locate"></i></div>
          <div>活动地址：{{detailData.address}}</div>
        </li>
      </ul>

      <!--助教-->
      <section class="w-bg">
        <div class="box-title border-bottom-1px">
          <h4>活动顾问</h4>
        </div>
        <div class="box">
          <ul class="member-list">
            <li class="border-bottom-1px" v-for="(item, index) in detailData.assistants" :key="index" @click="goAsDetail(item)">
              <section class="member">
                <div>
                  <img v-lazy="item.photo">
                </div>
                <div>
                  <h4>{{item.name}}</h4>
                  <p class="labels">{{item.mobile}}</p>
                </div>
                <div class="arrow" v-show="true"></div>
              </section>
              <!--<p class="profile">这是均价这是均价这是均价这是均价这是均价这是均价这是均价这是均价这是均价</p>-->
            </li>
          </ul>
        </div>
      </section>
      <!--课程详情-->
      <section class="w-bg">
        <div class="box-title border-bottom-1px">
          <h4>活动详情</h4>
        </div>
        <div class="box detail resize-img" v-html="detailData.detailImg"></div>
      </section>
    </section>
    <section class="fix-btn">
      <button class="bg0" type="button" v-if="detailData.state == 0">报名已满</button>
      <button class="bg1" type="button" v-if="detailData.state == 1">活动报名中</button>
      <button class="bg2" type="button" v-if="detailData.state == 2">活动进行中...</button>
      <button class="bg3" type="button" v-if="detailData.state == 3">活动已结束</button>
      <button class="bg4" type="button" v-if="detailData.state == 4" @click="submitOrder">我要报名</button>
      <button class="bg5" type="button" v-if="detailData.state == 5">已报名</button>
    </section>
  </div>
</template>

<script>
  import Header from '../common/HeaderOpa'
  export default {
    name: 'Activity',
    components: {
      Header
    },
    data () {
      return {
        detailData: {},
        activityId: '',
        pageFlag: ''
      }
    },
    /**
     * 生命周期函数--在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
     */
    beforeCreate: function () {
    },
    /**
     * 生命周期函数--在实例创建完成后被立即调用
     */
    created: function () {
    },
    /**
     * 生命周期函数--在挂载开始之前被调用：相关的 render 函数首次被调用
     */
    beforeMount: function () {
    },
    /**
     * 生命周期函数--el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
     */
    mounted: function () {
    },
    /**
     * 生命周期函数--数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前
     */
    beforeUpdate: function () {
    },
    /**
     * 生命周期函数--由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
     */
    updated: function () {
    },
    /**
     * 生命周期函数--keep-alive 组件激活时调用
     */
    activated: function () {
      let _this = this
      // 获取页面标识
      this.pageFlag = this.$route.query.page || ''
      // 获取活动id
      this.activityId = this.$route.query.activityId
      // 查询详情数据
      let param = {
        activityId: this.activityId
      }
      this.$store.dispatch('activityInfo', param).then(function (res) {
        if (res.code == 0) {
          _this.detailData = res.data
          console.log(res)
        } else {
          _this.$createToast({
            time: 2000,
            txt: res.msg,
            type: 'error'
          }).show()
        }
      })
    },
    /**
     * 组件内方法
     */
    methods: {
      submitOrder: function () {
        let _this = this
        let param = {
          activityId: this.$route.query.activityId
        }
        this.$store.dispatch('activitySign', param).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            console.log(res.data.data)
            _this.$router.push({path: '/orderDetail', query: {detail: _this.detailData, orderNum: res.data.data}})
          } else {
            _this.$createToast({
              time: 2000,
              txt: res.msg,
              type: 'error'
            }).show()
          }
        })
      },
      goAsDetail: function (item) {
        this.$router.push({path: '/assistant', query: {detail: item}})
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
  #ActivityDetail {background: #eee;position: absolute;min-height: 100%;width: 100%;}
  .content{}
  .pic-show{width: 100%;height: 200px;}
  .pic-show img{width: 100%;height: 100%;}
  .title{padding: 10px;background: #fff;}
  .title h4{font-size: 16px;font-weight: bold;color: #333;line-height: 1.3}
  .title .txt{overflow: hidden;margin-top: 10px;padding-top: 3px;}
  .title .txt label{vertical-align:middle;float: left;font-size: 12px;color: #999;margin-top: 6px;}
  .title .txt span{vertical-align:middle;float: left;font-size: 18px;color: #c92f1b;margin-left: 5px;}
  .location{background: #fff;padding: 10px;font-size: 14px;color: #666;margin-bottom: 10px;}
  .location>li{overflow: hidden;line-height: 30px;}
  .location>li>div:nth-child(1){float: left;width: 10%;}
  .location>li>div:nth-child(2){float: left;width: 90%;}
  .location>li i{float: left; width: 15px;height: 15px;margin-top: 7px;}
  .time{background: url("../../assets/images/icon_clock.png")center no-repeat;background-size: 20px;}
  .locate{background: url("../../assets/images/icon_dingwei.png")center no-repeat;background-size: 20px;}
  .box-title{padding: 15px 10px;}
  .box-title h4{font-size: 16px;padding-left: 12px;border-left: 3px solid #226cb6;height: 16px;line-height: 16px;}
  .w-bg{background: #fff;margin-bottom: 10px;}
  .content{padding-bottom: 40px;border-bottom:1px solid #ccc;}
  .member {overflow: hidden;padding: 0 10px;padding-left: 0;}
  .member-list li{padding: 10px 0;overflow: hidden;margin-left: 10px;}
  .member div{float: left;}
  .member div:nth-child(1){width: 20%;}
  .member div:nth-child(2){width: 70%;}
  .member div:nth-child(3){width: 10%;height: 56px;}
  .member div img{width: 56px;height: 56px;border-radius: 56px;vertical-align: middle}
  .member div h4{font-size: 16px;color: #333;margin-top: 8px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  .member div .labels{font-size: 14px;color: #999;margin-top: 6px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  .arrow{background: url("../../assets/images/icon_more.png")center no-repeat;background-size: 20px;}
  .profile{font-size: 14px;color: #666;line-height: 1.4;padding: 15px 10px;padding-left: 0;}
  .host{font-size: 14px;color: #666;}
  .detail{padding: 10px;font-size: 14px;}
  .detail img{max-width: 100%;}
  .fix-btn{position: fixed;left:0;bottom: 0;width: 100%;height: 50px;z-index: 100;background-color: #fff;text-align: center;}
  .fix-btn .fix-l{width: 50%; float: left;height: 100%;
    text-align: center;
    line-height: 50px;}
  .fix-btn .fix-r{width: 50%; float: right;height: 100%;}
  .fix-btn button{font-size: 18px;background-color: #226cb6;color: #fff;width: 100%;height: 100%;}
  .right-num {float: right;font-size: 14px;color: #999;padding-top: 5px;}
  .fix-btn bg0 {background: #c92f1b}
  .fix-btn bg1 {background: #11365b}
  .fix-btn bg2 {background: #009966}
  .fix-btn bg3 {background: #dddddd}
  .fix-btn bg4 {background: #009966}
  .fix-btn bg5 {background: #226cb6}
</style>
