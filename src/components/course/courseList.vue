<template>
  <div id="Activity" style="background: #fff">
    <Search @click.native="goSearch"></Search>
    <!--课程列表 start-->
    <div class="scroll-wrapper list-box">
      <cube-scroll :data="items" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown" ref="scroll">
        <Item slot= "default" v-for="(item, index) in items" :key="index" :innerData="item"></Item>
      </cube-scroll>
    </div>
    <!--课程列表 end-->
  </div>
</template>

<script>
  import Search from '../common/Search.vue'
  import Item from '../common/CourseItem.vue'
  import { Scroll } from 'cube-ui'
  export default {
    name: 'Activity',
    components: {
      Search,
      Item,
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
    created: function () {
      // 初始化列表数据
      this.initData(0)
    },
    methods: {
      // 下拉刷新
      onPullingDown: function () {
        this.currentNum = 0
        this.initData(0)
      },
      // 上拉加载
      onPullingUp: function () {
        if (this.currentNum != -1) {
          this.initData(1)
        } else {
          this.$refs.scroll.forceUpdate()
        }
      },
      // 数据请求
      initData: function (flag) {
        let _this = this
        let param = {
          pageNum: this.currentNum,
          state: 0
        }
        this.$store.dispatch('courseList', param).then(function (res) {
          if (res.code == 0) {
            // 更新分页
            _this.currentNum = res.data.pager
            // 追加数据
            // 判断是上拉加载还是下拉刷新 0/下拉刷新 1/上拉加载
            if (flag == 0) {
              _this.items = res.data.list
              console.log(0)
              console.log(_this.items)
            }
            if (flag == 1) {
              _this.items = _this.items.concat(res.data.list)
              console.log(1)
              console.log(_this.items)
            }
          }
        })
      },
      // 搜索
      goSearch: function () {
        this.$router.push({path: '/search', query: {flag: 2}})
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
  #Activity{position:absolute;height: 100%;width: 100%;}
  .list-box{padding-top: 50px; padding-bottom: 10px;}
  .scroll-wrapper{position: absolute;width: 100%;height: 100%;left:0;top:0;z-index: 0;}
</style>
