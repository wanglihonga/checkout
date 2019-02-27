<template>
  <div id="orderDetail">
    <Header :showBack="true">
      <span slot="title">订单详情</span>
    </Header>
    <section class="content">
      <section class="ac-box">
        <div class="left">
          <div class="pic-box" :style="{background: 'url(' + orderDetail.photo + ') no-repeat center'}"></div>
        </div>
        <div class="right">
          <h4>{{orderDetail.title}}</h4>
          <p>开始时间：{{orderDetail.startTime}}</p>
          <p>结束时间：{{orderDetail.endTime}}</p>
          <p>活动地点：{{orderDetail.address}}</p>
        </div>
      </section>

      <section class="order">
        <h4 class="border-bottom-1px">订单信息</h4>
        <ul class="order-content">
          <li>订单编号：{{orderNo}}</li>
          <li>订单金额：{{orderDetail.price}}</li>
          <li>下单时间：{{orderDetail.createTime}}</li>
        </ul>
      </section>


    </section>
    <section class="fix-btn">
      <button type="button" @click="pay">一键支付</button>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  export default {
    name: 'orderDetail',
    components: {
      Header
    },
    data () {
      return {
        orderDetail: {},
        orderNo: ''
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
      // 获取订单详情
      this.orderNo = this.$route.query.orderNumber
      this.$store.dispatch('orderInfo', { orderNo: this.orderNo }).then(function (res) {
        if (res.code == 0) {
          _this.orderDetail = res.data
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
      pay: function () {
        this.$store.dispatch('preparePay', { orderNo: this.orderNo }).then(function (res) {
          if (res.code == 0) {
            // 返回活动详情页
          }
        })
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
  #orderDetail {background: #eee;position: absolute;min-height: 100%;width: 100%;}
  .content{padding-top: 45px;}
  .ac-box{padding: 10px;background: #fff;overflow: hidden}
  .ac-box .left{float: left;width: 30%;}
  .ac-box .right{float: right;width: 70%;font-size: 14px;color: #666;}
  .ac-box .left .pic-box {width: 90px;height: 90px;background-size: cover!important;}
  .ac-box .right h4{font-size: 16px;color: #333;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;margin-bottom: 15px;}
  .ac-box .right p{margin-bottom: 6px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
  .fix-btn{position: fixed;left:0;bottom: 0;width: 100%;height: 50px;background: #226cb6;color: #fff;z-index: 100}
  .fix-btn button{width: 100%;height: 50px;font-size: 16px;background: #226cb6;}
  .order {background: #fff;margin-top: 10px;}
  .order h4{font-size: 16px;padding: 14px 10px;font-size: 16px;color: #333;}
  .order-content {padding: 10px;font-size: 14px;color: #666;}
  .order-content li{padding: 6px 0;}
</style>
