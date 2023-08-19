<template>
    
</template>

<script>
import {setToken, getToken, isLogin, wxRedirect, isInWechat, getWechatCode} from '../../api/wx_auth'

export default{
    data(){
        return{
            
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
        wxRedirect(); // 跳转到微信授权页面
       
      } catch (error) {
        console.error('登录失败', error);
      }
    },
    // async checkToken() {
    //   try {
    //     const code = getWechatCode();
    //     console.log(code)
    //     if (!code) {
    //       this.isLoggedIn = true;
    //       return;
    //     }

    //     const response = await axios.get(`http://124.221.99.127:10810/user/check-token?code=${code}`);

    //     if (response.data.code === 1000) {
    //       this.isLoggedIn = false;
    //       this.$router.replace('/Homepage');
    //     } else {
    //       this.isLoggedIn = true;
    //     }
    //   } catch (error) {
    //     console.error('检查 token 失败', error);
    //   }
    // }
    }
}
</script>
