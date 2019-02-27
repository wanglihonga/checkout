<template>
  <div id="Activity" style="background: #fff">
    <Search @click.native="goSearch"></Search>
    <!--活动列表 start-->
    <div class="scroll-wrapper list-box">
      <cube-scroll :data="items" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown" ref="scroll">
        <Item slot="default" v-for="(item, index) in items" :key="index" :innerData="item" flag="0">
          <!--<span slot="state" class="state">进行中</span>-->
        </Item>
        <!-- <Item slot="default" v-for="(item, index) in items" :key="index" :innerData="item">
          <span slot="state" class="finish">已完成</span>
        </Item> -->
      </cube-scroll>
    </div>
    <!--活动列表 end-->
  </div>
</template>

<script>
  import Search from '../common/Search.vue'
  import Item from '../common/ActivityItem.vue'
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
        this.$store.dispatch('activityList', param).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            // 更新分页
            _this.currentNum = res.data.pager
            // 追加数据
            // 判断是上拉加载还是下拉刷新 0/下拉刷新 1/上拉加载
            if (flag == 0) {
              _this.items = res.data.list
            }
            if (flag == 1) {
              _this.items = _this.items.concat(res.data.list)
            }
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
  #Activity{position:absolute;height: 100%;width: 100%;}
  .list-box{padding: 10px;padding-top: 50px;}
  .scroll-wrapper{position: absolute;width: 100%;height: 100%;left:0;top:0;z-index: 0;}
  .state{position: absolute;top: 0;left:25px;font-size: 13px;color: #ffffff;width: 44px;height: 20px;background: #ff6600;
    text-align: center;line-height: 22px;}
  .finish{position: absolute;top: 0;left:25px;font-size: 13px;color: #ffffff;width: 44px;height: 20px;background: #bfbfbf;
    text-align: center;line-height: 22px;}
</style>
