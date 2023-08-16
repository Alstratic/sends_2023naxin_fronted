<template>
    <div class="header-container" v-if="isLoggedIn">
        <div class="header-navigator">
            <img src="../../assets/sends_logo.png" alt="">
            <span>华侨大学网络创新实验室</span>
        </div>
        <div class="login-container2">
            <el-button type="warning" class="un-login" @click="login">登录</el-button>
        </div>
    </div>
    <div class="header-container" v-else>
        <div class="header-navigator">
            <img src="../../assets/sends_logo.png" alt="">
            <span>华侨大学网络创新实验室</span>
        </div>
        <div class="login-container">
            <div class="login-options">
                <span>考核</span>
            </div>
            <div class="login-options">
                <span>面试</span>
            </div>
            <div class="login-options">
                <span>申请</span>
            </div>
            <div class="login-options">
                <span>收藏</span>
            </div>
            <img src="../../assets/sends_logo.png" alt="">
        </div>
    </div>
</template>

<script>
import {setToken, getToken, isLogin, wxRedirect, isInWechat, getWechatCode} from '../../api/wx_auth'

export default{
    data(){
        return{
            isLoggedIn:true
        }
    },
    methods:{
        async login() {
      try {
        if (!isInWechat()) {
          console.error('请在微信中打开页面以使用微信登录');
          return;
        }
        
        wxRedirect(); // 跳转到微信授权页面
        console.log("hello")
       checkToken();
      } catch (error) {
        console.error('登录失败', error);
      }
    },
    async checkToken() {
      try {
        const code = getWechatCode();
        console.log(code)
        if (!code) {
          this.isLoggedIn = true;
          return;
        }

        const response = await axios.get(`http://124.221.99.127:10810/user/check-token?code=${code}`);

        if (response.data.code === 1000) {
          this.isLoggedIn = false;
          this.$router.replace('/Homepage');
        } else {
          this.isLoggedIn = true;
        }
      } catch (error) {
        console.error('检查 token 失败', error);
      }
    }
    }
}
</script>
