<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">创建小组</span>
    </Header>
    <div class="logo-pic">
      <div class="groupLogo" @click="getPic" :style="{background: 'url(' + bgSrc + ') no-repeat center'}"></div>
      <input style="color: #666;margin-top: 20px;width: 80%;" class="input" type="text" name="name" placeholder="给小组起个响亮的名字" v-model="name">
    </div><!--小组名字-->
    <div class="group-title">
      <span>介绍</span>
    </div>
    <div class="txtbox">
      <cube-textarea :placeholder="placeholder" :maxlength="maxlength" :autofocus="autofocus" v-model="detail"></cube-textarea>
    </div><!--小组介绍-->
    <!--<div class="peoNum">-->
      <!--<p>最大人数<span>{{max}}人 ></span></p>-->
    <!--</div>-->
    <div class="bottom">
      <div class="manage">
        <input type="checkbox" checked id="read">
        <label for='read'>我已阅读《VUCA创建小组管理规定》</label>
      </div>
      <div class="btn-add" @click="submitInformation">
        <span>提交</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import { Textarea } from 'cube-ui'
  import {registerWx} from '../../assets/js/util'
  export default {
    name: 'groupCreate',
    components: {
      Header,
      Textarea
    },
    data () {
      return {
        placeholder: '请填写小组涉及的方向、领域等介绍',
        maxlength: 500,
        autofocus: true,
        name: '',
        detail: '',
        pic: '',
        url: '',
        max: 18,
        headerImage: '',
        bgSrc: require('../../assets/images/default-upload.png')
      }
    },
    activated: function () {
      // 注册微信
      this.bgSrc = require('../../assets/images/default-upload.png')
      let params = {
        // url: encodeURIComponent(window.location.href.split('#')[0])
        url: window.location.href.split('#')[0]
      }
      console.log(window.location.href)
      this.$store.dispatch('wxConfig', params).then(function (res) {
        if (res.code == 0) {
          registerWx(res.data)
        }
      })
    },
    methods: {
      submitInformation () {
        let _this = this
        if (this.name == '') {
          _this.$createToast({
            time: 2000,
            txt: '小组名称不能为空',
            type: 'success'
          }).show()
          return
        }
        if (this.detail == '') {
          _this.$createToast({
            time: 2000,
            txt: '小组介绍不能为空',
            type: 'warn'
          }).show()
          return
        }
        let param = {
          photo: this.url,
          name: this.name,
          detail: this.detail,
          max: 18
        }
        this.$store.dispatch('memberInformation', param).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            _this.$createToast({
              time: 2000,
              txt: '已创建，请耐心等待审核！',
              type: 'warn'
            }).show()
            setTimeout(() => {
              _this.$router.back()
            }, 2000)
          } else {
            _this.$createToast({
              time: 2000,
              txt: res.msg,
              type: 'error'
            }).show()
          }
        })
      },
      getPic () {
        let _this = this
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.uploadImage({
              localId: (localIds.pop()).toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                var serverId = res.serverId // 返回图片的服务器端ID
                let param = {
                  sevrid: serverId
                }
                _this.$store.dispatch('wxUpload', param).then((res) => {
                  _this.headerImage = window.wtEnv.imageUrl + res.data
                  _this.bgSrc = window.wtEnv.imageUrl + res.data
                  _this.url = res.data
                })
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .bg-style{background: rgb(238,238,238);padding-top: 44px;min-height: 667px;}
  .logo-pic{position: relative;width: 375px;text-align: center;background: #fff;padding: 30px 0;}
  .input{font-size: 15px;color: #bfbfbf;text-align: center;border-bottom: 1px solid rgb(238,238,238);padding-bottom: 8px;}
  input::-webkit-input-placeholder{color: #bfbfbf;}
  .group-title{width: 375px;height: 50px;padding-left: 11px;line-height: 50px;font-size: 15px;color: #333333;background: white;margin-top: 10px;}
  .textarea{width: 360px;height: 125px;background: white;resize: none;font-size: 14px;padding-top: 17px;padding-left: 12px;}
  textarea::-webkit-input-placeholder{font-size: 14px;color: #bfbfbf;}
  .manage{font-size: 13px;color: #666666;padding: 0 15px;}
  .manage input{vertical-align: middle}
  .manage label{vertical-align: middle}
  .changeFile {
    text-align: center;
  }
  .peoNum {
    margin-top: 10px;
    line-height: 40px;
    font-size: 15px;
    background: #fff;
    padding-left: 11px;
    padding-right: 11px;
    box-sizing: border-box;
  }
  .peoNum span {
    float: right;
  }
  .bottom {
    margin-top: 40px;
  }
  .txtbox {
    /*height: 180px;*/
    padding-bottom: 10px;
  }
  .cube-textarea-wrapper {
    height: 100%;
  }
  .txtbox cube-textarea {
    height: 100%;
  }
  .showPic {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .changeFile form {
    width: 100%;
    height: 100%;
  }
  .changeFile form input[type="file"] {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .btn-add{width:351px;height:40px;border-radius:5px;color:white;font-size: 17px;text-align: center;line-height: 40px;
    bottom: 5px;z-index:10;background:url("../../assets/images/btn_next@2x.png")center;margin-left: 12px;margin-top: 20px;}
  .groupLogo {width: 100px;height: 100px;border-radius: 120px;background: #faf;margin: 0 auto;border: 1px solid #eee;background-size: cover!important;}
</style>
