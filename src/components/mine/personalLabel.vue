<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">添加标签</span>
    </Header>
    <div class="label-list">
      <ul>
        <li v-for="(item, index) in labelList" :key="index">
          <span class="label-span">{{item}}<img src="../../assets/images/icon_close.png" @click="deleteLabel(index)"></span>
        </li>

        <div style="clear: both"></div>
      </ul>
    </div><!--标签清单-->
    <div class="btn-add" @click="showDilog">
      <span>+ 添加标签</span>
    </div>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  export default {
    name: 'personalLabel',
    components: {
      Header
    },
    data () {
      return {
        label: '',
        labelList: []
      }
    },
    /**
     * 生命周期函数--在实例创建完成后被立即调用
     */
    created: function () {
      this.initData()
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
      // 初始化数据
      initData: function () {
        let _this = this
        this.$store.dispatch('lable', {}).then(function (res) {
          if (res.code == 0) {
            _this.labelList = res.data.split(',')
          }
        })
      },
      // 显示添加框
      showDilog: function () {
        // 弹出输入框
        this.$createDialog({
          type: 'confirm',
          icon: 'cubeic-alert',
          title: '添加标签',
          content: '我是内容',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            let _this = this
            // 限制字符 10个字符
            let lableValue = document.getElementsByClassName('my-title-input')[0].value
            if (lableValue.length > 10) {
              _this.$createToast({
                time: 2000,
                txt: '不能超过10个字符',
                type: 'warn'
              }).show()
              return
            }
            // 获取新增标签内容
            this.labelList.push(lableValue)
            // 增加标签
            this.$store.dispatch('addLable', {lable: this.labelList.join(',')}).then(function (res) {
              if (res.code == 0) {
              } else {
                _this.$createToast({
                  time: 2000,
                  txt: res.msg,
                  type: 'warn'
                }).show()
              }
            })
          }
        }, (createElement) => {
          return [
            createElement('div', {
              'class': {
                'my-input': true
              },
              slot: 'content'
            }, [
              createElement('input', {
                'class': {
                  'my-title-input': true
                }
              })
            ])
          ]
        }).show()
        // 清空输入框
        document.getElementsByClassName('my-title-input')[0].value = ''
      },
      // 删除标签
      deleteLabel: function (index) {
        let _this = this
        this.labelList = this.labelList.slice(0, Number(index)).concat(this.labelList.slice(Number(index) + 1, this.labelList.length))
        // 删除标签 ! 接口和增加标签一致
        this.$store.dispatch('addLable', {lable: this.labelList.join(',')}).then(function (res) {
          if (res.code == 0) {
          } else {
            _this.$createToast({
              time: 2000,
              txt: res.msg,
              type: 'warn'
            }).show()
          }
        })
      }
    }
  }
</script>

<style scoped>
  .bg-style{background: rgb(238,238,238);padding-top: 44px;min-height: 667px;}
  .label-list{width: 375px;min-height:80px;background: white;line-height: 40px;padding-top: 19px;padding-bottom: 22px;}
  .label-list ul li{float: left;}
  .label-span{font-size: 14px;color: #333333;height: 30px;border-radius: 20px;position: relative;display: inline-block;
    background:rgb(238,238,238);padding-left: 13px;padding-right: 13px;line-height: 30px;margin-left: 15px;}
  .label-list ul li img{width: 16px;height: 16px;position: absolute;margin-right: -2px;margin-top: -4px;}
  .btn-add{width:351px;height:40px;border-radius:5px;color:white;font-size: 17px;text-align: center;line-height: 40px;
    bottom: 5px;z-index:10;background:url("../../assets/images/btn_next@2x.png")center;margin-left: 12px;}
</style>
