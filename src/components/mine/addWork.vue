<template>
  <div id="AddEdu">
    <Header :showBack="true">
      <span slot="title">添加工作经历</span>
    </Header>
    <ul class="edu-box">
      <li>
        <h4>公司名称</h4>
        <cube-input v-model="companyName" placeholder="请输入公司名字" autocomplete clearable></cube-input>
      </li>
      <li>
        <h4>职位</h4>
        <cube-input v-model="position" placeholder="请输入职位" autocomplete clearable></cube-input>
      </li>
      <li>
        <h4>开始时间</h4>
        <cube-input v-model="startTime" placeholder="请选择开始时间" readonly @click.native="showStart"></cube-input>
      </li>
      <li>
        <h4>结束时间</h4>
        <cube-input v-model="endTime" placeholder="请选择结束时间" readonly @click.native="showEnd"></cube-input>
      </li>
    </ul>
    <section class="btn">
      <cube-button @click="addEducation">保存</cube-button>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import { Button, Input } from 'cube-ui'
  export default {
    name: 'AddEdu',
    components: {
      Header,
      Button,
      Input
    },
    data () {
      return {
        companyName: '',
        position: '',
        startTime: '',
        endTime: ''
      }
    },
    methods: {
      // 添加数据
      addEducation: function () {
        let _this = this
        // 非空校验
        if (!this.companyName) {
          this.$createToast({
            time: 2000,
            txt: '请输入公司名称',
            type: 'warn'
          }).show()
          return
        }
        if (!this.position) {
          this.$createToast({
            time: 2000,
            txt: '请输入职位',
            type: 'warn'
          }).show()
          return
        }

        let param = {
          companyName: this.companyName,
          position: this.position,
          startTime: this.startTime,
          endTime: this.endTime
        }
        this.$store.dispatch('addWork', param).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            _this.$createToast({
              time: 2000,
              txt: '添加成功',
              type: 'correct'
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
      // 打开开始时间选择
      showStart: function () {
        // 日期选择器
        this.datePicker = this.$createDatePicker({
          min: [1970, 1, 1],
          max: [2020, 12, 31],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            console.log(selectedVal)
            this.startTime = selectedVal[0] + '-' + selectedVal[1] + '-' + selectedVal[2]
          }
        }).show()
      },
      // 打开结束时间选择
      showEnd: function () {
        this.datePicker = this.$createDatePicker({
          min: [1970, 1, 1],
          max: [2020, 12, 31],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            this.endTime = selectedVal[0] + '-' + selectedVal[1] + '-' + selectedVal[2]
          }
        }).show()
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
  #AddEdu {padding-top: 45px;}
  .edu-box{padding: 10px;}
  .edu-box h4 {font-size: 14px;color: #666;padding: 20px 0 10px 0;}
  .btn {padding: 10px;}
</style>
