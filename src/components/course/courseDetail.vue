<template>
  <div id="ActivityDetail">
    <Header :showBack="true">
      <span slot="title"></span>
    </Header>
    <section class="content">
      <div class="pic-show">
        <img v-lazy="courseDetail.listImg">
      </div>
      <div class="title border-bottom-1px">
        <h4>{{courseDetail.title}}</h4>
        <div class="txt">
          <label>费用</label>
          <span>{{courseDetail.price}}元</span>
        </div>
      </div>
      <ul class="location">
        <li>
          <div><i class="time"></i></div>
          <div>活动时间：{{courseDetail.startTime}} - {{courseDetail.endTime}}</div>
        </li>
        <li>
          <div><i class="time"></i></div>
          <div>截止时间：{{courseDetail.limitTime}}</div>
        </li>
        <li>
          <div><i class="locate"></i></div>
          <div>活动地址：{{courseDetail.address}}</div>
        </li>
      </ul>

      <!--导师-->
      <section class="w-bg">
        <div class="box-title border-bottom-1px">
          <h4>私董导师</h4>
        </div>
        <div class="box">
          <ul class="member-list">
            <li class="border-bottom-1px" v-for="(item, index) in courseDetail.teacherList" :key="index"
                @click="goTourDetail(item)">
              <section class="member">
                <div class="photo-box">
                  <img v-lazy="item.photo">
                </div>
                <div>
                  <h4>{{item.name}}</h4>
                  <!--<p class="labels">标签</p>-->
                </div>
                <div class="arrow"></div>
              </section>
              <p class="profile">{{item.selfIntroduction | strLenth}}</p>
            </li>
          </ul>
        </div>
      </section>
      <!--观察员-->
      <section class="w-bg">
        <div class="box-title border-bottom-1px">
          <h4>观察员</h4>
        </div>
        <div class="box">
          <ul class="member-list">
            <li class="border-bottom-1px" v-for="(item, index) in courseDetail.observerList" :key="index">
              <section class="member">
                <div>
                  <img v-lazy="item.photo">

                </div>
                <div>
                  <h4>{{item.name}}</h4>
                  <p class="labels">{{item.mobile}}</p>
                </div>
                <div class="arrow" v-show="false"></div>
              </section>
              <p class="profile">{{item.detail}}</p>
            </li>
          </ul>
        </div>
      </section>
      <!--助教-->
      <section class="w-bg">
        <div class="box-title border-bottom-1px">
          <h4>课程助教</h4>
        </div>
        <div class="box">
          <ul class="member-list">
            <li class="border-bottom-1px" v-for="(item, index) in courseDetail.assistantList" :key="index">
              <section class="member">
                <div>
                  <img v-lazy="item.photo">
                </div>
                <div>
                  <h4>{{item.name}}</h4>
                  <p class="labels">{{item.mobile}}</p>
                </div>
                <!--<div class="arrow" v-show="true"></div>-->
              </section>
              <p class="profile">{{item.detail}}</p>
            </li>
          </ul>
        </div>
      </section>
      <!--主办人-->
      <section class="w-bg">
        <div class="box-title border-bottom-1px">
          <h4>主办人信息</h4>
        </div>
        <div class="box">
          <ul class="member-list">
            <li class="border-bottom-1px">
              <section class="host">{{courseDetail.creater}}</section>
            </li>
          </ul>
        </div>
      </section>
      <!--课程详情-->
      <section class="w-bg">
        <div class="box-title border-bottom-1px">
          <h4>课程详情</h4>
        </div>
        <div class="box">
          <div class="member-list2" v-html="courseDetail.detailImg">
          </div>
        </div>
      </section>
    </section>
    <section>
      <div class="appraise common-bottom" v-if="courseDetail.state === 0 ">
        <button @click="goAppraise(courseDetail.courseId)">待评价</button>
      </div>
      <div class="complete common-bottom" v-if="courseDetail.state == 2">
        <button>已报名</button>
      </div>
      <div class="sign common-bottom" v-if="courseDetail.state == 3">
        <button @click="goSign(courseDetail.courseId)">我要报名</button>
      </div>
      <div class="on-ing common-bottom" v-if="courseDetail.state == 4 ">
        <button>课程已开始</button>
      </div>
      <div class="common-bottom" v-if="courseDetail.state == 5 ">
        <button class="bg-gray">课程已结束</button>
      </div>
      <div class="common-bottom" v-if="courseDetail.state == 6 ">
        <button class="bg-gray">非该课程组会员</button>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from '../common/HeaderOpa.vue'

  export default {
    name: 'Activity',
    components: {
      Header
    },
    data () {
      return {
        courseId: '',
        courseDetail: {},
        page: '',
        activeCode: ''
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
      // 课程id
      this.courseId = this.$route.query.courseId
      this.page = this.$route.query.page
      // 课程详情
      let _this = this
      let param = {
        courseId: this.courseId
      }
      this.$store.dispatch('courseInfo', param).then(function (res) {
        console.log(res)
        _this.courseDetail = res.data
      })
    },
    /**
     * 组件内方法
     */
    methods: {
      // 评价
      goAppraise (id) {
        console.log(id)
        let that = this
        // 具体哪块置灰等待接口修改
        this.$createActionSheet({
          title: '选择评论',
          pickerStyle: true,
          data: [
            {
              content: '组员互评'
            },
            {
              content: '导师评分'
            },
            {
              content: '顾问评分'
            }
          ],
          onSelect: (item, index) => {
            let arr = that.courseDetail.score.split(',')
            // this.$createToast({
            //   txt: `您已经进行${item.content}过了`,
            //   type: 'warn',
            //   time: 1000
            // }).show()
            if (index == 0) {
              if (arr[0] == 1) {
                this.$createToast({
                  txt: `您已经进行${item.content}过了`,
                  type: 'warn',
                  time: 1000
                }).show()
                return
              }
              if (that.courseDetail.count == 1) {
                this.$createToast({
                  txt: `暂无组员可评价`,
                  type: 'warn',
                  time: 1000
                }).show()
                return
              }
              that.$router.push({name: 'courseMember', query: {id: id}})
            } else if (index == 1) {
              if (arr[1] == 1) {
                this.$createToast({
                  txt: `您已经进行${item.content}过了`,
                  type: 'warn',
                  $events: {
                    timeout: () => {
                      that.$router ? that.$router.back() : window.history.back()
                    }
                  },
                  time: 1000
                }).show()
                return
              }
              that.$router.push({name: 'courseScore', query: {id: id}})
            } else {
              if (arr[2] == 1) {
                this.$createToast({
                  txt: `您已经进行${item.content}过了`,
                  type: 'warn',
                  time: 1000
                }).show()
                return
              }
              that.$router.push({name: 'courseTeacher', query: {id: id}})
            }
          },
          onCancel: () => {
          }
        }).show()
      },
      // 报名
      goSign (id) {
        let that = this
        this.$store.dispatch('courseSignUp', {courseId: id}).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            that.courseDetail.state = ''
            that.$router.push({path: '/orderDetail', query: {detail: that.courseDetail, orderNum: res.data.data}})
            /* that.$createToast({
              txt: res.data.data,
              type: 'correct',
              time: 1000
            }).show() */
          } else if (res.code == 1) {
            that.courseDetail.state = ''
            that.$createToast({
              txt: res.msg,
              type: 'error',
              time: 1000
            }).show()
          } else {
            that.$router.push({name: 'pay'})
          }
        })
      },
      // 跳转导师详情
      goTourDetail (item) {
        this.$router.push({path: '/tutorDetails', query: {userId: item.teacherId}})
      }
    },
    /**
     * 计算属性
     */
    computed: {},
    filters: {
      strLenth (str) {
        if (str == null) {
          return '没有更多导师资料~'
        } else {
          if (str.length < 70) {
            return str
          } else {
            return str.slice(0, 70) + '...'
          }
        }
      }
    }
  }
