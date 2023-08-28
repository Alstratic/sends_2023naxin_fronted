<template>
  <div v-show="Isshow">请在微信打开</div>
</template>

<script>
import { wxRedirect, isInWechat, getWechatCode} from '../../api/wx_auth'

export default{
  data(){
      return{
        Isshow:true
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
      wxRedirect(); // 跳转到微信授权页面
     
    } catch (error) {
      console.error('登录失败', error);
    }
  },
  }
}
</script>
