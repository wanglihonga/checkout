<template>
  <div id="groupDetail" style="background: #f2f2f2">
    <Header :showBack="true">
      <span slot="title">群组</span>
      <span slot="action" v-if="groupDetail.applyPerm == 3" @click="apply">申请加入</span>
      <span slot="action" v-if="groupDetail.applyPerm == 1" >待审核</span>
      <span slot="action" v-if="groupDetail.applyPerm == 0" @click="out">申请退出</span>
    </Header>
    <section class="content">
      <div class="top-content">
        <section class="inner-content">
          <div class="left">
            <img :src="groupDetail.photo | logoFilter">
          </div>
          <div class="right">
            <h3>{{groupDetail.name}}</h3>
            <ul class="little-title">
              <li>创建日期：{{groupDetail.createTime}}</li>
            </ul>
          </div>
        </section>
        <p class="profile border-top-1px">{{groupDetail.detail}}</p>
      </div>

      <div class="member-list">
        <h4 class="border-bottom-1px">当前会员数({{groupDetail.userNum}}人)</h4>
        <ul>
          <li class="border-bottom-1px" v-for="(item, index) in groupDetail.memberList" v-if="groupDetail.memberList != 0" @click="goMemberDetail(item)" :key="index">
            <div class="top-content">
              <section class="inner-content">
                <div class="left">
                  <img :src="item.photo | headerFilter">
                </div>
                <div class="right">
                  <h3>{{item.name}}</h3>
                  <ul class="tag" v-html="item.label">
                    <!--<li>#2人</li>-->
                    <!--<li>#测试#</li>-->
                  </ul>
                </div>
              </section>
              <p class="profile">{{item.selfIntroduction | maxNum}}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  export default {
    name: 'groupDetail',
    components: {
      Header
    },
    data () {
      return {
        groupId: '',
        groupDetail: {}
      }
    },
    activated: function () {
      this.groupDetail = {}
      let _this = this
      this.groupId = this.$route.query.groupId
      let param = {
        groupId: this.groupId
      }
      console.log(param)
      this.$store.dispatch('groupInfo', param).then(function (res) {
        console.log(res)
        _this.groupDetail = res.data
        console.log(_this.groupDetail)
      })
    },
    /**
     * 组件内方法
     */
    methods: {
      // 跳转至会员详情
      goMemberDetail: function (item) {
        console.log('会员详情')
        console.log(item)
        // 判断是否有权限
        if (this.groupDetail.applyPerm == 0) {
          this.$router.push({name: 'membershipDetails', query: {userId: item.userId}})
        }
        if (this.groupDetail.applyPerm == 1) {
          this.$createToast({
            time: 2000,
            txt: '您的资料正在审核中。',
            type: 'warn'
          }).show()
        }
        if (this.groupDetail.applyPerm == 3) {
          this.$createToast({
            time: 2000,
            txt: '点击右上角申请加入小组',
            type: 'warn'
          }).show()
        }
      },
      // 申请加入
      apply: function () {
        this.$router.push({path: '/groupJoin', query: {groupId: this.groupDetail.groupId}})
      },
      out: function () {
        this.$store.dispatch('deleteUserForGroup', {groupId: this.groupId}).then((res) => {
          if (res.code == 0) {
            this.$createToast({
              time: 1000,
              txt: '退组成功',
              $events: {
                timeout: () => {
                  location.reload()
                }
              },
              type: 'warn'
            }).show()
          }
        })
      }
    },
    /**
     * 计算属性
     */
    computed: {
    },
    filters: {
      maxNum (str) {
        let result = ''
        if (str == null) {
          return ''
        }
        if (str.length > 50) {
          result = str.slice(0, 50) + '...'
        } else {
          result = str
        }
        return result
      },
      logoFilter (src) {
        let result = ''
        console.log('===>', src)
        if (src == 'http://vuca.oss-cn-beijing.aliyuncs.com/' || src == '' || src == undefined) {
          result = require('../../assets/images/group-logo.png')
        } else {
          result = src
        }
        return result
      },
      headerFilter (src) {
        let result = ''
        console.log('===>', src)
        if (src == 'http://vuca.oss-cn-beijing.aliyuncs.com/' || src == '' || src == undefined) {
          result = require('../../assets/images/default-pic.png')
        } else {
          result = src
        }
        return result
      }
    }
  }
</script>

<style scoped>
  #groupDetail{position: absolute;top:0;left:0;width: 100%;height: 100%;}
  .member-list h4{background: #fff;margin-top: 10px;font-size: 14px;padding: 14px 10px;color: #999;}
  .content{padding-top: 45px;}
  .top-content{font-size: 14px;background: #fff;}
  .top-content .left{float: left;width: 22%;}
  .top-content .right{float: left;width: 78%;}
  .top-content img{width: 56px;height: 56px;border-radius: 56px;}
  .top-content .right h3{font-size: 16px;color: #333;font-weight: bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-top: 10px;padding: 2px 0;}
  .little-title{font-size: 14px;color: #999;overflow: hidden;margin-top: 12px;}
  .little-title li{float: left;padding: 2px 0;}
  .little-title li:nth-child(1){width: 70%;}
  .inner-content{overflow: hidden;padding: 10px;}
  .profile{clear: both;padding: 10px;line-height: 1.4;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden; }
  .tag li{float: left;font-size: 14px;color: #999;}
  .tag {font-size: 14px;color: #999;overflow: hidden;margin-top: 12px;}
</style>
