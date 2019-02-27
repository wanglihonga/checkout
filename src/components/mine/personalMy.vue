<template>
  <div>
    <Header :showBack="true">
        <span slot="title">我的</span>
    </Header>
    <div class="navPic">
      <div class="headPic">
        <img v-if="userDetail.photo" :src="userDetail.photo" >
        <img v-else src="../../assets/images/btn_LOGO.png" >
        <p>{{userDetail.nikeName}}</p>
      </div>
    </div>
    <section class="content">
      <div class="contentPart">
        <ul>
          <li class="border-bottom-1px">
            <div class="left">
              <img src="../../assets/images/icon_jifen.png">
            </div>
            <div class="right">
              <span>VUCA积分</span>
            </div>
          </li>
          <li class="singleItem">
            <a href="#">
                <div class="itemPic"><img src="../../assets/images/icon_huodong.png"></div>
                <div class="itelTitle">我的活动</div>
                <div class="itemMore"><img src="../../assets/images/icon_more.png"></div>
                <div class="clearFloat"></div>
            </a>
          </li>
          <li class="singleItem">
            <a href="#">
                <div class="itemPic"><img src="../../assets/images/icon_KECHENG.png"></div>
                <div class="itelTitle">我的课程</div>
                <div class="itemMore"><img src="../../assets/images/icon_more.png"></div>
                <div class="clearFloat"></div>
            </a>
          </li>
        </ul>
      </div>
      <div class="contentPart">
        <ul>
          <li class="singleItem">
            <a href="#" @click="goPersonalInformation">
                <div class="itemPic"><img src="../../assets/images/icon_gerenxinxi.png"></div>
                <div class="itelTitle">个人信息</div>
                <div class="itemMore"><img src="../../assets/images/icon_more.png"></div>
                <div class="clearFloat"></div>
            </a>
          </li>
          <li class="singleItem">
            <a href="#">
                <div class="itemPic"><img src="../../assets/images/icon_gongsixinxi.png"></div>
                <div class="itelTitle">公司信息</div>
                <div class="itemMore"><img src="../../assets/images/icon_more.png"></div>
                <div class="clearFloat"></div>
            </a>
          </li>
        </ul>
      </div>
      <div class="contentPart">
        <ul>
          <li class="singleItem">
            <a href="#">
              <div class="itemPic"><img src="../../assets/images/icon_wodequnzu.png"></div>
              <div class="itelTitle">我的群组</div>
              <div class="itemMore"><img src="../../assets/images/icon_more.png"></div>
              <div class="clearFloat"></div>
            </a>
          </li>
          <li class="singleItem">
            <a href="#">
              <div class="itemPic"><img src="../../assets/images/icon_qunzushenqing.png"></div>
              <div class="itelTitle">群组申请</div>
              <div class="itemMore"><img src="../../assets/images/icon_more.png"></div>
              <div class="clearFloat"></div>
            </a>
          </li>
          <li class="singleItem">
            <a href="#">
              <div class="itemPic"><img src="../../assets/images/icon_yaoqing.png"></div>
              <div class="itelTitle">邀请会员</div>
              <div class="itemMore"><img src="../../assets/images/icon_more.png"></div>
              <div class="clearFloat"></div>
            </a>
          </li>
        </ul>
      </div>
      <div class="contentPart">
        <ul>
          <li class="singleItem">
            <a href="#">
              <div class="itemPic"><img src="../../assets/images/icon_lianxiwomen.png"></div>
              <div class="itelTitle">联系我们</div>
              <div class="itemMore"><img src="../../assets/images/icon_more.png"></div>
              <div class="clearFloat"></div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  export default {
    name: 'personalMy',
    components: {
      Header
    },
    data () {
      return {
        userDetail: {}
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
      this.loadUserDetail()
    },
    /**
     * 组件内方法
     */
    methods: {
      // 获取用户详情
      loadUserDetail: function () {
        let _this = this
        this.$store.dispatch('userDetail', {}).then(function (res) {
          if (res.code == 0) {
            _this.userDetail = res.data
            localStorage.userDetail = JSON.stringify(res.data)
          } else {
            _this.$createToast({
              time: 2000,
              txt: res.msg,
              type: 'warn'
            }).show()
          }
        })
      },
      // 个人信息跳转
      goPersonalInformation: function () {
        this.$router.push('personalInformation')
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
  .navPic{width: 375px;height:153px;background: url("../../assets/images/bg_people.png");position: relative;margin-top: 40px;}
  .headPic{width: 73px;margin: 0 auto; padding-top: 13px;text-align: center}
  .headPic img{width: 73px;height: 73px;border-radius: 50%;}
  .headPic p{font-size: 17px;margin-top: 16px;color: white;}
  .content{background-color: rgb(238,238,238);padding-top: 12px;padding-bottom: 12px;}
  .singleItem{background-color: white;font-size: 16px;height: 50px;width: 375px;}
  .singleItem div{float: left;line-height: 50px;}
  .contentPart{margin-bottom: 12px;}
  .contentPart ul li:last-child{border:0;}
  .itemPic{width: 17.5px;height: 17.5px;margin-left: 11px;}
  .itemPic img{width: 17.5px;height: 17.5px;line-height: 50px;vertical-align:middle;}
  .itelTitle{font-size: 16px;margin-left: 22px;width: 306px;}
  .itemMore{width: 7.5px;height: 14.5px;margin-right: 11px;}
  .itemMore img{width: 7.5px;height: 14.5px;vertical-align:middle;}
  .clearFloat{clear: both;}
   .test li {overflow: hidden;padding: 0 6px;background: #fff}
  .test li div {float: left;font-size: 16px;min-height: 10px;}
  .test li div:nth-child(1){width: 20%;}
  .test li div:nth-child(2){width: 80%;background: url('../../assets/images/icon_more.png')center right no-repeat; background-size: 16px;}

</style>
