<template>
  <div class="bg-style">
    <Header :showBack="true">
      <span slot="title">公司信息</span>
    </Header>
    <div class="company-name">
      <ul>
        <li><span>公司名称</span></li>
        <li><input type="text" v-model="companyName" /></li>
      </ul>
    </div><!--公司名称-->
    <div class="company-introduce">
      <ul>
        <li class="border-bottom-1px"><span>公司介绍</span></li>
        <li class="txtbox">
          <cube-textarea :placeholder="placeholder" :maxlength="maxlength" v-model="detail" style="height: 200px"></cube-textarea>
        </li>
      </ul>
    </div><!--公司名称-->
      <div class="btn-save" @click="save">
        <span>保存</span>
      </div>
  </div>
</template>

<script>
    import Header from '../common/Header.vue'
    import { Textarea } from 'cube-ui'
    export default {
      name: 'companyInformation',
      components: {
        Header,
        Textarea
      },
      data () {
        return {
          companyName: '',
          detail: '',
          placeholder: '请输入公司介绍',
          maxlength: 200,
          userDetail: {}
        }
      },
      methods: {
        save () {
          let param = {
            companyName: this.companyName,
            detail: this.detail
          }
          let _this = this
          this.$store.dispatch('editCompany', param).then(function (res) {
            console.log(res)
            if (res.code == 0) {
              _this.$router.push('/personalMine')
            }
          })
        }
      },
      created: function () {
        this.userDetail = this.$route.query.detail
        this.detail = this.userDetail.companyDetail
        this.companyName = this.userDetail.companyName
      },
      activated: function () {
      }
    }
</script>

<style scoped>
  .bg-style{background: rgb(238,238,238);padding-top: 44px;min-height: 667px;}
  .company-name{width: 375px;height: 50px;background: white;margin-bottom: 10px;}
  .company-name ul li{line-height: 50px;background: white;float: left;padding-left: 11px;}
  .company-name ul li:nth-child(1){font-size: 15px;color: #333333;min-width: 25%;}
  .company-name ul li:nth-child(2){font-size: 15px;color: #666666;}
  .company-name ul li:nth-child(2) input{width: 250px;}
  .txtbox {
    /*height: 300px;*/
  }
  .txtbox cube-textarea {
    height: 100%;
  }
  .company-introduce{width: 375px;min-height: 50px;background: white;margin-bottom: 10px;}
  .company-introduce ul li:nth-child(1){line-height: 50px;background: white;padding-left: 11px;font-size: 15px;
                                         color: #333333;min-width: 25%;}
  .company-introduce ul li:nth-child(2){width: 375px;font-size: 14px;color: #c4c4c4;}
  textarea::-webkit-input-placeholder{color: #c4c4c4;}
  .btn-save{
    margin-top: 30px;width:351px;height:40px;border-radius:5px;color:white;font-size: 17px;text-align: center;line-height: 40px;
    bottom: 5px;background:url("../../assets/images/btn_next@2x.png")center;margin-left: 12px;/*position: absolute;*/ bottom: 100px;}
</style>
