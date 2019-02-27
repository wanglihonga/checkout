<template>
  <div id="Register">
    <div id="Header" class="border-bottom-1px">
      <ul>
        <li>
          <slot name="title">注册</slot>
        </li>
      </ul>
    </div>
    <ul class="login-area">
      <li class="border-bottom-1px">
        <div>手机号码</div>
        <div>
          <input type="text" placeholder="+86" v-model="mobile" style="width: 60%;">
          <button class="send-sms" type="button" @click="sendSms">发送验证码</button>
        </div>
      </li>
      <li class="border-bottom-1px">
        <div>验证码</div>
        <div><input type="text" placeholder="请输入您的验证码" v-model="code"></div>
      </li>
      <li class="border-bottom-1px">
        <div>密码</div>
        <div><input type="password" placeholder="请输入不少于6位的密码" v-model="password"></div>
      </li>
      <li class="border-bottom-1px">
        <div>确认密码</div>
        <div><input type="password" placeholder="请再次输入您的密码" v-model="password"></div>
      </li>
    </ul>
    <section class="login-action">
      <cube-button @click.native="nextReg">注册</cube-button>
      <p class="has-account" @click="goLogin">注册即表示您同意<span>《用户协议》</span></p>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import {Button} from 'cube-ui'
  import {regMobile} from '../../assets/js/util'

  export default {
    name: 'registerOther',
    components: {
      Header,
      Button
    },
    data () {
      return {
        mobile: '',
        code: '',
        password: ''
      }
    },
    methods: {
      goLogin: function () {
        this.$router.push('/login')
      },
      // 发送验证码
      sendSms: function () {
        if (!regMobile(this.mobile)) {
          this.$createToast({
            time: 2000,
            txt: '手机号格式不正确',
            type: 'warn'
          }).show()
        }
        let _this = this
        // 短信接口获取
        var param = {
          mobile: _this.mobile,
          useType: 1
        }
        this.$store.dispatch('sendSms', param).then(function (res) {
          console.log(res)
          if (res.code == 1) {
            this.$createToast({
              time: 2000,
              txt: res.msg,
              type: 'warn'
            }).show()
            return
          }
          if (res.code == 0) {
            this.$createToast({
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
          _this.codeTxt = this.countdown + 's'
          _this.countdown--
        }
        setTimeout(function () {
          _this.countDown()
        }, 1000)
      },
      nextReg: function () {
        let _this = this
        // 非空校验
        if (!this.mobile) {
          this.$createToast({
            time: 2000,
            txt: '手机号不能为空',
            type: 'warn'
          }).show()
          return
        }
        if (!this.code) {
          this.$createToast({
            time: 2000,
            txt: '验证码不能为空',
            type: 'warn'
          }).show()
          return
        }
        if (!this.password) {
          this.$createToast({
            time: 2000,
            txt: '密码不能为空',
            type: 'warn'
          }).show()
          return
        }

        // 注册
        let param = {
          mobile: this.mobile,
          code: this.code,
          password: this.password
        }
        this.$store.dispatch('register', param).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            localStorage.userUuid = res.data.userUuid
            _this.$router.push('/finish')
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
    computed: {}
  }
</script>

<style scoped>
  #Register {
    padding-top: 45px;
  }
  .login-area {
    padding: 0 25px;
  }
  .login-area input {
    width: 100%;
  }
  input::-webkit-input-placeholder {
    color:rgb(188,188,188);
  }
  .login-area li {
    padding: 10px 0;
    overflow: hidden;
    font-size: 16px;
    margin-top: 20px;
    position: relative
  }
  .login-area li div:nth-child(1) {
    float: left;
    width: 25%;
  }
  .login-area li div:nth-child(2) {
    float: left;
    width: 75%;
  }
  .login-action {
    margin-top: 40px;
    padding: 0 25px;
  }
  .has-account {
    padding-top: 24px;
    font-size: 14px;
    color:rgb(188,188,188)
  }
  .has-account span{
    color:rgb(0,147,217)
  }

  .send-sms {
    position: absolute;
    bottom: 2px;
    right: 0;
    width: 90px;
    height: 34px;
    font-size: 14px;
    border-radius: 4px;
    background: #f2f2f2;
    color:rgb(0,147,217)
  }
  #Header {position: fixed;width: 100%;height: 45px;top:0;left:0;font-size: 16px;background: #fff;padding: 0 12px;z-index: 99}
  #Header ul li {height: 45px;line-height: 45px;text-align: center;color:rgb(0,147,217)}
</style>
