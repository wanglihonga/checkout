<template>
  <div id="activitySign">
    <Header :showBack="true">
      <span slot="title">我要报名</span>
    </Header>
    <section class="content">
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  export default {
    name: 'activitySign',
    components: {
      Header
    },
    data () {
      return {
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
    },
    /**
     * 组件内方法
     */
    methods: {
    },
    /**
     * 计算属性
     */
    computed: {
    }
  }
</script>

<style scoped>
  #ActivityDetail {background: #eee;position: absolute;min-height: 100%;width: 100%;}
  .content{padding-top: 45px;}
  .pic-show{width: 100%;height: 200px;}
  .pic-show img{width: 100%;height: 100%;}
  .title{padding: 10px;background: #fff;}
  .title h4{font-size: 16px;font-weight: bold;color: #333;line-height: 1.3}
  .title .txt{overflow: hidden;margin-top: 10px;}
  .title .txt label{float: left;font-size: 12px;color: #999;margin-top: 6px;}
  .title .txt span{float: left;font-size: 18px;color: #c92f1b;margin-left: 5px;}
  .location{background: #fff;padding: 10px;font-size: 14px;color: #666;margin-bottom: 10px;}
  .location>li{overflow: hidden;height: 30px;line-height: 30px;}
  .location>li>div:nth-child(1){float: left;width: 10%;}
  .location>li>div:nth-child(2){float: left;width: 90%;}
  .location>li i{float: left; width: 15px;height: 15px;margin-top: 7px;}
  .time{background: url("../../assets/images/icon_clock.png")center no-repeat;background-size: 20px;}
  .locate{background: url("../../assets/images/icon_dingwei.png")center no-repeat;background-size: 20px;}
  .box-title{padding: 15px 10px;}
  .box-title h4{font-size: 16px;padding-left: 12px;border-left: 3px solid #226cb6;height: 16px;line-height: 16px;}
  .w-bg{background: #fff;margin-bottom: 10px;}
  .content{padding-bottom: 40px;border-bottom:1px solid #ccc;}
  .member {overflow: hidden;padding: 0 10px;padding-left: 0;}
  .member-list li{padding: 10px 0;overflow: hidden;margin-left: 10px;}
  .member div{float: left;}
  .member div:nth-child(1){width: 20%;}
  .member div:nth-child(2){width: 70%;}
  .member div:nth-child(3){width: 10%;height: 56px;}
  .member div img{width: 56px;height: 56px;border-radius: 56px;vertical-align: middle}
  .member div h4{font-size: 16px;color: #333;margin-top: 8px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  .member div .labels{font-size: 14px;color: #999;margin-top: 6px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  .arrow{background: url("../../assets/images/icon_more.png")center no-repeat;background-size: 20px;}
  .profile{font-size: 14px;color: #666;line-height: 1.4;padding: 15px 10px;padding-left: 0;}
  .host{font-size: 14px;color: #666;}
  .detail{padding: 10px;font-size: 14px;}
  .detail img{max-width: 100%;}
  .fix-btn{position: fixed;left:0;bottom: 0;width: 100%;height: 50px;z-index: 100;background-color: #fff;}
  .fix-btn .fix-l{width: 50%; float: left;height: 100%;
    text-align: center;
    line-height: 50px;}
  .fix-btn .fix-r{width: 50%; float: right;height: 100%;}
  .fix-btn button{height: 34px;font-size: 16px;background-color: #fff;line-height:34px;border: 1px solid #ccc;  margin-top: 8px;
    width: 80%}
</style>
