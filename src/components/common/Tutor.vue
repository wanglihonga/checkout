<template>
  <div class="tutor-box">
    <cube-scroll :data="items" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown" ref="scroll">
      <div class="tutor-list" v-for="(item, index) in items" :key="index" @click="goDetail(item.userId)">
        <img class="tutor-bg" :src="item.photo" alt="">
        <div class="tutor-item">
          <p class="userinfo">
            <span class="username">{{item.name}}</span>
            <span class="info">{{item.teacherTitle}}</span>
          </p>
          <p class="tutor-label">{{item.label}}</p>
          <p class="txt">{{item.selfIntroduction | strLenth}}</p>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { Scroll } from 'cube-ui'
  export default {
    name: 'Tutor',
    components: {
      Scroll
    },
    data () {
      return {
        items: [],
        options: {
          pullDownRefresh: {
            threshold: 90,
            stop: 40,
            txt: '更新成功'
          },
          pullUpLoad: {
            threshold: 0,
            txt: {
              more: '加载数据',
              noMore: '没有更多数据'
            }
          }
        },
        currentNum: 0
      }
    },
    created () {
      this.getCreated(0)
    },
    methods: {
      getCreated (flag) {
        let _this = this
        let param = {
          pageNum: this.currentNum
        }
        this.$store.dispatch('TeacherList', param).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            // 更新分页
            _this.currentNum = res.data.pager
            // 判断是上拉加载还是下拉刷新 0/下拉刷新 1/上拉加载
            if (flag == 0) {
              _this.items = res.data.list
            }
            if (flag == 1) {
              _this.items = _this.items.concat(res.data.list)
            }
          } else {
            _this.$createToast({
              time: 2000,
              txt: res.msg,
              type: 'error'
            }).show()
          }
        })
      },
      // 跳转详情
      goDetail: function (userId) {
        console.log(userId)
        this.$router.push({path: '/tutorDetails', query: {userId: userId}})
      },
      onPullingUp () {
        if (this.currentNum != -1) {
          this.getCreated(1)
        } else {
          this.$refs.scroll.forceUpdate()
        }
      },
      onPullingDown () {
        this.currentNum = 0
        this.getCreated(0)
      }
    },
    filters: {
      strLenth (str) {
        if (str == null) {
          return '没有更多导师资料~'
        } else {
          if (str.length < 50) {
            return str
          } else {
            return str.slice(0, 50) + '...'
          }
        }
      }
    }
  }
</script>

<style scoped>
  .tutor-box{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    padding: 45px 10px 0 10px;
  }
  .tutor-list {
    border-radius: 5px;
    height: 160px;
    position: relative;
    margin-bottom: 10px;
  }
  .tutor-bg {
    width: 100%;
    border-radius: 4px;
    height: 100%;
 }
  .tutor-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
  .tutor-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    padding-top: 10px;
  }
  .username {
    font-size: 17px;
  }
  .info {
    font-size: 12px;
    margin-left: 8px;
    padding-left: 8px;
    border-left:1px solid #fff;
    height: 14px;
    line-height: 14px;
  }
  .txt {
    line-height: 16px;
    padding-top: 15px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    width: 210px;
    text-align: justify;
  }
  .userinfo {
    padding-top: 20px;
    font-size: 17px;
    color: #fff;
  }
</style>
