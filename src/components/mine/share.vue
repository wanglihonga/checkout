<template>
  <div class="bg-style">
    <section class="header-box">VUCA私董无界</section>
    <div class="bg-pic" :style="{background: 'url(' + bgSrc + ') no-repeat center'}">
      <!--<div class="add">-->
        <!--<img src="../../assets/images/upload-bg.png" alt="" @click="uploadBg">-->
      <!--</div>-->
      <div class="bottom-txt">
        <p class="bg-word">怀揣梦想，共创价值</p>
        <p class="bg-letter">共创式重构你的商业思维</p>
      </div>
      <div class="cord">
        <img src="../../assets/images/qrcode.jpg" alt="" class="codeImg">
        <div class="txt">
          <p class="userinvite"><span>{{name}}</span>邀请您加入VUCA</p>
          <p class="titxt">长按识别图中二维码</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '../common/Header.vue'
  export default {
    name: 'friendInvite',
    components: {
      Header
    },
    data () {
      return {
        bgSrc: require('../../assets/images/-bg.png'),
        name: ''
      }
    },
    activated () {
      this.bgSrc = this.$route.query.bgSrc
      this.name = this.$route.query.name
    },
    methods: {
    }
  }
</script>

<style scoped>
  .bg-style{background: rgb(238,238,238);min-height: 667px;}
  .bg-pic{width: 353px;height: 411px;margin-left: 11px;background-color: rgb(17,54,91);position: relative;color:white;margin-top: 10px;position: relative}
  .loge{width: 215px;height: 200px;margin-left: 70px;margin-top: 45px;}
  .pic{width: 137px;height: 137px;z-index: 10;top:66px;left:108px;position: absolute;border-radius: 50%;}
  .bg-word{font-size: 21px;margin-top: 43px;margin-bottom: 13px;text-align: center;}
  .bg-letter{font-size:17px;text-align: center;}
  .cord{border-radius: 5px;box-sizing: border-box;padding: 10px;position: absolute;bottom: -55px;box-shadow: 0px 0px 10px 0px #dbdbdb;background: #fff; width: 72%; margin-left: -36%; left: 50%;display: flex;z-index: 101}
  .cord .codeImg {
    display: inline-block;
    width: 60px;
    height: 60px;
    border: 1px solid #eee;
  }
  .cord .txt {
    box-sizing: border-box;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: inline;
    flex: 1;
  }
  .cord .txt .userinvite {
    line-height: 20px;
    font-size: 14px;
    color: #01074e;
  }
  .cord .txt .titxt {
    font-size: 12px;
    padding-top: 10px;
    box-sizing: border-box;
    color: #ccc;
  }
  .bg-pic {
    background-size: cover!important;
  }
  .bottom-txt {
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 100%;
    z-index: 103;
  }
  .header-box {width: 100%;height: 45px;line-height:45px;background: #fff;text-align: center;font-size: 16px;}
</style>
