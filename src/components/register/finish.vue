<template>
  <div id="Finish">
    <section class="finish-show">
      <img src="../../assets/images/icon_complete@2x.png" alt="">
      <p>恭喜您，已完成注册</p>
    </section>

    <section class="finish-btn">
      <p>为增大审核通过率，请尽快完成个人资料</p>
      <div class="login-action">
        <!-- <cube-button style="margin-bottom: 20px" @click="goPerfect">去完善资料</cube-button> -->
        <cube-button :outline="true" @click="goLogin">返回</cube-button>
      </div>
    </section>

  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import { Button } from 'cube-ui'
  export default {
    name: 'Finish',
    components: {
      Header,
      Button
    },
    data () {
      return {
        pageNum: 0,
        keyword: ''
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
      goLogin: function () {
        this.$router.push('/login')
      }
    },
    /**
     * 计算属性
     */
    computed: {
    }
  }
</script>

<style scoped>
  .login-action {padding: 43px 25px;}
  .finish-show {text-align: center;padding: 50px 0;background: #f7f7f7;}
  .finish-show img{width: 86px;}
  .finish-show p {margin-top: 27px;font-size: 16px;font-weight: bold}
  .finish-btn{text-align: center;padding-top: 40px;}
  .finish-btn{font-size: 15px;color: #226cb6;}
</style>
