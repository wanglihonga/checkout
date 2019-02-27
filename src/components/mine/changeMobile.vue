<template>
  <div id="Register">
    <Header :showBack="true">
      <span slot="title">修改手机号</span>
    </Header>

    <ul class="login-area">
      <li class="border-bottom-1px">
        <div>新手机号码</div>
        <div>
          <input type="text" placeholder="+86" v-model="mobile" style="width: 60%;">
          <button class="send-sms" type="button" @click="sendSms">发送验证码</button>
        </div>
      </li>
      <li class="border-bottom-1px">
        <div>验证码</div>
        <div><input type="text" placeholder="请输入您的验证码" v-model="code"></div>
      </li>
    </ul>
    <section class="login-action">
      <cube-button @click.native="nextReg">完成</cube-button>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import { Button } from 'cube-ui'
  import { regMobile } from '../../assets/js/util'
  export default {
    name: 'changeMobile',
    components: {
      Header,
      Button
    },
    data () {
      return {
        mobile: '',
        code: ''
      }
    },
    methods: {
      goLogin: function () {
        this.$router.push('personalInformation')
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
        if (this.mobile == this.$route.query.mobile) {
          this.$createToast({
            txt: '新号码不能为当前号码',
            time: 1000,
            type: 'warn'
          }).show()
        } else {
          let parma = {
            mobile: this.mobile,
            useType: 4
          }
          let _this = this
          this.$store.dispatch('sendSms', parma).then(function (res) {
            console.log(res.msg)
            if (res.code == 0) {
              _this.$createToast({
                txt: '发送成功',
                time: 500,
                type: 'warn'
              }).show()
            }
          })
        }
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
        let param = {
          mobile: this.mobile,
          code: this.code
        }
        this.$store.dispatch('editMobile', param).then(function (res) {
          if (res.code == 0) {
            _this.$router.back()
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
  #Register {padding-top: 45px;}
  .logo {margin: 35px 0;text-align: center;}
  .logo img {width: 125px;}
  .login-area {padding: 0 25px;}
  .login-area input {width: 100%;}
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
