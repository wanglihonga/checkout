<template>
  <div class="bg-style">
    <Header>
      <span slot="title">充值</span>
    </Header>
    <section class="w-bg">
      <div class="box-title border-bottom-1px">
        <h4>请充值</h4>
      </div>
      <div class="input">
        <input type="text" placeholder="请输入充值金额" v-model="price">
        <cube-button @click="pay">提交</cube-button>
      </div>

    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import None from '../common/None.vue'
  import { Button } from 'cube-ui'
  // import {wexinPay} from '../../assets/js/util'
  export default {
    name: 'personalEducation',
    components: {
      Header,
      None,
      Button
    },
    data () {
      return {
        price: '',
        orderNum: ''
      }
    },
    /**
     * 生命周期函数--在实例创建完成后被立即调用
     */
    created: function () {
    },
    /**
     * 生命周期函数--keep-alive 组件激活时调用
     */
    activated: function () {
      function GetQueryString (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      }
      this.type = GetQueryString('type')
      localStorage.code = GetQueryString('code')
      // let param = { wxCode: localStorage.code }
      /* this.$store.dispatch('getWxode', param).then(function (res) {
        if (res.code == 0) {
          localStorage.openId = res.data.openId
        }
      }) */
    },
    /**
     * 组件内方法
     */
    methods: {
      pay () {
        let param = {
          price: this.price
        }
        let _this = this
        this.$store.dispatch('submitRechargeOrder', param).then(function (res) {
          console.log(res)
          _this.orderNum = res.data
          _this.$router.push({path: '/myorder', query: {orderNum: _this.orderNum}})
        })
      }
    }
  }
</script>

<style scoped>
  .bg-style{
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
    margin-top: 44px;
    background: #fff;
    margin-bottom: 10px;
  }
  .input {
    height: 40px;
    width: 100%;
    padding: 14px;
  }
  input {
    margin-bottom: 20px;
    border: 1px solid deepskyblue;
    border-radius: 5px;
    font-size: 14px;
    height: 40px;
    width: 100%;
  }
</style>
