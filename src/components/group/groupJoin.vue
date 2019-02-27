<template>
  <div class="bg-style">
    <Header>
      <span slot="title">申请入组</span>
    </Header>
    <div class="form-box">
      <cube-textarea :placeholder="placeholder" :maxlength="+maxlength" :autofocus="autofocus"
                     v-model="text"></cube-textarea>
    </div><!--申请入群理由-->
    <!--<div class="up-pic" @click="getPic">-->
      <!--<img :src="url" >-->
      <!--&lt;!&ndash;<div class="changeFile" @click="getPic">-->
        <!--<form >-->
          <!--&lt;!&ndash;<input type="file" id="file" @change="getPic">&ndash;&gt;-->
        <!--</form>-->
        <!--<img :src="url"  alt="" class="showPic">-->
      <!--</div>&ndash;&gt;-->
      <!--<p>上传图片</p>-->
    <!--</div>&lt;!&ndash;图片上传&ndash;&gt;-->
    <section class="btn-box">
      <cube-button @click="apply">提交</cube-button>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import {Textarea, Button} from 'cube-ui'
  import {registerWx} from '../../assets/js/util'
  import avatar from '../../assets/images/btn_up.png'
  export default {
    name: 'groupJoin',
    components: {
      Header,
      Textarea,
      Button
    },
    data () {
      return {
        placeholder: '请填写您加入的理由',
        maxlength: 500,
        autofocus: false,
        text: '',
        pic: '',
        url: ''
      }
    },
    activated: function () {
      this.url = avatar
      // 注册微信
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
      apply () {
        let _this = this
        if (this.text == '') {
          _this.$createToast({
            time: 2000,
            txt: '申请理由不可以为空',
            type: 'warn'
          }).show()
          return
        }
        this.groupId = this.$route.query.groupId
        let param = {
          groupId: this.groupId,
          content: this.text,
          photo: this.url
        }
        console.log(param)
        this.$store.dispatch('applyGroup', param).then(function (res) {
          if (res.code == 0) {
            _this.$createToast({
              time: 2000,
              txt: '申请成功！',
              type: 'success'
            }).show()
            _this.$router.back()
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
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.uploadImage({
              localId: localIds.pop(), // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                var serverId = res.serverId // 返回图片的服务器端ID
                let param = {
                  sevrid: serverId
                }
                _this.$store.dispatch('wxUpload', param).then((res) => {
                  _this.url = window.wtEnv.imageUrl + res.data
                 // alert(_this.bgSrc)
                  // 提交只服务器
                  let param = {
                    url: res.data
                  }
                  _this.$store.dispatch('addShareUserImage', param).then((res) => {
                    if (res.code != 0) {
                      _this.$createToast({
                        time: 2000,
                        txt: '添加失败',
                        type: 'error'
                      }).show()
                    }
                  })
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
  .form-box {
    padding: 10px;
    background: #fff;
  }

  .bg-style {
    background: rgb(238, 238, 238);
    padding-top: 44px;
    min-height: 667px;
  }

  .up-pic {
    width: 80px;
    margin-left: 11px;
    margin-top: 22px;
    text-align: center;
    position: relative;
  }

  .up-pic img {
    width: 80px;
    height: 80px;
  }

  .up-pic p {
    font-size: 13px;
    color: #999999;
    margin-top: 10px;
  }

  .btn-box {
    padding: 20px 10px;
  }

  .changeFile {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: 80px;
  }

  .changeFile form {
    width: 100%;
    height: 100%;
  }

  .changeFile form input[type='file'] {
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .showPic {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: 80px;
    z-index: -1;
  }
</style>
