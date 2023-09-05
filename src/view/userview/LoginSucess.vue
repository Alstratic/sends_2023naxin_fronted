<template>
  <div> 
  </div>
</template>
<script>
import {LoginPostData} from '../../api/index'  
export default {
  //inject: ["reload"],
  data(){
      return{
          userToken:'',
          dataParms:{
              code:''
          },
          IsShow:false,
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
  checkToken() {
    try {
     const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
     const code=hashParams.get('code');
     this.tt=code
      // console.log(code)
      if (!code) {
        this.isLoggedIn = true;
        return;
      }
      LoginPostData(code).then(res=>{
        this.tok=res
          if(res.data.code===1000){
              // console.log(res)
              this.userToken = res.data.data
              // 将token本地存储到回话中
              localStorage.setItem('HQU_naxin', this.userToken);
              this.$router.replace('/user/homepage');
          } else{
            console.error('未绑定微信公众号');
               // 用户未绑定微信公众号，进行重定向到绑定页面
               window.location.href = 'http://wx.sends.cc'
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

