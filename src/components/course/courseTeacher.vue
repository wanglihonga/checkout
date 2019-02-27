<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">助教评分</span>
    </Header>
    <section class="course-box" v-for="(item,index) in assistantReviewResults" :key="index">
      <div class="course-pic border-bottom-1px">
        <p>{{item.name}}</p>
      </div><!--导师姓名-->
      <div>
        <ul>
          <li class="course-list">
            <ol>
              <li>服务评价</li>
              <li v-for="(item0,index0) in 5" :key="index0" @click="setScoreOne(index, item0)"
                  :class="{touch: index0 + 1 == item.scoreOne}">
                {{item0}}
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <div class="textarea-box">
        <textarea class="textarea" placeholder="给助教的建议，非必填" v-model="item.content"></textarea>
      </div>
    </section> <!--评分细项-->
    <a href="#">
      <div class="btn-add" @click="submit">
        <span>提交</span>
      </div>
    </a><!--提交按钮-->
  </div>
</template>

<script>
  import Header from '../common/Header.vue'

  export default {
    name: 'courseTeacher',
    components: {
      Header
    },
    activated () {
      this.getInfo()
    },
    data () {
      return {
        id: this.$route.query.id,
        assistantReviewResults: []
      }
    },
    methods: {
      setScoreOne (index, num) {
        let obj = this.assistantReviewResults[index]
        console.log(obj)
        obj.scoreOne = num
        this.assistantReviewResults.splice(index, 1, obj)
      },
      getInfo () {
        let that = this
        this.$store.dispatch('courseAssistantList', {courseId: that.id}).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            that.assistantReviewResults = []
            res.data.forEach((item, index) => {
              let obj = {
                'assistantId': item.assistantId,
                'content': '',
                'name': item.name,
                'scoreOne': 5
              }
              console.log(obj)
              that.assistantReviewResults.push(obj)
            })
          }
        })
      },
      submit () {
        console.log('提交助教')
        let that = this
        let param = {
          courseId: this.id,
          assistantReviewResults: JSON.stringify(this.assistantReviewResults)
        }
        this.$store.dispatch('courseAssistantReview', param).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            that.$createToast({
              txt: `评价成功`,
              type: 'correct',
              $events: {
                timeout: () => {
                  that.$router ? that.$router.back() : window.history.back()
                }
              },
              time: 1000
            }).show()
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

  .course-box {
    width: 353px;
    height: 280px;
    border-radius: 6px;
    margin-left: 11px;
    background: white;
    margin-top: 10px;
  }

  .course-pic {
    height: 32px;
    line-height: 32px;
    background: url("../../assets/images/iocn_teacher.png") center left no-repeat;
    background-size: 20px;
    margin: auto 17px;
  }

  .course-pic p {
    font-size: 15px;
    color: #333333;
    margin-left: 22px;
    padding-top: 1px;
  }

  .course-list {
    height: 42px;
  }

  .course-list ul {
    overflow: hidden;
  }

  .course-list ol li {
    float: left;
    height: 25px;
    text-align: center;
  }

  .course-list ol li:nth-child(1) {
    font-size: 13px;
    color: #666666;
    margin-right: 20px;
    line-height: 42px;
    width: 30%;
    text-align: left;
    padding-left: 20px;
  }

  .course-list ol li:not(:first-child) {
    width: 42px;
    border: 1px solid #bfbfbf;
    font-size: 13px;
    margin-top: 10px;
    line-height: 25px;
  }

  .course-list ol li:not(:last-child) {
    border-right: 0;
  }

  .touch {
    background: #226cb6;
    color: white;;
  }

  .textarea-box {
    margin-left: 12px;
    margin-top: 10px;
  }

  .textarea {
    width: 320px;
    height: 140px;
    background-color: #f5f5f5;
    resize: none;
    font-size: 13px;
    padding-left: 8px;
    padding-top: 22px;
  }

  textarea::-webkit-input-placeholder {
    color: #dbdbdb;
  }

  .btn-add {
    width: 351px;
    height: 40px;
    border-radius: 5px;
    color: white;
    font-size: 17px;
    text-align: center;
    line-height: 40px;
    bottom: 5px;
    z-index: 10;
    background: url("../../assets/images/btn_next@2x.png") center;
    margin-left: 12px;
    margin-top: 52px;
  }
</style>
