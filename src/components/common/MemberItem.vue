<template>
  <div class="item2" @click="goDetail(innerData.groupId)">
    <section>
      <div class="left">
        <img :src="innerData.photo | logoFilter" alt="logo">
      </div>
      <div class="right">
        <h4>{{innerData.name}}</h4>
        <ul class="little-title">
          <li>{{innerData.userNum}}人</li>
          <li>创建日期：{{innerData.createTime}}</li>
        </ul>
      </div>
      <p class="profile">{{innerData.detail | maxNum}}</p>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'CourseItem',
    components: {
    },
    props: {
      innerData: {}
    },
    data () {
      return {
        defaultSrc: require('../../assets/images/group-logo.png')
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
      goDetail: function (id) {
        console.log(id)
        // this.$router.push({path: '/groupDetail', query: {groupId: groupId}})
        this.$router.push({
          name: 'groupDetail',
          query: {
            groupId: id
          }
        })
      }
    },
    /**
     * 计算属性
     */
    computed: {
    },
    filters: {
      logoFilter (src) {
        let result = ''
        console.log('===>', src)
        if (src == 'http://vuca.oss-cn-beijing.aliyuncs.com/' || src == '' || src == undefined) {
          result = require('../../assets/images/group-logo.png')
        } else {
          result = src
        }
        return result
      },
      maxNum (str) {
        let result = ''
        if (str.length > 50) {
          result = str.slice(0, 50) + '...'
        } else {
          result = str
        }
        return result
      }
    }
  }
</script>

<style scoped>
  .item2{overflow: hidden;margin-bottom: 10px;margin-top: 10px;font-size: 14px;padding: 10px;background: #fff;}
  .item2 .left{float: left;width: 22%;}
  .item2 .right{float: left;width: 78%;}
  .item2 img{width: 56px;height: 56px;border-radius: 56px;}
  .item2 .right h4{font-size: 16px;color: #333;font-weight: bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-top: 10px;padding: 2px 0;}
  .little-title{font-size: 14px;color: #999;overflow: hidden;margin-top: 12px;}
  .little-title li{float: left;padding: 2px 0;}
  .little-title li:nth-child(1){width: 30%;}
  .little-title li:nth-child(2){width: 70%;}
  .profile{clear: both;padding-top: 10px;line-height: 1.4;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden; }
</style>
