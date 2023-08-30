<template>
  <el-container class="home-container">
      <!--头部  -->
      <el-header>
          <div>
             <img src="../../assets/sends_logo.png" alt="">
             <span>{{ data1 }}</span>
             <!-- <span>桑梓网络创新实验室（组织版）</span> -->
          </div>
          <!-- 退出按钮 -->
          <div class="login-container2">
            <el-button type="warning" class="un-login" @click="login">登录</el-button>
          </div>
          <!-- <p>组织版</p> -->
      </el-header>


      <!-- 页面主体区  嵌套容器  包裹 Aside与Main -->
      <el-container>
            <!-- 左侧 -->
            <el-aside width="112px">
              <el-menu  :default-active="$route.path" @select="handleSelect"
              active-text-color="#3E3E3E" background-color="#FFD74D" unique-opened>
              <el-menu-item index="FirstPage">
                <template slot="title">
                  <span>首页</span>
                </template>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <span>职位</span>
                </template>
                <el-menu-item index="jobList">职位列表</el-menu-item>
                <el-menu-item  index="jobDetails">职位详情</el-menu-item>
                <el-menu-item   index="jobpost">职位发布</el-menu-item>
                <el-menu-item index="ailApproval">申请审批</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <span>面试</span>
                </template>
                <el-menu-item index="viewList">面试列表</el-menu-item>
                <el-menu-item index="viewArra">面试安排</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <span>考核</span>
                </template>
                <el-menu-item index="AssessView">考核批阅</el-menu-item>
                <el-menu-item index="AssessRela">考核发布</el-menu-item>
                <el-menu-item index="AssessDetail">考核详情</el-menu-item>
              </el-submenu>
            </el-menu>

            </el-aside>
            <!-- 主体 -->
            <el-main>

              <router-view></router-view>
            
            </el-main>
      </el-container>


  </el-container>
</template>

<script >
import {setAdminToken, getAdminToken, isAdminLogin, wxAdminRedirect, isInWechat, getWechatCode} from '@/request/wx_auth'
import axios from 'axios';
export default{
  name:'TabView',
  data(){
    return{
      data1:String
    }
  },
  methods:{
    // 退出操作 
    logout(){
      // 清空token
        window.sessionStorage.clear()
      //  将登录页面转入到登录界面
      this.$router.push('/login')
    },
    handleSelect(path){   
      if(path!=sessionStorage.getItem('Page')){
        this.$router.push(path)      
        sessionStorage.setItem('Page',path)
      }
    },
    async login() {
      try {
          if (!isInWechat()) { // 如果不是在微信页面中，执行微信授权重定向
              wxAdminRedirect(); 
              return;
          }

          const code=getWechatCode();
          // alert(code);
          if (!code) { // 如果在url中没有code
              wxAdminRedirect();
              return;
          }
          // alert(code);
          this.checkCode(code);
      }
      catch (error) {
          console.error('登录失败', error);
      }
    },
    async checkCode(code) {
      try {
        const response = await axios.post('https://recruit.sends.cc/api/admin/login', { code });
        // alert(response.data.code,response.data.data,response.data.msg);
        const token = response.data.data;
        // 保存 'token' 到本地存储
        setAdminToken(token);
        this.data1=getAdminToken()
        // 更新登录状态
        this.isLoggedIn = true;
        // 跳转到指定页面，例如 '/Homepage'
        this.$router.replace('/admin/FirstPage');
      }
      catch (error) {
        alert(error);
      }
    }

  },
  mounted(){
        // localStorage.removeItem('HQU_naxin'); // token名称为HQU_naxin
        if(isAdminLogin()){
            alert(getAdminToken());
            this.data1=getAdminToken();
            this.isLoggedIn=true;
        }
  },

  
}
</script>


<style scoped lang="less">
   // 标签的名字就是类的名字
  .home-container{
   height: 100%;
  }

  .login-container2{
    @media (max-width: 769px) {
        margin-right: 0;
    }
    display: flex;
    height: 100%;
    align-items: center;
    margin-right: 10px; /* 可以调整右侧距离 */
    width: 3%;
    justify-content: space-between;
  }

  .un-login{
    color: black;
    background-color: #FFD74D;
    font-family: 'Source Han Sans SC VF', sans-serif;
    font-size: 14px;
    padding: 8px 14px;
    font-weight: 800;
    border: 0;
  } 

 .el-header{
    display: flex;
    justify-content: space-between;
    padding-left: 0px;
   //  居中
    align-items:center;
   // 文字大小
    font-size: 20px;

   // 给header中嵌套的div进行样式改造
   // 子代选择器
   >div{
     display:flex;
   //   纵向居中
     align-items:center;

   //   在给div中的span改造样式
      >span{
        font-family: 'Source Han Sans SC VF', sans-serif;
        padding-left:8px;
        display: inline-block;
        line-height: 100%;
        font-size: 1.3rem;
        @media (max-width: 920px) {
          font-size: 1vw;
          // display: block;
          // display: none;
        }
      }
  }
}

 .el-aside{
  font-family: Source Han Serif CN VF;
  
  overflow-x: hidden;
   background-color: #FFD74D;
 }


 img{
    margin-left: 1vw;
    height: 5%;
    width: 5%;
    border-radius: 50%;
    @media (max-width: 920px) {
      height: 11%;
      width: 11%;
  }
}
p{
  font-size: 1vw;
  @media (max-width: 920px) {
    font-size:1vw;
    width: 20%;
  }

}

</style>