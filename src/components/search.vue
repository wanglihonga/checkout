<template>
  <div id="Search">
    <Header :showBack="true">
      <span slot="title">搜索</span>
    </Header>
    <div class="content">
      <div class="scroll-wrapper list-box">
        <cube-scroll :data="items" :options="options" @pulling-up="onPullingUp" ref="scroll">
          <!--搜索框-->
          <section class="search">
            <i class="icon"></i>
            <input type="text" placeholder="请输入关键词搜索" v-on:input="searchData(1)" v-model="searchkey">
          </section>
          <!--活动列表-->
          <activityItem slot="default" v-for="(item, index) in items" :key="index" :innerData="item" v-if="flag == 1"></activityItem>
          <!--课程列表-->
          <courseItem slot="default" v-for="(item, index) in items" :key="index" :innerData="item" v-if="flag == 2"></courseItem>
          <!--群组列表-->
          <MemberItem slot="default" v-for="(item, index) in items" :key="index" :innerData="item" v-if="flag == 3"></MemberItem>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './common/Header.vue'
  import courseItem from './common/CourseItem.vue'
  import activityItem from './common/ActivityItem.vue'
  import MemberItem from './common/MemberItem.vue'
  import { Scroll } from 'cube-ui'
  export default {
    name: 'Login',
    components: {
      Header,
      courseItem,
      activityItem,
      MemberItem,
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
        searchkey: '',
        flag: 1
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
      // 获取搜索来源
      // flag 1 代表活动 2 代表课程
      this.flag = this.$route.query.flag
    },
    /**
     * 组件内方法
     */
    methods: {
      // 上拉加载
      onPullingUp: function () {
        if (this.currentNum != -1) {
          this.searchData(2)
        } else {
          this.$refs.scroll.forceUpdate()
        }
      },
      // 数据请求
      searchData: function (upFlag) {
        this.currentNum = 0
        let _this = this
        let param = {}
        let action = ''
        // 如果输入为空，就不在调用下面接口
        if (this.searchkey == '') {
          return
        }
        // 活动入参
        let a = {
          pageNum: this.currentNum,
          state: 0,
          keyword: this.searchkey
        }
        // 课程入参
        let b = {
          pageNum: this.currentNum,
          keyword: this.searchkey
        }
        // 群组入参
        let c = {
          pageNum: this.currentNum,
          keyword: this.searchkey
        }
        // 设置网络请求
        if (this.flag == 1) {
          param = a
          action = 'activityList'
        }
        if (this.flag == 2) {
          param = b
          action = 'courseList'
        }
        if (this.flag == 3) {
          param = c
          action = 'groupList'
        }
        console.log(param)
        this.$store.dispatch(action, param).then(function (res) {
          if (res.code == 0) {
            // 数据
            // upFlag 1 初始搜索  2 上拉加载

            if (upFlag == 1) {
              if (_this.flag == 3) {
                _this.items = res.data.groupList.list
              } else {
                _this.items = res.data.list
              }
            }
            if (upFlag == 2) {
              if (_this.flag == 3) {
                _this.items = _this.items.concat(res.data.groupList.list)
              } else {
                _this.items = _this.items.concat(res.data.list)
              }
            }

            // 更新分页
            _this.currentNum = res.data.pager
          }
        })
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
  .list-box{padding: 10px;padding-top: 50px;}
  .scroll-wrapper{position: absolute;width: 100%;height: 100%;left:0;top:0;z-index: 0;}
  #Search {padding-top: 45px;position:absolute;height: 100%;width: 100%;}
  .content{padding: 10px;background: #fff;}
  .search{width: 100%;height: 30px;line-height:30px;border: 1px solid #d7d7d7;font-size: 14px;color: #d7d7d7;border-radius: 4px;background: #fff;}
  .search .icon {float: left;width: 15px;height: 15px;background: url("../assets/images/icon_search.png")center no-repeat;background-size: 18px;margin: 7px 10px;}
</style>
