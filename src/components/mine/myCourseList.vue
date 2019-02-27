<template>
  <div id="Activity" style="background: #fff">
    <!--<Search @click.native="goSearch"></Search>-->
    <Header :showBack="true">
      <span slot="title">我的课程</span>
    </Header>
    <!--活动列表 start-->
    <div class="scroll-wrapper list-box">
      <Item slot="default" v-for="(item, index) in items" :key="index" :innerData="item" :flag="1"></Item>
      <!-- <Item slot="default" v-for="(item, index) in items" :key="index" :innerData="item">
        <span slot="state" class="finish">已完成</span>
      </Item> -->
    </div>
    <!--活动列表 end-->
  </div>
</template>

<script>
  import Search from '../common/Search.vue'
  import Item from '../common/CourseItem.vue'
  import {Scroll} from 'cube-ui'
  import Header from '../common/Header.vue'

  export default {
    name: 'Activity',
    components: {
      Search,
      Item,
      Scroll,
      Header
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
    activated: function () {
      // 初始化列表数据
      this.initData(0)
    },
    methods: {
      // 数据请求
      initData: function (flag) {
        let _this = this
        let param = {}
        this.$store.dispatch('course', param).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            // 更新分页
            // _this.currentNum = res.data.pager
            // 追加数据
            // 判断是上拉加载还是下拉刷新 0/下拉刷新 1/上拉加载
            _this.items = res.data
          }
        })
      },
      // 搜索
      goSearch: function () {
        this.$router.push({path: '/search', query: {flag: 1}})
      }
    }
  }
</script>

<style scoped>
  #Activity {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .list-box {
    padding: 10px;
    padding-top: 50px;
  }

  .scroll-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 0;
  }

  .state {
    position: absolute;
    top: 0;
    left: 25px;
    font-size: 13px;
    color: #ffffff;
    width: 44px;
    height: 20px;
    background: #ff6600;
    text-align: center;
    line-height: 22px;
  }

  .finish {
    position: absolute;
    top: 0;
    left: 25px;
    font-size: 13px;
    color: #ffffff;
    width: 44px;
    height: 20px;
    background: #bfbfbf;
    text-align: center;
    line-height: 22px;
  }
</style>
