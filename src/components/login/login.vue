<template>
  <div id="Login" :showBack="true">
    <Header>
      <span slot="title">登录</span>
    </Header>
    <section class="logo">
      <img src="../../assets/images/logo@2x.png" alt="logo">
    </section>
    <ul class="login-area">
      <li class="border-bottom-1px">
        <div>手机号码</div>
        <div><input type="text" placeholder="+86" v-model="mobile" ></div>
      </li>
      <li class="border-bottom-1px">
        <div>密码</div>
        <div><input type="password" placeholder="请输入您的密码" v-model="password"></div>
      </li>
    </ul>
    <section class="login-action">
      <cube-button @click="doLogin">登录</cube-button>
      <ul class="entrance">
        <li><span @click="goRegister">注册</span></li>
        <li><span @click="goForget">忘记密码</span></li>
      </ul>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import { Button } from 'cube-ui'
  import {regMobile} from '../../assets/js/util'
  export default {
    name: 'Login',
    components: {
      Header,
      Button
    },
    data () {
      return {
        mobile: '',
        password: ''
      }
    },
    activated: function () {
    },
    methods: {
      hidden: function () {
        this.placeholder = ''
      },
      // 跳转至忘记密码页面
      goForget: function () {
        this.$router.push('/forgetPassword')
      },
      // 跳转至注册页面
      goRegister: function () {
        this.$router.push('/register')
      },
      doLogin: function () {
        let _this = this
        // 校验手机号
        if (!regMobile(this.mobile)) {
          _this.$createToast({
            time: 1000,
            txt: '请输入正确的手机号',
            type: 'error'
          }).show()
          return
        }
        // 校验密码
        if (this.password.length < 6) {
          _this.$createToast({
            time: 1000,
            txt: '密码不能小于6位',
            type: 'error'
          }).show()
          return
        }

        let prama = {
          mobile: this.mobile,
          password: this.password
        }
        this.$store.dispatch('login', prama).then(function (res) {
          if (res.code == 0) {
            localStorage.token = res.data.token
            localStorage.userUuid = res.data.userUuid
            // localStorage.userDetail = JSON.stringify(res.data)
            // 登录后返回原页面(在本地local里存储了来源页面，需要在来源页面配置)
            _this.$router.replace(localStorage.router)
          } else {
            _this.$createToast({
              time: 1000,
              txt: res.msg,
              type: 'error'
            }).show()
          }
        })
      }
    }
  }
</script>

<style scoped>
  #Login {padding-top: 45px;}
  .logo {margin: 35px 0;text-align: center;}
  .logo img {width: 125px;}
  .login-area {padding: 0 25px;}
  .login-area input {width: 100%;}
  .login-area li {padding: 10px 0;overflow: hidden;font-size: 16px;margin-top: 20px;}
  .login-area li div:nth-child(1) {float: left;width: 25%;}
  .login-area li div:nth-child(2) {float: left;width: 75%;}
  .login-action {margin-top: 40px;padding: 0 25px;}
  .entrance{overflow: hidden;margin-top: 15px;padding: 2px 0}
  .entrance li{float: left;width: 50%;font-size: 14px;height: 16px;line-height: 16px;}
  .entrance li:nth-child(2){text-align: right;}
</style>
