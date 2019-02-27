<template>
  <div id="Activity">
    <Search @click.native="goSearch"></Search>
    <!--活动列表 start-->
    <div class="scroll-wrapper list-box">
      <cube-scroll :data="items" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown" ref="scroll">
        <Item slot="default" v-for="(item, index) in items" :key="index" :innerData="item"></Item>
        <div class="none-data" v-if="noneShow">
          <img src="../../assets/images/none-data.png" alt="">
          <p>没有更多数据~</p>
        </div>
      </cube-scroll>
      <div v-if="isBuild" class="build-group" @click="groupCreate">+</div>
    </div>
    <!--活动列表 end-->
  </div>
</template>

<script>
  import Search from '../common/Search.vue'
  import Item from '../common/MemberItem.vue'
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
        currentNum: 0,
        isBuild: false,
        noneShow: false
      }
    },
    /**
     * 生命周期函数--在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
     */
    beforeCreate: function () {
    },
    /**
     * 生命周期函数--在实例创建完成后被立即调用
     */
    created: function () {
      // 初始化列表数据
      this.initData(0)
    },
    /**
     * 生命周期函数--在挂载开始之前被调用：相关的 render 函数首次被调用
     */
    beforeMount: function () {
    },
    /**
     * 生命周期函数--el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
     */
    mounted: function () {
    },
    /**
     * 生命周期函数--数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前
     */
    beforeUpdate: function () {
    },
    /**
     * 生命周期函数--由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
     */
    updated: function () {
    },
    /**
     * 生命周期函数--keep-alive 组件激活时调用
     */
    activated: function () {
    },
    /**
     * 组件内方法
     */
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
          pageNum: this.currentNum
        }
        this.$store.dispatch('groupList', param).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            // 更新分页
            _this.currentNum = res.data.groupList.pager
            // 追加数据
            // 判断是上拉加载还是下拉刷新 0/下拉刷新 1/上拉加载
            if (flag == 0) {
              _this.items = res.data.groupList.list
              if (res.data.perm == 1) {
                _this.isBuild = true
              }
              if (_this.items.length < 1) {
                _this.noneShow = true
              }
            }
            if (flag == 1) {
              _this.items = _this.items.concat(res.data.groupList.list)
              console.log(_this.items)
            }
          }
        })
      },
      // 前往搜索
      goSearch: function () {
        this.$router.push({path: '/search', query: {flag: 3}})
      },
      // 申请创建群组
      groupCreate: function () {
        this.$router.push('/groupCreate')
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
  #Activity{position:absolute;height: 100%;width: 100%;background: rgb(242, 242, 242);}
  .list-box{padding: 10px;padding-top: 50px;}
  .scroll-wrapper{position: absolute;width: 100%;height: 100%;left:0;top:0;z-index: 0;}
  .none-data {text-align: center; font-size: 14px;color: #999;padding-top: 40px;}
  .build-group {position: fixed;right: 15px;bottom: 10px;width: 46px;height: 46px;border-radius: 46px;background: #226cb6;color: #fff;text-align: center;line-height: 46px;z-index: 400;}
</style>
