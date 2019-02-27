<template>
  <div id="orderDetail">
    <Header :showBack="true">
      <span slot="title">支付结果</span>
    </Header>
    <section class="pay-content">
      <div class="top-finish">
        <img src="../../assets/images/finish.png" alt="">
        <p>支付成功！</p>
        <div>您可以到 "我的" 查看相关已购买过的课程/活动。</div>
      </div>
      <div class="back-list">
        <button type="button" @click="goBcakList">返回课程列表</button>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import {Button} from 'cube-ui'
  export default {
    name: 'Login',
    components: {
      Header,
      Button
    },
    data () {
      return {
      }
    },
    activated: function () {
    },
    methods: {
      goBcakList () {
        this.$router.go(-2)
      }
    },
    filters: {
    }
  }
</script>

<style scoped>
  .pay-content {text-align: center;padding-top: 100px}
  .pay-content img{width: 80px;}
  .top-finish p{font-size: 16px;padding: 15px;}
  .top-finish div{padding: 15px;color: #999;font-size: 14px;}
  .back-list {padding: 15px;}
  .back-list button{width: 100%;height: 45px;border-radius: 4px;background: #00bfff;color: #fff;font-size: 16px;}
</style>
