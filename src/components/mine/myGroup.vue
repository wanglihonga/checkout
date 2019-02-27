<template>
  <div id="myGroup" style="background: #f2f2f2">
    <Header :showBack="true">
      <span slot="title">我的群组</span>
    </Header>
    <section class="content">
      <ul>
        <li style="float: left;" :class="{active: isActive1}" @click="show1(1)">我申请的</li>
        <li style="float: right;" :class="{active: isActive2}" @click="show2(2)">我创建的</li>
      </ul>
      <!-- <ul>
        <li v-for="(item, index) in list" :key="index" :class="{active: isActive1}" @click="show(item.typeid)">{{item.txt}}</li>
      </ul> -->
      <div>
        <Item :datalist="datalist"></Item>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import Item from '../common/MyGroupList.vue'
  export default {
    name: 'myGroup',
    components: {
      Header,
      Item
    },
    data () {
      return {
        list: [
          {
            txt: '我申请的',
            typeid: 1
          },
          {
            txt: '我创建的',
            typeid: 2
          }
        ],
        isActive1: true,
        isActive2: false,
        type: 1,
        datalist: {}
      }
    },
    created: function () {
      this.getGroup()
    },
    /**
     * 组件内方法
     */
    methods: {
      // show: function (typeid) {
      //   this.isActive1 = true
      //   this.isActive2 = false
      //   this.type = typeid
      //   this.getGroup()
      // },
      show1: function (typeid) {
        this.isActive1 = true
        this.isActive2 = false
        this.type = typeid
        this.getGroup()
      },
      show2: function (typeid) {
        this.isActive1 = false
        this.isActive2 = true
        this.type = typeid
        this.getGroup()
      },
      getGroup () {
        let _this = this
        let param = {
          type: _this.type
        }
        console.log(param)
        this.$store.dispatch('myGroup', param).then(function (res) {
          console.log(res)
          if (res.code == 0) {
            _this.datalist = res.data
            console.log(_this.datalist)
          } else {
            _this.$createToast({
              time: 2000,
              txt: res.msg,
              type: 'error'
            }).show()
          }
        })
      },
      jump1Details: function (id) {
        console.log(id)
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
    computed: {}
  }
</script>

<style scoped>
  .active {
    border-bottom: 2px solid red;color:red;
    border-bottom: 2px solid red;
    border-bottom: 1px solid #226cb6;
  }
  #myGroup{position: absolute;top:0;left:0;width: 100%;height: 100%;}
  .member-list h4{background: #fff;margin-top: 10px;font-size: 14px;padding: 14px 10px;color: #999;}
  .content{padding-top: 45px;}
  .content ul{
    width: 100%;
    height: 50px;
    border-bottom:1px solid #ccc;
    background-color: #fff;
  }
  .content ul li{
    width: 50%;
    height: 100%;
    line-height:50px;
    text-align: center;
    color: red;
    color: #226cb6;
    font-size: 20px;
    font-weight: 700;
    float: left;
  }
  /* .item{
    font-size: 14px;
    background-color: #fff;
    margin: 10px 14px;
    padding: 10px;
    border: 1px solid #ccc;
    height: 120px;
  }
  .item>.left {
    float: left;
    width: 20%;
    text-align: center;
  }
  .item>.left>img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: block;
  }
  .item>.left>span {
    display: block;
    width: 80%;
    padding-top: 20px;
    color: red;
  }
  .item>.right{
    width: 80%;
    overflow: hidden;
  }
  .item>.right>.top {
    height: 50px;
  }
  .item>.right>.top>.top-left>h3 {
    font-size: 20px;
    color: #333;
  }
  .item>.right>.top>.top-left>p {
    color: #666;
    padding-top: 10px;
  }
  .item>.right>.top>.top-right {
    position: relative;
  }
  .item>.right>.top>.top-right>span {
    display: block;
    position: absolute;
    top: 5px;
    right: 0;
    width: 65px;
    height: 25px;
    line-height: 25px;
    background-color: green;
    color: #fff;
    text-align: center;
  }
  .item>.right>.bottom>p{
    color: #666;
    overflow: hidden;
    max-height: 38px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  } */
</style>
