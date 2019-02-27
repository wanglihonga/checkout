<template>
  <div id="ForgetPassword">
    <Header :showBack="true">
      <span slot="title">忘记密码</span>
    </Header>

    <ul class="login-area">
      <li class="border-bottom-1px">
        <div>手机号码</div>
        <div>
          <input type="text" placeholder="+86" v-model="mobile">
          <button class="send-sms" type="button" @click="sendSms">{{codeTxt}}</button>
        </div>
      </li>
      <li class="border-bottom-1px">
        <div>验证码</div>
        <div><input type="text" placeholder="请输入您的验证码" v-model="code"></div>
      </li>
      <li class="border-bottom-1px">
        <div>新密码</div>
        <div><input type="password" placeholder="请输入您的新密码" v-model="password"></div>
      </li>
    </ul>
    <section class="login-action">
      <cube-button @click.native="forgetPassword">提交</cube-button>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import { Button } from 'cube-ui'
  import {regMobile} from '../../assets/js/util'
  export default {
    name: 'ForgetPassword',
    components: {
      Header,
      Button
    },
    data () {
      return {
        codeTxt: '发送验证码',
        countdown: 60,
        mobile: '',
        code: '',
        password: '',
        isDisabled: true
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
      sendSms: function () {
        if (!regMobile(this.mobile)) {
          this.$createToast({
            time: 2000,
            txt: '手机号格式不正确',
            type: 'warn'
          }).show()
        }
        if (!this.isDisabled) {
          console.log('倒计时中...')
          return
        }
        let _this = this
        _this.countDown()
        // 短信接口获取
        var param = {
          mobile: _this.mobile,
          useType: 2
        }
        this.$store.dispatch('sendSms', param).then(function (res) {
          console.log(res)
          if (res.code == 1) {
            _this.$createToast({
              time: 2000,
              txt: res.msg,
              type: 'warn'
            }).show()
            return
          } else if (res.code == 0) {
            _this.$createToast({
              time: 2000,
              txt: '发送成功',
              type: 'warn'
            }).show()
            _this.countDown()
          }
        })
      },
      countDown: function () {
        let _this = this
        if (_this.countdown == 0) {
          _this.codeTxt = '发送验证码'
          _this.isDisabled = false
          _this.countdown = 60
          return
        } else {
          _this.isDisabled = true
          _this.codeTxt = _this.countdown + 's'
          _this.countdown--
        }
        setTimeout(function () {
          _this.countDown()
        }, 1000)
      },
      forgetPassword: function () {
        let _this = this
        let param = {
          mobile: this.mobile,
          code: this.code,
          password: this.password
        }
        this.$store.dispatch('forgetPassword', param).then(function (res) {
          if (res.code == 0) {
            _this.$createToast({
              time: 2000,
              txt: '修改成功',
              type: 'warn'
            }).show()
            setTimeout(function () {
              _this.$router.push('/login')
            }, 2000)
          } else {
            _this.$createToast({
              time: 2000,
              txt: res.msg,
              type: 'warn'
            }).show()
          }
        })
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
  #ForgetPassword {padding-top: 45px;}
  .logo {margin: 35px 0;text-align: center;}
  .logo img {width: 125px;}
  .login-area {padding: 0 25px;}
  .login-area input {width: 60%;}
  .login-area li {padding: 10px 0;overflow: hidden;font-size: 16px;margin-top: 20px;position: relative}
  .login-area li div:nth-child(1) {float: left;width: 25%;}
  .login-area li div:nth-child(2) {float: left;width: 75%;}
  .login-action {margin-top: 40px;padding: 0 25px;}
  .entrance{overflow: hidden;margin-top: 15px;}
  .entrance li{float: left;width: 50%;font-size: 14px;}
  .entrance li:nth-child(2){text-align: right;}
  .has-account{text-align: center;padding: 24px;font-size: 14px;}
  .send-sms{position: absolute;bottom: 2px;right: 0;width: 90px;height: 34px;font-size: 14px;border-radius: 4px;background: #f2f2f2;}
</style>