</script>

<style scoped>
  #ActivityDetail {
    padding-bottom: 60px;
    background: #eee;
    position: absolute;
    min-height: 100%;
    width: 100%;
  }

  .content {
    /*padding-top: 45px;*/
  }

  .pic-show {
    width: 100%;
    height: 200px;
  }

  .pic-show img {
    width: 100%;
    height: 100%;
  }

  .title {
    padding: 10px;
    background: #fff;
  }

  .title h4 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    line-height: 1.3
  }

  .title .txt {
    overflow: hidden;
    margin-top: 10px;
  }

  .title .txt label {
    float: left;
    font-size: 12px;
    color: #999;
    margin-top: 6px;
  }

  .title .txt span {
    float: left;
    font-size: 18px;
    color: #c92f1b;
    margin-left: 5px;
  }

  .location {
    background: #fff;
    padding: 10px;
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }

  .location > li {
    overflow: hidden;
    height: 30px;
    line-height: 30px;
  }

  .location > li > div:nth-child(1) {
    float: left;
    width: 10%;
  }

  .location > li > div:nth-child(2) {
    float: left;
    width: 90%;
  }

  .location > li i {
    float: left;
    width: 15px;
    height: 15px;
    margin-top: 7px;
  }

  .time {
    background: url("../../assets/images/icon_clock.png") center no-repeat;
    background-size: 20px;
  }

  .locate {
    background: url("../../assets/images/icon_dingwei.png") center no-repeat;
    background-size: 20px;
  }

  .box-title {
    padding: 15px 10px;
  }

  .box-title h4 {
    font-size: 16px;
    padding-left: 12px;
    border-left: 3px solid #226cb6;
    height: 16px;
    line-height: 16px;
  }

  .w-bg {
    background: #fff;
    margin-bottom: 10px;
  }

  .member {
    overflow: hidden;
    padding: 0 10px;
    padding-left: 0;
  }

  .member-list {
    width: 100%;
    font-size: 14px;
  }

  .member-list li {
    padding: 10px 0;
    overflow: hidden;
    margin-left: 10px;
  }

  .member-list2 {
    width: 100%;
    font-size: 14px;
    line-height: 1.5;
    padding: 15px;
    text-align: justify;
  }

  .member-list2 li {
    padding: 10px 0;
    overflow: hidden;
    margin-left: 10px;
    text-align: center;
  }

  .member-list2 img {
    max-width: 100% !important;
  }

  .member div {
    float: left;

  }

  .member div:nth-child(1) {
    width: 20%;
  }

  .member div:nth-child(2) {
    padding-left: 10px;
    width: 70%;
  }

  .member div:nth-child(3) {
    width: 10%;
    height: 56px;
    float: right !important;
  }

  .member div img {
    width: 56px;
    height: 56px;
    border-radius: 56px;
    vertical-align: middle
  }

  .photo-box {
    width: 56px !important;
    height: 56px;
    border-radius: 56px;
    overflow: hidden;
    text-align: right;
  }

  .photo-box img {
    float: right;
    height: 56px;
    width: auto !important;
  }

  .member div h4 {
    font-size: 16px;
    color: #333;
    margin-top: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .member div .labels {
    font-size: 14px;
    color: #999;
    margin-top: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .arrow {
    background: url("../../assets/images/icon_more.png") center no-repeat;
    background-size: 20px;
  }

  .profile {
    font-size: 14px !important;
    color: #666;
    line-height: 1.4;
    padding: 15px 10px;
    padding-left: 0;
  }

  .host {
    font-size: 14px;
    color: #666;
  }

  .common-bottom {
    color: #fff;
    font-size: 14px;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: white;
  }

  .sign button {
    background: #1883D7;
    width: 100%;
    height: 50px;
  }

  .complete button {
    background: #ccc;
    width: 100%;
    height: 50px;
  }

  .appraise button {
    background: #009966;
    width: 100%;
    height: 50px;
  }

  .on-ing button {
    background: #2c3e50;
    width: 100%;
    height: 50px;
    color: #fff;
  }
</style>
