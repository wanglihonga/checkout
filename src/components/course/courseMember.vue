<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">组员互评</span>
    </Header>
    <section class="course-box" v-for="(item,index) in courseReviewResults" :key="index">
      <div class="course-pic border-bottom-1px">
        <p>{{item.name}}</p>
      </div><!--组员姓名-->
      <div>
        <ul>
          <li class="course-list">
            <ol>
              <li>价值参与度</li>
              <li v-for="(item0,index0) in 5" @click="setScoreOne(index, item0)" :key="index0"
                  :class="{touch: index0 + 1 == item.scoreOne}">{{item0}}
              </li>
              <!--<li>1</li>
              <li class="touch">2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>-->
            </ol>
          </li>
          <li class="course-list">
            <ol>
              <li>课程参与度</li>
              <li v-for="(item1,index1) in 5" @click="setScoreTwo(index, item1)" :key="index1"
                  :class="{touch: index1 + 1 == item.scoretTwo}">{{item1}}
              </li>
            </ol>
          </li>
          <li class="course-list">
            <ol>
              <li>同行意愿度</li>
              <li v-for="(item2,index2) in 5" @click="setScoreThree(index, item2)" :key="index2"
                  :class="{touch: index2 + 1 == item.scoreThird}">{{item2}}
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </section> <!--互评细则-->
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
    name: 'courseMember',
    components: {
      Header
    },
    data () {
      return {
        id: this.$route.query.id,
        courseReviewResults: []
      }
    },
    activated () {
      this.getInfo()
    },
    methods: {
      // 设置分数一
      setScoreOne (index, num) {
        let obj = this.courseReviewResults[index]
        obj.scoreOne = num
        this.courseReviewResults.splice(index, 1, obj)
      },
      setScoreTwo (index, num) {
        let obj = this.courseReviewResults[index]
        obj.scoretTwo = num
        this.courseReviewResults.splice(index, 1, obj)
      },
      setScoreThree (index, num) {
        let obj = this.courseReviewResults[index]
        obj.scoreThird = num
        this.courseReviewResults.splice(index, 1, obj)
      },
      getInfo () {
        let that = this
        console.log(that.id)
        this.$store.dispatch('courseMemberList', {courseId: that.id}).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            that.courseReviewResults = []
            res.data.forEach((item, index) => {
              let obj = {
                'evaluation': '',
                'scoreOne': 5,
                'scoreThird': 5,
                'scoretTwo': 5,
                'name': item.name,
                'userId': item.userId
              }
              that.courseReviewResults.push(obj)
            })
          }
        })
      },
      submit () {
        let that = this
        let param = {
          courseId: this.id,
          courseReviewResults: JSON.stringify(this.courseReviewResults)
        }
        this.$store.dispatch('courseMemberReview', param).then(function (res) {
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
    height: 163px;
    border-radius: 6px;
    margin-left: 11px;
    background: white;
    margin-top: 11px;
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
