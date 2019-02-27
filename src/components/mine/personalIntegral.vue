<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">积分</span>
    </Header>
    <div class="integral-bg" @click="toPays">
      <p class="integral-title">当前VUCA积分</p>
      <p class="integral-data">{{total}}</p>
    </div> <!--积分最终数据-->
    <div class="integral-nav">
      <img class="pic" src="../../assets/images/icon_xiaofeijilu.png" alt="">
      <span class="integral-word">消费记录</span>
    </div><!--消费记录-->
    <div class="integral-box">
      <ul>
        <li class="integral-list" v-for="(item, index) in integralList" :key="index">
          <div class="list-left">
            <p>{{item.title}}</p>
            <p>{{item.createTime}}</p>
          </div>
          <div class="list-right">
            <p>+{{item.amount}}</p>
          </div>
        </li>
      </ul>
    </div><!--消费明细-->
  </div>
</template>

<script>
    import Header from '../common/Header.vue'
    export default {
      name: 'personalIntegral',
      components: {
        Header
      },
      data () {
        return {
          integralList: [],
          countNum: 0,
          total: 0
        }
      },
      methods: {
        toPays () {
          this.$router.push({path: '/pay'})
        }
      },
      created: function (index) {
        let _this = this
        this.$store.dispatch('balance', {pageNum: 0}).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            _this.integralList = res.data.balanceHistoryPage.list
            for (var index in _this.integralList) {
              _this.total += Number(_this.integralList[index].amount)
            }
          } else {
            _this.$createTaost({
              txt: 'res.msg',
              time: 1500,
              type: 'warn'
            }).show()
          }
        })
      }
    }
</script>

<style scoped>
  .bg-style{background: rgb(238,238,238);padding-top: 44px;min-height: 667px;}
  .integral-bg{width: 375px;height: 140px;background-image: url("../../assets/images/bg_jifen.png");text-align: center;}
  .integral-title{font-size: 14px;color: white;padding: 40px;padding-bottom: 13px;}
  .integral-data{font-size: 30px;color: white;}
  .integral-nav{position: relative;width: 375px;height: 45px;margin-top:10px; background: #fff;padding-left: 13px;}
  .integral-word{display: inline-block;line-height: 45px;font-size: 16px;color: #333333;padding-left: 27px;}
  .integral-list{width: 375px;height: 60px;overflow: hidden;background: white;padding-left: 13px;padding-right: 13px;background: #fff;}
  .list-left{float: left;}
  .list-left p:nth-child(1){font-size: 15px;color: #333333;margin-top: 14px;margin-bottom: 7px;}
  .list-left p:nth-child(2){font-size: 12px;color: #999999;}
  .list-right{float: right;font-size: 18px;color: #333333;line-height: 60px;}
  .integral-box {
    background: #fff;
  }
  .pic {
    display: inline-block;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 13px;
    top: 50%;
    margin-top: -10px;
  }
</style>
