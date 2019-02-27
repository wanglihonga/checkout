<template>
  <div id="orderDetail">
    <Header :showBack="true">
      <span slot="title">订单确认</span>
    </Header>
    <section class="order-content">
      <div class="box">
        <div class="pic-box">
          <img v-lazy="detail.listImg" alt="">
        </div>
        <h4 class="order-title"><i class="cubeic-right"></i>请确认订单信息</h4>
        <ul class="order-txt">
          <li>
            <div class="col-3">活动名称</div>
            <div class="col-7">{{detail.title || '暂无信息'}}</div>
          </li>
          <li>
            <div class="col-3">订单金额</div>
            <div class="col-7 money">￥{{detail.price | formatMoney}}</div>
          </li>
          <li>
            <div class="col-3">订单编号</div>
            <div class="col-7">{{orderNum || '暂无信息'}}</div>
          </li>
          <li>
            <div class="col-3">活动时间</div>
            <div class="col-7">{{detail.startTime || ''}} - {{detail.endTime || ''}}</div>
          </li>
          <li>
            <div class="col-3">活动地点</div>
            <div class="col-7">{{detail.address}}</div>
          </li>
        </ul>
      </div>
      <div class="pay-btn">
        <button type="button" @click="toPay">支付</button>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import {Button} from 'cube-ui'
  import {registerWx} from '../../assets/js/util'

  export default {
    name: 'Login',
    components: {
      Header,
      Button
    },
    data () {
      return {
        detail: {},
        orderNum: ''
      }
    },
    activated: function () {
      this.detail = this.$route.query.detail
      this.orderNum = this.$route.query.orderNum
      // 注册微信
      let params = {
        // url: encodeURIComponent(window.location.href.split('#')[0])
        url: window.location.href.split('#')[0]
      }
      console.log(window.location.href)
      this.$store.dispatch('wxConfig', params).then(function (res) {
        if (res.code == 0) {
          registerWx(res.data)
        }
      })
    },
    methods: {
      toPay () {
        let _this = this
        let params = {
          orderNo: this.orderNum
        }
        this.$store.dispatch('preparePay', params).then((res) => {
          // 拉起微信支付
          if (res.code == 0) {
            let data = res.data
            console.log(data)
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                'appId': data.appId,     // 公众号名称，由商户传入
                'timeStamp': data.timeStamp,         // 时间戳，自1970年以来的秒数
                'nonceStr': data.nonceStr, // 随机串
                'package': 'prepay_id=' + data.prepayid,
                'signType': 'MD5',         // 微信签名方式：
                'paySign': data.paySign // 微信签名
              },
              function (res) {
                if (res.err_msg == 'get_brand_wcpay_request:ok') {
                  _this.$router.push('/payFinish')
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              }
            )

            /* wx.chooseWXPay({
              appId: data.appId,
              timeStamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: 'prepay_id=' + data.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign, // 支付签名
              success: function (res) {
                // 支付成功后的回调函数
                _this.$router.go(-2)
              },
              fail: function (err) {
                console.log(err)
              }
            }) */
          } else {
            this.$createToast({
              time: 2000,
              txt: res.msg,
              type: 'error'
            }).show()
          }
        })
      }
    },
    filters: {
      formatMoney (val) {
        return val / 1
      }
    }
  }
</script>

<style scoped>
  #orderDetail {
    padding-top: 45px;
    background: #393a35;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .order-content {
    padding: 15px;
  }

  .order-content .box {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

  .pic-box {
    max-height: 300px;
  }

  .pic-box img {
    width: 100%;
  }

  .order-title {
    text-align: center;
    font-size: 20px;
    color: #226cb6;
    padding: 8px 0;
  }

  .order-txt {
    padding: 10px;
    margin-top: 10px;
  }

  .order-txt li {
    overflow: hidden;
    padding: 5px 0;
  }

  .order-txt li div {
    float: left;
    font-size: 14px;
    color: #999;
  }

  .col-3 {
    width: 25%
  }

  .col-7 {
    width: 75%;
  }

  .pay-btn {
    margin-top: 30px;
  }

  .money {
    color: red !important;
  }

  .pay-btn button {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background: #00bfff;
    color: #fff;
    font-size: 18px;
    border-radius: 4px;
  }
</style>
