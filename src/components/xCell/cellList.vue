<template>
  <div>
    <section class="cellListBox">
      <img class="img" src="../../assets/test.png"/>
      <p>"一生有我"活动盛大启动</p>
      <div class="day">
        2019-01-21 至 2019-02-21
      </div>
      <img v-if="1 === 1" class="rightImg" :src="1 === 2 ? baoming : end" height="56" width="60"/>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baoming: require('../../assets/images/cellListImg/btn_baoming.png'),
      end: require('../../assets/images/cellListImg/btn_end.png')
    }
  },
  methods: {},
  computed: {},
  components: {}
}
</script>
<style scoped>
  .cellListBox{padding: 12px 16px;position:relative;}
 .img{width: 100%;height: 150px;border-radius: 10px 10px 0 0;}
 p{font-size: 16px;color: #2B3133;padding: 10px 0;font-family: PingFangSC-Regular;}
  .day{font-size: 12px;color: #95A1A6;}
  .rightImg{position: absolute;right: 31px;bottom:15px;}
</style>
