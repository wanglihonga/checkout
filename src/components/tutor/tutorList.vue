<template>
  <div class="bg-style">
    <Header :showBack="false">
      <span slot="title">导师智库</span>
    </Header>
    <div style="margin-top: 54px;"></div>
    <div>
      <Tutor></Tutor>
    </div>
  </div>
</template>

<script>
  import Header from '../common/Header.vue'
  import Tutor from '../common/Tutor.vue'
  export default {
    name: 'tutorList',
    components: {
      Header,
      Tutor
    }
  }
</script>

<style scoped>
  .bg-style{position: absolute;left:0;top:0;width: 100%;height: 100%;}
</style>
