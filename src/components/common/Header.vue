<template>
  <div id="Header" class="border-bottom-1px">
    <ul>
      <li><i class="cubeic-back" v-if="showBack" @click="goBack"></i></li>
      <li>
        <slot name="title">标题</slot>
      </li>
      <li>
        <slot name="action" @click="action"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    components: {
    },
    props: {
      showBack: true
    },
    data () {
      return {
      }
    },
    methods: {
      goBack: function () {
        this.$router ? this.$router.back() : window.history.back()
      },
      action: function () {
        this.$emit('on-click-right')
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
  #Header {position: fixed;width: 100%;height: 45px;top:0;left:0;font-size: 16px;background: #fff;padding: 0 12px;z-index: 99}
  #Header ul {overflow: hidden}
  #Header ul li {height: 45px;line-height: 45px;}
  #Header ul li:nth-child(1) {float: left;width: 20%;text-align: left;}
  #Header ul li:nth-child(2) {float: left;width: 60%;text-align: center;}
  #Header ul li:nth-child(3) {float: left;width: 20%;text-align: right;font-size: 14px;}
</style>
