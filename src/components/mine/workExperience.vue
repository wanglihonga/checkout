<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">工作经历</span>
      <span slot="action" @click="showEdit">{{editTxt}}</span>
    </Header>
    <div>
      <ul>
        <li class="work-list" v-for="(item, index) in workList" :key="index" :class="{'active': item.isSelect}">
          <p class="work-company">{{item.companyName}}</p>
          <div class="work-information">
            <p>职位：{{item.position}}</p>
            <p>起止时间：{{item.startTime}} 至 {{item.endTime}}</p>
          </div>
          <i class="choice" v-show="editFlag" @click="changeSelect(item)"></i>
        </li>
      </ul>
      <None v-if="noneFlag"><p slot="txt">您还没有添加教育经历~</p></None>
    </div><!--工作经历详细信息-->

    <div class="btn-add" @click="addWork" v-if="!editFlag">
      <span>+ 添加工作经历</span>
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
    name: 'workExperience',
    components: {
      Header,
      None
    },
    data () {
      return {
        workList: [],
        noneFlag: false, // 缺省页面标识
        editFlag: false, // 编辑激活标识
        editTxt: '编辑',
        selectArr: [] // 需要删除的列表id
      }
    },
    /**
     * 生命周期函数--keep-alive 组件激活时调用
     */
    activated: function () {
      // alert(1)
      let _this = this
      this.$store.dispatch('work', {}).then(function (res) {
        console.log(res)
        if (res.code == 0) {
          _this.workList = res.data
          console.log(_this.workList)
          if (_this.workList.length < 1) {
            _this.noneFlag = true
          } else {
            _this.noneFlag = false
          }
        }
      })
    },
    /**
     * 组件内方法
     */
    methods: {
      // 添加教育经历
      addWork: function () {
        this.$router.push('/addWork')
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
        for (var index in this.workList) {
          if (this.workList[index].isSelect) {
            this.selectArr.push(this.workList[index].workId)
          }
        }
        console.log(this.selectArr)
        // 提交删除数据
        this.$store.dispatch('deleteWork', {workid: this.selectArr.join(',')}).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            _this.$createToast({
              time: 2000,
              txt: '已删除',
              type: 'correct'
            }).show()
            // 更新本地数据
            _this.$store.dispatch('work', {}).then(function (res) {
              if (res.code == 0) {
                _this.workList = res.data
                if (_this.workList.length < 1) {
                  _this.noneFlag = true
                } else {
                  _this.noneFlag = false
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
  .work-list{width: 351px;background: white;margin-left: 12px;margin-top: 10px;padding-top: 16px;border-radius: 5px;padding-bottom: 16px;position: relative}
  .work-company{font-size: 16px;color: #262831;margin-left: 12px;margin-bottom: 20px;}
  .work-information{margin-left: 12px;font-size: 14px;color: #64656a;}
  .work-information p {margin-bottom: 6px;}
  .btn-add{width:351px;height:40px;border-radius:5px;color:white;font-size: 17px;text-align: center;line-height: 40px;position: fixed;
    bottom: 5px;z-index:10;background:url("../../assets/images/btn_next@2x.png")center;margin-left: 12px;}
  .choice{position: absolute;top:10px;right: 10px;width: 24px;height: 24px;background: url("../../assets/images/icon_select_pre.png")center no-repeat;background-size: 24px;}
  .active .choice{background: url("../../assets/images/icon_select_nor.png")center no-repeat;background-size: 24px;}
</style>
