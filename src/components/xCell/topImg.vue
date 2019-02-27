<template>
  <div>
    <section>
      <img class="img" src="../../assets/test.png"/>
      <div class="bottomBox">
        <span></span>
        <p>"温暖一冬"产品</p>
        <span></span>
      </div>
    </section>
    <section>
      <img class="img" src="../../assets/test.png"/>
      <div class="bottomBox">
        <span></span>
        <p>"温暖一冬"产品</p>
        <span></span>
      </div>
    </section>
    <section>
      <img class="img" src="../../assets/test.png"/>
      <div class="bottomBox">
        <span></span>
        <p>"温暖一冬"产品</p>
        <span></span>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {},
    computed: {},
    components: {}
  }
</script>
<style scoped>
  .img{width: 100%;height: 156px;border-radius: 10px 10px 0 0;}
  .bottomBox{display: flex;justify-content: center;align-items:center;padding: 10px 0;}
  .bottomBox span:nth-child(1), span:nth-child(3) {width: 35px;height: 2px;background-color: #EE5522;}
  .bottomBox p:nth-child(2) {font-family: PingFangSC-Regular;font-size: 16px;color: #2B3133;letter-spacing: 0;margin:0 17px;}
</style>
