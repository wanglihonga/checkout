<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">群组申请</span>
      <!--<span slot="action" @click="clear">清空</span>-->
    </Header>
    <div class="ulBox">
      <ul>
        <li @click="check(item.state,item.groupId, item.userId, index)" v-for="(item, index) in groupList" :key="index">
          <div class="title">
            <div class="name fl" @click="goDetail(item.userId)">{{item.nikeName}}</div>
            <div class="apply-type fl">#申请加入#</div>
            <div class="group-name">{{item.groupName}}</div>
          </div>
          <div class="time fl">{{item.createTime}}</div>
          <div class="list-content">{{item.reason}}</div>
          <!-- <div class="state yellow">待审核</div> -->
          <div v-if="item.state == 1" class="state yellow">待审核</div>
          <div v-if="item.state == 3" class="state red">已拒绝</div>
          <div v-if="item.state == 2" class="state green">已通过</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import None from '../common/None.vue'

  export default {
    name: 'personalEducation',
    components: {
      Header,
      None
    },
    data () {
      return {
        groupList: [],
        userName: ''
      }
    },
    /**
     * 生命周期函数--在实例创建完成后被立即调用
     */
    created: function () {
      console.log('a')
      let user = JSON.parse(window.localStorage.getItem('userDetail'))
      this.userName = user.nikeName
    },
    /**
     * 生命周期函数--keep-alive 组件激活时调用
     */
    activated: function () {
      let _this = this
      let param = {
        pageNum: 0
      }
      this.$store.dispatch('grouplister', param).then(function (res) {
        if (res.code == 0) {
          console.log(1)
          _this.groupList = res.data.data.list
          console.log(_this.groupList)
          if (_this.groupList.length < 1) {
            _this.noneFlag = true
          }
        }
      })
    },
    /**
     * 组件内方法
     */
    methods: {
      check (state, gid, uid, index) {
        if (state != 1) {
          return
        }
        this.$createDialog({
          type: 'confirm',
          icon: 'cubeic-alert',
          title: '审核',
          content: '请选择',
          showClose: true,
          confirmBtn: {
            text: '通过',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '拒绝',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            // 2代表审核通过 ,3拒绝
            this.submit(2, gid, uid, index)
          },
          onCancel: () => {
            this.submit(3, gid, uid, index)
          }
        }).show()
      },
      submit (flag, gid, uid, index) {
        let param = {
          groupId: gid,
          applyUserId: uid,
          state: flag
        }
        this.$store.dispatch('checkMember', param).then(res => {
          if (res.code == 0) {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '操作成功'
            }).show()
            this.groupList[index].state = flag == 2 ? 2 : 3
          }
        })
      },
      clear () {
        this.groupList = []
      },
      goDetail (id) {
        this.$router.push({name: 'membershipDetails', query: {userId: id}})
      }
    }
  }
</script>

<style scoped>
  .bg-style {
    background: rgb(238, 238, 238);
    padding-top: 44px;
    min-height: 667px;
  }

  .education-list {
    width: 351px;
    background: white;
    margin-left: 12px;
    margin-top: 10px;
    padding-top: 16px;
    border-radius: 5px;
    padding-bottom: 20px;
    position: relative;
  }

  .education-school {
    font-size: 16px;
    color: #262831;
    margin-left: 12px;
    margin-bottom: 20px;
  }

  .education-information {
    margin-left: 12px;
    font-size: 14px;
    color: #64656a;
  }

  .education-information p {
    margin-bottom: 6px;
  }

  .btn-add {
    width: 351px;
    height: 40px;
    border-radius: 5px;
    color: white;
    font-size: 17px;
    text-align: center;
    line-height: 40px;
    position: fixed;
    bottom: 5px;
    z-index: 10;
    background: url("../../assets/images/btn_next@2x.png") center;
    margin-left: 12px;
  }

  .choice {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    background: url("../../assets/images/icon_select_pre.png") center no-repeat;
    background-size: 24px;
  }

  .active .choice {
    background: url("../../assets/images/icon_select_nor.png") center no-repeat;
    background-size: 24px;
  }

  .ulBox li {
    margin-bottom: 10px;
    display: block;
    width: 100%;
    background: #fff;
    padding: 14px;
    position: relative
  }

  li .title {
    font-size: 14px;
    margin-bottom: 10px
  }

  li .title .name {
    margin-right: 10px;
    color: #0093d9;
  }

  .apply-type {
    margin-right: 10px
  }

  li .title .group-name {
    color: red;
  }

  li .state {
    position: absolute;
    right: 0;
    top: 14px;
    width: 60px;
    color: #fff;
    height: 20px;
    font-size: 12px;
    text-align: center;
    line-height: 20px
  }

  .red {
    background: #FF0000
  }

  .green {
    background: #009966
  }

  .yellow {
    background: #FFCC00
  }

  li .time {
    font-size: 1.2px;
    color: #999;
    margin-bottom: 10px;
    width: 100%
  }

  .list-content {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    padding: 5px 0;
    line-height: 21px;
  }
</style>
