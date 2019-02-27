<template>
  <div class="item3" @click="goDetail(innerData.courseId)">
    <section class="pic-box">
      <!--<div class="num">{{// innerData.state | getState}}</div>-->
      <img v-lazy="innerData.listImg" alt="">
      <slot name="state"></slot>
    </section>
    <section class="txt-box">
      <h4>{{innerData.title}}</h4>
      <ul>
        <li><label>活动时间: {{innerData.createTime}}</label></li>
        <li>{{innerData.address | strLenth}}</li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'ActivityItem',
    components: {
    },
    props: {
      innerData: {},
      flag: 0
    },
    data () {
      return {
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
    },
    /**
     * 组件内方法
     */
    methods: {
      goBack: function () {
        this.$router ? this.$router.back() : window.history.back()
      },
      // 跳转详情
      goDetail: function (courseId) {
        // this.$router.push({path: '/activityDetail', query: {activityId: activityId}})
        // 判断是否有权限
        if (this.flag == 1) {
          this.$router.push({path: '/courseDetail', query: {courseId: courseId, page: 'myCenter'}})
          return
        }
        if (this.innerData.perm == 1) {
          this.$router.push({path: '/courseDetail', query: {courseId: courseId}})
        } else {
          this.$createToast({
            time: 2000,
            txt: '没有权限，请尽快完善资料',
            type: 'warn'
          }).show()
        }
      }
    },
    /**
     * 计算属性
     */
    computed: {
    },
    filters: {
      getState (type) {
        if (type == 1) {
          return '进行中'
        }
        if (type == 2) {
          return '已完成'
        }
        if (type == 3) {
          return '已结束'
        }
      },
      strLenth (str) {
        if (str == null) {
          return '没有更多导师资料~'
        } else {
          if (str.length < 10) {
            return str
          } else {
            return str.slice(0, 10) + '...'
          }
        }
      }
    }
  }
</script>

<style scoped>
  .item3{border-radius: 2px;overflow: hidden;margin-bottom: 10px;margin-top: 10px;}
  .pic-box{position: relative;height: 175px;}
  .pic-box img{width: 100%;height: 100%;}
  .pic-box .num{position: absolute;top:14px;right: 0;width: 45px;height: 23px;line-height:23px;font-size: 12px;color: #fff;background: rgba(34, 108, 182, 0.8);text-align: center;}
  .txt-box{background: #fff;padding: 10px;border: 1px solid #eee;}
  .txt-box h4{font-size: 16px;color: #333;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding: 2px 0;}
  .txt-box ul{font-size: 14px;color: #999;overflow: hidden;margin-top: 10px;}
  .txt-box ul li{float: left;height: 20px;line-height: 20px;}
  .txt-box ul li:nth-child(1) {width: 60%;}
  .txt-box ul li:nth-child(2) {width: 40%;text-align: right;}
</style>
