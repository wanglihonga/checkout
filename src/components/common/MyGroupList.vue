<template>
  <div>
    <div class="item" v-for="item in datalist" @click="jumpDetails(item.groupId)" :key="item.groupId">
      <div class="top">
        <div class="left">
          <img :src="item.photo" alt="">
        </div>
        <div class="right">
          <p class="itemName">{{item.name}}</p>
          <p class="iteminfo">
            <span>12人</span>
            <span>创建日期: {{item.createTime}}</span>
          </p>
        </div>
      </div>
      <div class="bottom">
        <p>{{item.detail}}</p>
      </div>
      <span class="vip" style="background: #5b79fb;" v-if="item.state == 1">审核中</span>
      <span class="vip" style="background: #fecb00;" v-if="item.state == 2">已通过</span>
      <span class="vip" style="background: #898989;" v-if="item.state == 3">未通过</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myGroupList',
  props: {
    datalist: {}
  },
  methods: {
    jumpDetails: function (id) {
      console.log(id)
      this.$router.push({
        name: 'groupDetail',
        query: {
          groupId: id
        }
      })
    }
  }
}
</script>

<style>
.item {
font-size: 14px;
background: #fff;
padding: 10px;
margin: 10px 14px;
height: 120px;
box-sizing: border-box;
position: relative;
}
.vip {
display: block;
position: absolute;
width: 50px;
height: 25px;
line-height: 25px;
text-align: center;
color: #fff;
top: 10px;
right: 0;
}
.item .top {
height: 60px;
padding-bottom: 10px;
box-sizing: border-box;
display: flex;
}
.item .bottom {
box-sizing: border-box;
width: 100%;
height: 60px;
line-height: 22px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}
.item .top .left {
width: 50px;
height: 50px;
}
.item .top .left img {
width: 100%;
height: 100%;
border-radius: 100%;
}
.item .top .right {
flex: 1;
padding-left: 10px;
padding-top: 3px;
padding-bottom: 3px;
box-sizing: border-box;
}
.right p {
line-height: 23px;
}
.right .itemName {
font-size: 16px;
font-weight: bold;
}
.right .iteminfo {
color: #ccc;
}
.iteminfo span:first-child {
padding-right: 10px;
}
</style>
