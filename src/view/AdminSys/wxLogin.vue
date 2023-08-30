<template>
    <div >
      <!--微信授权登录按钮-->
      <img src="../../assets/sends_logo.png" /><a  type="text" @click="handLoginByWx">微信扫码登录</a>
  </div> 
  </template>
  
  <script>
  export default {
    data(){
          return{            
              
          }
      },
      methods:{
          // 跳转微信登录二维码授权页面
        handLoginByWx() {
          // 重定向地址重定到当前页面，在路径获取code
          const hrefUrl = window.location.href
          // 判断是否已存在code
          if (!this.code) {
          // 不存在，配置相关微信登录参数（主要是授权页面地址，appID，回调地址）
          window.location.href = "https://open.weixin.qq.com/connect/qrconnect?appid=wxb6a3d3490ab4c2cd&redirect_uri=https://zi.pongj.com/oauth/wechat/login&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"
  
          const searchParams = new URLSearchParams(location.search)
          this.code= searchParams.get('code')
          console.log(this.code)
      }},
  
      }
  }
  </script>
  
  <style lang="scss" scoped>
      .wx_dialog_toiast {
          position: fixed;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          z-index: 9854647;
          background: rgba($color: #000000, $alpha: 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          .wx_dialog_toiast_delltet {
              width: 500px;
              height: 500px;
              background: #606266;
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .wx_dialog_button_delete {
              position: absolute;
              right: 0px;
              top: 0px;
              height: 100px;
              width: 100px;
              display: flex;
              justify-content: center;
              align-items: center;
          }
      }
  </style>