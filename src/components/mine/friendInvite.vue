<template>
  <div class="bg-style">
    <Header>
      <span slot="title">好友邀请</span>
    </Header>
    <div class="bg-pic" :style="{background: 'url(' + bgSrc + ') no-repeat center'}">
      <div class="add">
        <img src="../../assets/images/upload-bg.png" alt="" @click="uploadBg">
      </div>
      <div class="bottom-txt">
        <p class="bg-word">怀揣梦想，共创价值</p>
        <p class="bg-letter">共创式重构你的商业思维</p>
      </div>
      <div class="cord">
        <img src="../../assets/images/qrcode.jpg" alt="" class="codeImg">
        <div class="txt">
          <p class="userinvite"><span>{{name}}</span>邀请您加入VUCA</p>
          <p class="titxt">长按识别图中二维码</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '../common/Header.vue'
  import {registerWx} from '../../assets/js/util'

  export default {
    name: 'friendInvite',
    components: {
      Header
    },
    data () {
      return {
        bgSrc: require('../../assets/images/-bg.png'),
        name: ''
      }
    },
    activated () {
      this.name = this.$route.query.name
      // 注册微信
      let params = {
        // url: encodeURIComponent(window.location.href.split('#')[0])
        url: window.location.href.split('#')[0]
      }
      let _this = this
      console.log(window.location.href)
      this.$store.dispatch('wxConfig', params).then(function (res) {
        if (res.code == 0) {
          registerWx(res.data)
          setTimeout(() => {
            // 获取背景
            _this.$store.dispatch('findShareUserImage', {}).then((res2) => {
              if (res.data != '') {
                _this.bgSrc = window.wtEnv.imageUrl + res2.data
                // 分享给朋友注册
                wx.onMenuShareTimeline({
                  title: '怀揣梦想，共创价值', // 分享标题
                  link: window.wtEnv.shareUrl + 'share?bgSrc=' + _this.bgSrc + '&name=' + _this.name, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: _this.bgSrc, // 分享图标
                  success: function () {
                    // 用户点击了分享后执行的回调函数
                  }
                })
                // 分享到朋友圈
                wx.onMenuShareAppMessage({
                  title: '怀揣梦想，共创价值', // 分享标题
                  desc: '共创式重构你的商业思维', // 分享描述
                  link: window.wtEnv.shareUrl + 'share?bgSrc=' + _this.bgSrc + '&name=' + _this.name,
                  imgUrl: _this.bgSrc, // 分享图标
                  type: '', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
                  }
                })
              }
            })
          }, 300)
        }
      })
    },
    methods: {
      uploadBg () {
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
                  _this.bgSrc = window.wtEnv.imageUrl + res.data
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
  .bg-style {
    background: rgb(238, 238, 238);
    padding-top: 44px;
    min-height: 667px;
  }

  .bg-pic {
    width: 353px;
    height: 411px;
    margin-left: 11px;
    background-color: rgb(17, 54, 91);
    position: relative;
    color: white;
    margin-top: 10px;
    position: relative
  }

  .loge {
    width: 215px;
    height: 200px;
    margin-left: 70px;
    margin-top: 45px;
  }

  .pic {
    width: 137px;
    height: 137px;
    z-index: 10;
    top: 66px;
    left: 108px;
    position: absolute;
    border-radius: 50%;
  }

  .bg-word {
    font-size: 21px;
    margin-top: 43px;
    margin-bottom: 13px;
    text-align: center;
  }

  .bg-letter {
    font-size: 17px;
    text-align: center;
  }

  .cord {
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    position: absolute;
    bottom: -55px;
    box-shadow: 0px 0px 10px 0px #dbdbdb;
    background: #fff;
    width: 72%;
    margin-left: -36%;
    left: 50%;
    display: flex;
    z-index: 101
  }

  .cord .codeImg {
    display: inline-block;
    width: 60px;
    height: 60px;
    border: 1px solid #eee;
  }

  .cord .txt {
    box-sizing: border-box;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: inline;
    flex: 1;
  }

  .cord .txt .userinvite {
    line-height: 20px;
    font-size: 14px;
    color: #01074e;
  }

  .cord .txt .titxt {
    font-size: 12px;
    padding-top: 10px;
    box-sizing: border-box;
    color: #ccc;
  }

  .bg-pic {
    background-size: cover !important;
  }

  .bottom-txt {
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 100%;
    z-index: 103;
  }

  .add {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    text-align: center
  }

  .add img {
    width: 140px;
    margin-top: 100px;
  }
</style>
