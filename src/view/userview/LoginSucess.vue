<template>
    <div>
    </div>
</template>
<script>
import {setToken, getToken, isLogin, wxRedirect, isInWechat, getWechatCode} from '../../api/wx_auth'
import axios from 'axios';
import {LoginPostData} from '../../api/index'  
export default {
    //inject: ["reload"],
    data(){
        return{
            userToken:'',
            dataParms:{
                code:''
            },
        }
    },
    // 因为是在当前页面添加code的，界面没有刷新，只是添加参数，所以就必须监测路由参数的变化
    watch: {
        $route(){
            if(this.$route.query.code!=undefined)
            {
                this.getWeixin(this.$route.query.code,this.$route.query.state);
            }
        }
    },
    // js代码
    created () {
        this.checkToken();
    },
    methods: {
        // //  公共方法
        // getUrlKey (name) {
        //     return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [",",""])[1].replace(/\+/g, '%20')) || null;
        // },
        // // 通过code获取微信信息
        // getWeixin(){
        // 	//调用接口，将code传给后端
        //     pcLoginByWeiXin(this.dataParms).then((res) => {
        //         console.log('+++++++',res)
        //         if (res.data.code == 0) {
        //             localStorage.setItem('openId', res.data.data.openId); // openId存入缓存
        //             localStorage.setItem('token', res.data.data.token); // userToken存入缓存
        //             window.location.href = "/"
        //         }else if(res.data.code == 30){
        //             localStorage.setItem('openId', res.data.message);
        //             this.open();
        //         }else {
        //             this.$message.error(res.data.message);
        //             window.location.href = "/login"
        //         }
        //     });
        // },
        // open() {
        //     this.$confirm('暂无用户，请选择注册或绑定手机号', '提示', {
        //         confirmButtonText: '注册',
        //         cancelButtonText: '绑定',
        //         type: 'warning'
        //     }).then(() => {
        //         this.$router.push({path:'/registered'})
        //     }).catch(() => {
        //         this.$router.push({path:'/wxBind'})
        //     });
        // }
     login() {
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
    checkToken() {
      try {
        const code = getWechatCode();
        console.log(code)
        if (!code) {
          this.isLoggedIn = true;
          return;
        }
        LoginPostData(code).then(res=>{
            if(res.data.code===1000){
                console.log(res)
                this.userToken = res.data.data
                // 将token本地存储到回话中
                localStorage.setItem('token', this.userToken);
                this.isLoggedIn = false;
                this.$router.replace('/Homepage');
            } else {
                
            // this.isLoggedIn = true;
            }
      })
    }catch (error) {
        console.error('检查 token 失败', error);
      }
    }
    }
}
</script>

