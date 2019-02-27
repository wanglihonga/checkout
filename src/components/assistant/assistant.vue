<template>
  <div id="assistant">
    <Header :showBack="true">
      <span slot="title">顾问详情</span>
    </Header>
    <section class="as-content">
      <div class="inner-box">
        <div class="header-box">
          <img :src="detail.photo" alt="">
          <p class="name">{{detail.name}}</p>
        </div>
        <div class="txt-box">
          <p v-html="detail.detail"></p>
          <div class="tel">联系电话：{{detail.mobile}}</div>
        </div>
      </div>
    </section>


  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  export default {
    name: 'assistant',
    components: {
      Header
    },
    data () {
      return {
        detail: {}
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
      this.detail = this.$route.query.detail
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
  #assistant {padding-top: 45px;background: #f8f8f8;height: 100%;position: absolute;}
  .as-content {padding: 15px;}
  .inner-box {background: #fff;border-radius: 8px;padding: 10px;}
  .header-box {text-align: center;padding: 10px 0;}
  .header-box img {width: 80px;height: 80px;border-radius: 80px;border: 1px solid #eee}
  .header-box .name {font-size: 16px;color: #333;padding: 4px 0;}
  .txt-box {font-size: 14px;color: #666;margin-top: 20px;line-height: 20px;}
  .txt-box .tel {padding-top: 10px;font-size: 14px;color: #0093d9;}
</style>
