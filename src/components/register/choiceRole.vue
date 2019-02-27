<template>
  <div id="Role">
    <section class="step">
      <img src="../../assets/images/step-1.png" alt="第一步">
    </section>
    <h4 class="step-title">选择您的身份</h4>
    <section class="role-select">
      <ul>
        <li @click="changeType(1)">
          <img src="../../assets/images/vip_nor.png" alt="" v-show="memberFlag">
          <img src="../../assets/images/vip_pre.png" alt="" v-show="!memberFlag">
          <p>会员</p>
        </li>
        <li @click="changeType(2)">
          <img src="../../assets/images/teacher_nor.png" alt="" v-show="teacherFlag">
          <img src="../../assets/images/teacher_pre.png" alt="" v-show="!teacherFlag">
          <p>导师</p>
        </li>
      </ul>
    </section>

    <section class="login-action">
      <cube-button @click.native="nextReg">下一步</cube-button>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import { Button } from 'cube-ui'
  export default {
    name: 'Role',
    components: {
      Header,
      Button
    },
    data () {
      return {
        memberFlag: true,
        teacherFlag: false,
        type: 1
      }
    },
    methods: {
      goLogin: function () {
        this.$router.push('/login')
      },
      // 更换注册类型
      changeType: function (type) {
        this.type = type
        if (type == 1) {
          this.memberFlag = true
          this.teacherFlag = false
        }
        if (type == 2) {
          this.teacherFlag = true
          this.memberFlag = false
        }
      },
      // 下一步将选择的类型带过去
      nextReg: function () {
        this.$router.push({'path': '/desire', query: {type: this.type}})
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
  .step{padding: 22px 0;text-align: center}
  .step img {width: 95px;}
  .step-title {text-align: center;font-size: 17px;padding: 22px 0;font-weight: bold;}
  .role-select ul{overflow: hidden;margin-top: 50px;margin-bottom: 65px;}
  .role-select ul li{text-align: center;float: left;width: 50%;font-size: 18px;}
  .role-select ul li img{width: 116px;height: 116px;margin-bottom: 30px}
  .login-action {padding: 0 25px;}
</style>
