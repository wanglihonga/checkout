<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">导师评分</span>
    </Header>
    <section class="course-box" v-for="(item, index) in teacherReviewResults" :key="index">
      <div class="course-pic border-bottom-1px">
        <p>{{item.name}}</p>
      </div><!--导师姓名-->
      <div>
        <ul>
          <li class="course-list">
            <ol>
              <li>价值参与度</li>
              <li v-for="(item0,index0) in 5" @click="setScoreOne(index, item0)" :key="index0"
                  :class="{touch: index0 + 1 == item.scoreOne}">
                {{item0}}
              </li>
            </ol>
          </li>
          <li class="course-list">
            <ol>
              <li>场域塑造</li>
              <li v-for="(item1,index1) in 5" :key="index1" @click="setScoreTwo(index, item1)"
                  :class="{touch: index1 + 1 == item.scoretTwo}">
                {{item1}}
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <div>
        <textarea class="textarea" placeholder="给导师的建议，非必填" v-model="item.content"></textarea>
      </div>
    </section>
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
    name: 'courseScore',
    components: {
      Header
    },
    activated () {
      this.getInfo()
    },
    data () {
      return {
        teacherReviewResults: [],
        id: this.$route.query.id
      }
    },
    methods: {
      setScoreOne (index, num) {
        let obj = this.teacherReviewResults[index]
        console.log(obj)
        obj.scoreOne = num
        this.teacherReviewResults.splice(index, 1, obj)
      },
      setScoreTwo (index, num) {
        let obj = this.teacherReviewResults[index]
        console.log(obj)
        obj.scoretTwo = num
        this.teacherReviewResults.splice(index, 1, obj)
      },
      getInfo () {
        let that = this
        this.$store.dispatch('courseTeacherList', {courseId: that.id}).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            that.teacherReviewResults = []
            res.data.forEach((item, index) => {
              let obj = {
                'userId': item.userId,
                'content': '',
                'scoreOne': 5,
                'name': item.name,
                'scoretTwo': 5
              }
              console.log(typeof obj)
              that.teacherReviewResults.push(obj)
            })
            console.log(that.teacherReviewResults)
          }
        })
      },
      submit () {
        let that = this
        let param = {
          courseId: this.id,
          teacherReviewResults: JSON.stringify(this.teacherReviewResults)
        }
        console.log(param)
        this.$store.dispatch('courseTeacherReview', param).then(function (res) {
          console.log('进入接口')
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

  .textarea {
    width: 320px;
    height: 140px;
    background-color: #f5f5f5;
    margin-left: 14px;
    resize: none;
    margin-top: 10px;
    font-size: 13px;
  }

  textarea::-webkit-input-placeholder {
    color: #dbdbdb;
    padding: 12px 22px;
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
