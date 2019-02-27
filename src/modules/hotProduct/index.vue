<template>
  <div class="box">
    <Header>
      <span slot="title">热销产品</span>
    </Header>
    <div class="body">
      <div class="top">
        <p class="title">热销产品</p>
        <img src="../../assets/images/hotProduct/1542466238869.jpg" />
        <p class="bottom"><img src="../../assets/images/hotProduct/line.png" /><span>“温暖一冬”产品</span><img src="../../assets/images/hotProduct/line.png" /></p>
      </div>
      <div class="center" @click="money">
        <!--资金-->
        <p>
          <img class="centerImg" src="../../assets/images/hotProduct/icon_zijin.png" /><br/>
          <span class="centerTitle">资金增值</span>
          <span>
            <img class="centerImg" src="../../assets/images/1@2x.png" /><br/>
            <span class="centerTitle">资金增值</span>
          </span>
        </p>
       <!-- 现金-->
        <p>
          <img class="centerImg" src="../../assets/images/hotProduct/icon_xianjin.png"/><br/>
          <span class="centerTitle">现金管理</span>
          <span>
            <img class="centerImg" src="../../assets/images/1@2x.png" /><br/>
            <span class="centerTitle">现金管理</span>
          </span>
        </p>
       <!-- 企业-->
        <p>
          <img class="centerImg" src="../../assets/images/hotProduct/icon_qiye.png" /><br/>
          <span class="centerTitle">企业金融</span>
          <span>
            <img class="centerImg" src="../../assets/images/1@2x.png" /><br/>
            <span class="centerTitle">企业金融</span>
          </span>
        </p>
        <!--跨境服务-->
        <p>
          <img class="centerImg" src="../../assets/images/hotProduct/icon_kuajing.png"/><br/>
          <span class="centerTitle">跨境服务</span>
          <span>
            <img class="centerImg" src="../../assets/images/1@2x.png" /><br/>
            <span class="centerTitle">跨境服务</span>
          </span>
        </p>
      </div>
      <div class="bottom">
        <div>
          <p class="title">热销产品</p>
          <img src="../../assets/images/hotProduct/1542466238869.jpg" />
          <p class="bottom"><img src="../../assets/images/hotProduct/line.png" /><span>“温暖一冬”产品</span><img src="../../assets/images/hotProduct/line.png" /></p>
        </div>
        <div>
          <p class="title">热销产品</p>
          <img src="../../assets/images/hotProduct/1542466238869.jpg" />
          <p class="bottom"><img src="../../assets/images/hotProduct/line.png" /><span>“温暖一冬”产品</span><img src="../../assets/images/hotProduct/line.png" /></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/common/Header'
export default {
  components: {
    Header
  },
  methods: {
    money() {
      this.$router.replace('/money')
    }
  }
}
</script>

<style scoped  lang="less">
  .box{
    width: 100%;
    height: 100%;
    .body{
      padding: 46px 10px 10px 10px;
      background-color: aquamarine;
      .top{
        margin-top: 10px;
        background: #FFFFFF;
        border-radius: 10px;
        width: 100%;
        .title{
          padding: 20px 0 0 12px;
          font-size: 20px;
          color: #2B3133;
          width: 100%;
        }
        img{
          padding: 10px 10px 0 10px;
          width: 335px;
          height: 156px;
        }
        .bottom{
          padding:10px 0  20px 0;
          text-align: center;
          span{
            font-size: 16px;
            color: #2B3133;
          }
          img{
            width: 35px;
            height: 2px;
            vertical-align: middle;
          }
        }
      }
      .center{
        width: 100%;
        height: 252px;
        padding: 30px 0 30px 32px;
        p{
          width: 64px;
          float: left;
          margin-right: 16px;
          margin-bottom: 20px;
          .centerImg{
            width: 64px;
            height: 63px;
            margin-top: 10px;
          }
          .centerTitle{
            font-size: 14px;
            color: #2B3133;
            margin-left: 3px;
          }
        }
      }
      .bottom{
        background: #FFFFFF;
        border-radius: 10px;
        width: 100%;
        .title{
          padding: 20px 0 0 12px;
          font-size: 20px;
          color: #2B3133;
          width: 100%;
        }
        img{
          padding: 10px 10px 0 10px;
          width: 335px;
          height: 156px;
        }
        .bottom{
          padding:10px 0  20px 0;
          text-align: center;
          span{
            font-size: 16px;
            color: #2B3133;
          }
          img{
            width: 35px;
            height: 2px;
            vertical-align: middle;
          }
        }
      }
    }
  }

</style>
