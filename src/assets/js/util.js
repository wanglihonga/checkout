/**
 * 项目工具
 */

// 手机号校验
function regMobile (tel) {
  let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  if (reg.test(tel)) {
    return true
  } else {
    return false
  }
}
// 微信注册
function registerWx (data) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名
    jsApiList: ['chooseWXPay', 'chooseImage', 'uploadImage', 'onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
  })
}
export {regMobile, registerWx}
