<template>
  <div class="myorder">
    <p class="title">欢迎充值！</p>
    <div class="txtbox">
      <p>您的订单：{{orderNum}}</p>
      <p>即将为您充值，请您确认支付！</p>
    </div>
    <div class="toPay">
      <button @click="money">确认支付</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myorder',
  data () {
    return {
      orderNum: '',
      data: {}
    }
  },
  methods: {
    money () {
      console.log('确认支付')
      let param = {
        orderNo: this.$route.query.orderNum
      }
      let _this = this
      this.$store.dispatch('preparePay', param).then(function (res) {
        _this.data = res.data.sign
      })
    }
  },
  created () {
    this.orderNum = this.$route.query.orderNum
    console.log(this.orderNum)
  }
}
</script>

<style>
.title {
  font-size: 16px;
  line-height: 25px;
  font-weight: bold;
  text-align: center;
  padding-top: 30px;
}
.txtbox {
  font-size: 14px;
  line-height: 25px;
  text-align: center;
}
.toPay {
  padding-top: 50px;
  text-align: center;
}
.toPay button {
  font-size: 14px;
  padding: 15px 20px;
}
</style>
