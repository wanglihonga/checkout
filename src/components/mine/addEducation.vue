<template>
  <div id="AddEdu">
    <Header :showBack="true">
      <span slot="title">添加教育经历</span>
    </Header>
    <ul class="edu-box">
      <li>
        <h4>毕业院校</h4>
        <cube-input v-model="school" placeholder="请输入毕业院校" autocomplete clearable></cube-input>
      </li>
      <li>
        <h4>专业</h4>
        <cube-input v-model="major" placeholder="请输入专业" autocomplete clearable></cube-input>
      </li>
      <li>
        <h4>学历/学位</h4>
        <cube-input v-model="degree" placeholder="请输入学历/学位" autocomplete clearable></cube-input>
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
        school: '',
        major: '',
        degree: '',
        startTime: '',
        endTime: ''
      }
    },
    methods: {
      // 添加数据
      addEducation: function () {
        let _this = this
        if (!this.school) {
          this.$createToast({
            time: 1500,
            txt: '请输入学校名字',
            type: 'warn'
          }).show()
          return
        }
        if (!this.major) {
          this.$createToast({
            time: 1500,
            txt: '请输入专业',
            type: 'warn'
          }).show()
          return
        }
        if (!this.degree) {
          this.$createToast({
            time: 1500,
            txt: '请输入学历/学位',
            type: 'warn'
          }).show()
          return
        }
        let prama = {
          school: this.school,
          major: this.major,
          degree: this.degree,
          startTime: this.startTime,
          endTime: this.endTime
        }
        this.$store.dispatch('addEducation', prama).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            _this.$createToast({
              time: 1500,
              txt: '提交成功',
              type: 'correct'
            })
            _this.$router.back()
          }
        })
      },
      // 打开开始时间选择
      showStart: function () {
        // 日期选择器
        console.log('start')
        this.datePicker = this.$createDatePicker({
          min: [1970, 1, 1],
          max: [2020, 12, 31],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            console.log(selectedIndex)
            this.startTime = selectedVal[0] + '-' + selectedVal[1] + '-' + selectedVal[2]
            console.log(this.startTime)
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
