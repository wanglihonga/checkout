<template>
  <div id="Mine">
    <div class="nav-pic">
      <div class="head-pic">
        <img src="../../assets/images/default-header.png" alt="头像" v-if="!userDetail.photo">
        <img v-lazy="userDetail.photo" v-else>
        <p>{{userDetail.nikeName || 'VUCA'}}</p>
      </div>
    </div> <!--头像-->
    <section class="content">
      <div class="content-part">
        <ul class="concat">
          <!--<li class="border-bottom-1px">-->
          <!--<div class="left">-->
          <!--<img src="../../assets/images/icon_jifen.png">-->
          <!--</div>-->
          <!--<div class="right" @click="goPersonalIntegral">-->
          <!--<span>我的充值</span>-->
          <!--</div>-->
          <!--</li>-->
          <li class="border-bottom-1px">
            <div class="left">
              <img src="../../assets/images/icon_huodong.png">
            </div>
            <div class="right" @click="goActivityList">
              <span>我的活动</span>
            </div>
          </li>
          <li class="border-bottom-1px">
            <div class="left">
              <img src="../../assets/images/icon_KECHENG.png">
            </div>
            <div class="right" @click="goCourseList">
              <span>我的课程</span>
            </div>
          </li>
        </ul>
        <ul class="concat">
          <li class="border-bottom-1px">
            <div class="left">
              <img src="../../assets/images/icon_gerenxinxi.png">
            </div>
            <div class="right" @click="goPersonalInformation">
              <span>个人信息</span>
            </div>
          </li>
          <li class="border-bottom-1px">
            <div class="left">
              <img src="../../assets/images/icon_gongsixinxi.png">
            </div>
            <div class="right" @click="gocompanyInformation">
              <span>公司信息</span>
            </div>
          </li>
        </ul>
        <ul class="concat">
          <li class="border-bottom-1px" @click="jump2Group">
            <div class="left">
              <img src="../../assets/images/icon_wodequnzu.png">
            </div>
            <div class="right">
              <span>我的群组</span>
            </div>
          </li>
          <li class="border-bottom-1px" @click="gogroupList">
          <li class="border-bottom-1px">
          <li class="border-bottom-1px" @click="goGroupApply">
            <div class="left">
              <img src="../../assets/images/icon_qunzushenqing.png">
            </div>
            <div class="right">
              <span>群组申请</span>
            </div>
            <section class="dot">{{userDetail.num == null ? 0 : userDetail.num }}</section>
          </li>
          <li class="border-bottom-1px">
            <div class="left">
              <img src="../../assets/images/icon_yaoqing.png">
            </div>
            <div class="right" @click="gofriendInvite">
              <span>邀请会员</span>
            </div>
          </li>
        </ul>
        <ul class="concat">
          <li class="border-bottom-1px">
            <div class="left">
              <img src="../../assets/images/icon_lianxiwomen.png">
            </div>
            <div class="right" @click="gocontactUs">
              <span>联系我们</span>
            </div>
          </li>
        </ul>
      </div>
    </section> <!--项目-->
  </div>
</template>

<script>
  import Header from '../common/Header.vue'

  export default {
    name: 'personalMine',
    data () {
      return {
        userDetail: {},
        pageNum: 0,
        status: null,
        keyword: '',
        name: ''
      }
    },
    components: {
      Header
    },
    /**
     * 生命周期函数--在实例创建完成后被立即调用
     */
    created: function () {
      // this.$router.push({path: '/login', query: {url: 'personalMine'}})
      // 获取用户详情
      let _this = this
      this.$store.dispatch('userDetail', {}).then(function (res) {
        if (res.code == 0) {
          _this.userDetail = res.data
          _this.name = res.data.nikeName
          console.log(_this.userDetail)
        } else {
          _this.$createToast({
            time: 2000,
            txt: res.msg,
            type: 'warn'
          }).show()
        }
      })
    },
    methods: {
      // 个人信息跳转
      goPersonalIntegral: function () {
        this.$router.push('/personalIntegral')
      },
      // 个人积分跳转
      goPersonalInformation: function () {
        this.$router.push('personalInformation')
      },
      // 公司信息跳转
      gocompanyInformation: function () {
        this.$router.push({path: '/companyInformation', query: {detail: this.userDetail}})
      },
      // 个人活动跳转
      goActivityList: function () {
        this.$router.push('/myActivityList')
      },
      // 个人课程跳转
      goCourseList: function () {
        this.$router.push('/myCourseList')
      },
      // 群组申请跳转
      gogroupList: function () {
        this.$router.push('/groupList')
      },
      // 好友邀请跳转
      goGroupApply: function () {
        this.$router.push({path: '/groupApply', query: {name: this.name}})
      },
      gofriendInvite: function () {
        this.$router.push({path: 'friendInvite', query: {name: this.name}})
      },
      gocontactUs: function () {
        this.$router.push('contactUs')
      },
      // 跳转到我的群组
      jump2Group: function () {
        this.$router.push({
          name: 'myGroup'
        })
//        let _this = this
//        let param = {
//          pageNum: _this.pageNum,
//          keyword: _this.keyword
//        }
//        this.$store.dispatch('', param).then(function (res) {
//          console.log(res)
//        })
      }
    }
  }
</script>

<style scoped>
  #Mine {
    background: rgb(238, 238, 238);
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .nav-pic {
    width: 375px;
    height: 153px;
    background: url("../../assets/images/bg_people.png") center no-repeat;
    background-size: cover
  }

  .head-pic {
    margin: 0 auto;
    text-align: center;
    font-size: 17px;
    padding-top: 16px;
    color: white;
  }

  .head-pic img {
    width: 73px;
    height: 73px;
    border-radius: 50%;
    margin-bottom: 17px;
  }

  .content {
    padding-top: 10px;
    padding-bottom: 18px;
  }

  .concat {
    margin-bottom: 10px;
  }

  .concat li {
    overflow: hidden;
    padding: 0 6px 0 10px;
    width: 375px;
    position: relative;
    background: white;
  }

  .concat li:last-child {
    border: 0;
  }

  .concat li div {
    float: left;
    font-size: 16px;
    min-height: 10px;
    height: 45px;
    line-height: 45px;
  }

  .concat li div:nth-child(1) {
    width: 10%;
  }

  .left {
    padding-top: 3px;
  }

  .left img {
    width: 18px;
  }

  .concat li div:nth-child(2) {
    width: 90%;
    background: url('../../assets/images/icon_more.png') center right no-repeat;
    background-size: 16px;
  }
  .dot {
    position: absolute;
    right: 26px;
    background: red;
    width: 24px;
    height: 24px !important;
    border-radius: 50%;
    font-weight: bold;
    color: #fff;
    font-size: 12px;
    line-height: 24px !important;
    top: 50%;
    margin-top: -12px;
    text-align: center;
  }
</style>
