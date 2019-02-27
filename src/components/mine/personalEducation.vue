<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">教育背景</span>
      <span slot="action" @click="showEdit">{{editTxt}}</span>
    </Header>
    <div>
      <ul style="padding-bottom: 60px;">
        <li class="education-list" v-for="(item, index) in educationList" :key="index" :class="{'active': item.isSelect}">
          <p class="education-school">{{item.school}}</p>
          <div class="education-information">
            <p>专业：{{item.major}}</p>
            <p>学历/学位：{{item.degree}}</p>
            <p>起止时间：{{item.start_time|formatDate}} 至 {{item.end_time|formatDate}}</p>
          </div>
          <i class="choice" v-show="editFlag" @click="changeSelect(item)"></i>
        </li>
      </ul>
      <None v-if="noneFlag"><p slot="txt">您还没有添加教育经历~</p></None>
    </div><!--教育背景详细信息-->
    <div class="btn-add" @click="addEducation" v-if="!editFlag">
      <span>+ 添加学历</span>
    </div>
    <div class="btn-add" @click="deleteSave" v-if="editFlag">
      <span>删除</span>
    </div>
  </div>
</template>

<script>
    import Header from '../common/Header.vue'
    import None from '../common/None.vue'
    export default {
      name: 'personalEducation',
      components: {
        Header,
        None
      },
      data () {
        return {
          educationList: [],
          noneFlag: false, // 缺省页面标识
          editFlag: false, // 编辑激活标识
          editTxt: '编辑',
          selectArr: [] // 需要删除的列表id
        }
      },
      filters: {
        formatDate (time) {
          if (time === '') {
            return ''
          } else {
            var date = new Date(time)
            var fmt = ''
            if (/(y+)/.test('yyyy-MM-dd')) {
              fmt = 'yyyy-MM-dd'.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            let o = {
              'M+': date.getMonth() + 1,
              'd+': date.getDate(),
              'h+': date.getHours(),
              'm+': date.getMinutes(),
              's+': date.getSeconds()
            }
            for (let k in o) {
              if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
              }
            }
            return fmt
          }
        }
      },
      /**
       * 生命周期函数--在实例创建完成后被立即调用
       */
      created: function () {
      },
      /**
       * 生命周期函数--keep-alive 组件激活时调用
       */
      activated: function () {
        let _this = this
        this.$store.dispatch('education', {}).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            _this.educationList = res.data
          }
        })
      },
      /**
       * 组件内方法
       */
      methods: {
        // 添加教育经历
        addEducation: function () {
          this.$router.push('/addEducation')
        },
        // 显示隐藏选择框
        showEdit: function () {
          if (this.editTxt == '编辑') {
            this.editTxt = '取消'
            this.editFlag = true
          } else {
            this.editTxt = '编辑'
            this.editFlag = false
          }
        },
        // 选择操作
        changeSelect: function (item) {
          this.$set(item, 'isSelect', !item.isSelect)
        },
        // 删除
        deleteSave: function () {
          let _this = this
          // 置空数据
          this.selectArr = []
          // 遍历数据
          for (var index in this.educationList) {
            if (this.educationList[index].isSelect) {
              this.selectArr.push(this.educationList[index].id)
            }
          }
          console.log(this.selectArr)
          // 提交删除数据
          this.$store.dispatch('deleteEducation', {ID: this.selectArr.join(',')}).then(function (res) {
            if (res.code == 0) {
              _this.$createToast({
                time: 2000,
                txt: '已删除',
                type: 'correct'
              }).show()
              // 更新本地数据
              _this.$store.dispatch('education', {}).then(function (res) {
                if (res.code == 0) {
                  _this.educationList = res.data
                  if (_this.educationList.length < 1) {
                    _this.noneFlag = true
                    _this.editTxt = '编辑'
                    _this.editFlag = false
                  }
                }
              })
            } else {
              _this.$createToast({
                time: 2000,
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
  .bg-style{background: rgb(238,238,238);padding-top: 44px;min-height: 667px;}
  .education-list{width: 351px;background: white;margin-left: 12px;margin-top: 10px;padding-top: 16px;border-radius: 5px;padding-bottom: 20px;position: relative;}
  .education-school{font-size: 16px;color: #262831;margin-left: 12px;margin-bottom: 20px;}
  .education-information{margin-left: 12px;font-size: 14px;color: #64656a;}
  .education-information p {margin-bottom: 6px;}
  .btn-add{width:351px;height:40px;border-radius:5px;color:white;font-size: 17px;text-align: center;line-height: 40px;position: fixed;
           bottom: 5px;z-index:10;background:url("../../assets/images/btn_next@2x.png")center;margin-left: 12px;}
  .choice{position: absolute;top:10px;right: 10px;width: 24px;height: 24px;background: url("../../assets/images/icon_select_pre.png")center no-repeat;background-size: 24px;}
  .active .choice{background: url("../../assets/images/icon_select_nor.png")center no-repeat;background-size: 24px;}
</style>
