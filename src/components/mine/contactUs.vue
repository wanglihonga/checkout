<template>
  <div id="contactUs">
    <Header :showBack="true">
      <span slot="title">{{title}}</span>
    </Header>
    <div class="box">
      <div class="picbox">
        <img src="../../assets/images/logo@2x.png" alt="">
      </div>

      <ul class="cont">
        <li>
          <h4>地址 / Add</h4>
          <p>北京市海淀区中关村软件园华夏科技大厦</p>
        </li>
        <li>
          <h4>电话 / Tel</h4>
          <p>010-5828 000</p>
        </li>
        <li>
          <h4>邮箱 / Email</h4>
          <p>admin@vuca.comm</p>
        </li>
      </ul>
    </div>
    <p class="company">北京乌卡科技有限公司</p>
  </div>
</template>

<script>
import Header from '../common/Header.vue'
export default {
  name: 'contactUs',
  components: {
    Header
  },
  data () {
    return {
      title: '联系我们',
      address: '北京市海淀区中关村软件园华夏科技大厦',
      phone: '010-5828 6000',
      http: 'www.vuca.com'
    }
  }
}
</script>

<style scoped>
  .box {padding-top: 45px;}
  .picbox {text-align: center;padding: 40px 0 20px 0}
  .picbox img{margin: 0 auto;width: 120px;}
  .cont {padding: 15px;font-size: 14px;text-align: center}
  .cont li{margin-bottom: 14px}
  .cont li h4 {font-size: 14px;color: #666;}
  .cont li p {font-size: 14px;color: #333;margin-top: 5px;}
  .company {position: absolute;width: 100%;left:0;bottom: 20px;text-align: center;font-size: 14px;color: #999;}
</style>
