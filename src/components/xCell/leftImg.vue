<template>
  <div>
    <section class="leftImgBox">
      <img class="img" src="../../assets/test.png"/>
      <div class="rightBox">
        <p>2019-01-21</p>
        <p>科学部署推动京津冀协同发展</p>
        <p>要从全局的高度和更长远的考虑来认识和做好京津冀协同发展工作要从全局的高度和更长远的考虑来认识和做好京津冀协同发展工作要从全局的高度和更长远的考虑来认识和做好京津冀协同发展工作</p>
      </div>
    </section>
    <section class="leftImgBox">
      <img class="img" src="../../assets/test.png"/>
      <div class="rightBox">
        <p>2019-01-21</p>
        <p>科学部署推动京津冀协同发展</p>
        <p>要从全局的高度和更长远的</p>
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
  .leftImgBox{margin:10px;display: flex;justify-content: space-between;height: 106px;}
  .img{width:104px;height:106px;margin-right: 15px;border-radius: 10px 0 0 10px;}
  .rightBox{width: 100%;}
  .rightBox p:nth-child(1) {font-family: PingFangSC-Light;font-size: 12px;color: #7BBEFF;line-height: 20px;}
  .rightBox p:nth-child(2) {font-family: PingFangSC-Regular;font-size: 15px;color: #2B3133;letter-spacing: -0.38px;padding:6px 0;}
  .rightBox p:nth-child(3) {font-family: PingFangSC-Light;font-size: 12px;color: #525252;line-height: 20px;display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 3;overflow: hidden;}
</style>
