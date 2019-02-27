<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">我的充值</span>
    </Header>
    <section class="property">
      <div>

      </div>
      <section style="padding-top: 50px;">
        <button type="button" @click="action">下单</button>
        <button type="button" @click="action2">调起</button>
      </section>
    </section>

  </div>
</template>
<script>
  import Header from '../common/Header.vue'
  export default {
    name: 'property',
    components: {
      Header
    },
    /**
     * 组件内方法
     */
    methods: {
      action: function () {
        let param = {
          price: '0.01'
        }
        this.$store.dispatch('submitRechargeOrder', param).then(function (res) {

        })
      },
      action2: function () {
         let param = {
           'orderNo': '2018033117503543443164C4B85'
         }
        this.$store.dispatch('preparePay', param).then(function (res) {

        })

      }
    }
  }
</script>

<style scoped>

</style>
