<template>
  <div >
    <span v-show="Isshow">  请在微信打开</span>
  </div>
</template>

<script>
import { wxRedirect, isInWechat, getWechatCode} from '../../api/wx_auth'
export default{
  data(){
      return{
        Isshow:true,
      }
  },
  created(){
      this.login()
  },
  methods:{
   login() {
    try {
      if (!isInWechat()) {
        console.error('请在微信中打开页面以使用微信登录');
        return;
      }
      this.Isshow=false
      // wxRedirect(); // 跳转到微信授权页面
      window.location.href = `https://apps.hqu.edu.cn/wechat-hqu/wechatauth.html?proxyTo=authoauth&sendUrl=/connect/oauth2/authorize?appid=wxfe035b066fb1158b&redirect_uri=${encodeURIComponent
    (`${document.location.origin}/#/LoginSucess`)}&encode_flag=Y&response_type=code&scope=snsapi_userinfo#wechat_redirect`
    } catch (error) {
      console.error('登录失败', error);
    }
  },
  }
}
</script>
