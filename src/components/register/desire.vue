<template>
  <div id="Desire">
    <section class="step">
      <img src="../../assets/images/step-2.png" alt="第一步">
    </section>
    <h4 class="step-title">加入VUCA的愿望</h4>
    <section class="desire">
      <ul>
        <li v-for="(item, index) in desireList">
          <div><img src="../../assets/images/icon_wish@2x.png" alt=""></div>
          <section class="form-style">
            <div class="remove" v-if="index != 0"><i class="cubeic-wrong" @click="removeDesire(index)"></i></div>
            <textarea placeholder="请输入您的愿望" ref="desire" v-model="desireList[index].text"></textarea>
          </section>
        </li>
      </ul>
      <div class="add" @click="addDesire">
        <i></i> <span>添加下一个愿望</span>
      </div>
    </section>

    <section class="login-action">
      <cube-button @click="submit">提交</cube-button>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import { Button } from 'cube-ui'
  export default {
    name: 'Desire',
    components: {
      Header,
      Button
    },
    data () {
      return {
        type: 1, // 用户注册类型
        desireList: [{text: ''}]
      }
    },
    methods: {
      // 添加愿望
      addDesire: function () {
        if (this.desireList.length < 3) {
          this.desireList.push({text: ''})
        } else {
          this.$createToast({
            time: 1000,
            txt: '登录信息错误'
          }).show()
        }
      },
      removeDesire: function (index) {
        this.desireList.splice(index, 1)
      },
      submit: function () {
        let _this = this
        let desire = ''
        // 提出输入内容
        for (let item in this.desireList) {
          desire += ',' + this.desireList[item].text
        }
        desire = desire.slice(1)
        let param = {
          userUuid: localStorage.userUuid,
          type: this.type,
          wish: desire
        }
        this.$store.dispatch('registerSecond', param).then(function (res) {
          if (res.code == 0) {
            localStorage.token = res.data.token
            _this.$router.replace('/finish')
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
  .step{padding: 22px 0;text-align: center}
  .step img {width: 95px;}
  .step-title {text-align: center;font-size: 17px;padding: 22px 0;font-weight: bold;}
  .login-action {padding: 0 25px;}
  .desire{text-align: center;padding: 0 10px;min-height: 380px;}
  .desire li{margin-bottom: 20px;position: relative}
  .desire img{width: 20px;}
  .form-style{width: 100%;height: 70px;background: #f2f2f2;border-radius: 6px;padding: 8px;margin-top: 10px;position: relative}
  .form-style textarea{text-align: left;font-size: 14px;width: 100%;}
  .add{text-align: center;margin-top: 35px;font-size: 14px;color: #dcdcdc;margin-bottom: 30px;}
  .add i{display: inline-block;width: 20px;height: 20px;background: url("../../assets/images/icon_add@2x.png")center no-repeat;background-size: cover;vertical-align: middle;}
  .remove{position: absolute;top:-8px;right: 0;width: 16px;height: 16px;font-size: 16px;}
</style>
