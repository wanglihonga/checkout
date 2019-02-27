<template>
  <div>
    <Header>
      <span slot="title">活动通知</span>
    </Header>
    <div class="box">
      <div class="top">
        <img src="../../assets/images/hotProduct/1542466238869.jpg" />
        <div>
          <p class="title">“一生有我”活动盛大起动</p><br/>
          <p>2019-01-21 至 2019-01-29</p>
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

    }
  }
</script>

<style scoped lang="less">
  .box{
    background: aquamarine;
    width: 100%;
    padding: 50px 12px 0 12px;
    .top{
      background: #FFFFFF;
      border-radius: 10px;
      width: 100%;
      img{
        width: 100%;
        height: 150px;
        border-radius: 10px;
      }
      .title{
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #2B3133;
        text-align: left;
      }
    }
  }
</style>
