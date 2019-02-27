<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
  },
  watch: {
    // 存储来源页面路径，用来作为登录后返回依据
    '$route' (to, from) {
      // localStorage.router = from.path
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .2s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }

  .cube-pullup-wrapper, .cube-pulldown-wrapper {
    font-size: 14px !important;
  }

  .cube-input-clear {
    width: 0.6rem !important;
    padding: 0 !important;
  }

  .yd-datetime-head > a:last-child {
    color: #226cb6 !important;
  }

  .my-input {
    margin: 10px;
    border: 1px solid #ddd;
    height: 30px;
    border-radius: 4px;
    padding: 0 10px;
  }

  .my-input input {
    width: 100%;
    height: 100%;
    color: #333;
  }
  .bg-green {background: #009966; color: #fff;width: 100%;height: 50px;}
  .bg-blue {background: #0093d9; color: #fff;width: 100%;height: 50px;}
  .bg-gray {background: #ddd; color: #fff;width: 100%;height: 50px;}
</style>
