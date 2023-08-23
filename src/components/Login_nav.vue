<template>
    <div class="header-container" v-if="!isLoggedIn">
        <div class="header-navigator">
            <img src="../assets/sends_logo.png" alt="">
            <span class="header-organ">华侨大学网络创新实验室</span>
            <!-- <span>{{ data1 }}</span> -->
        </div>
        <div class="login-container2">
            <el-button type="warning" class="un-login" @click="login">登录</el-button>
        </div>
    </div>
    <div class="header-container" v-else>
        <div class="header-navigator">
            <img src="../assets/sends_logo.png" alt="">
            <span>华侨大学网络创新实验室</span>
            <!-- <span>{{ data1 }}</span> -->
        </div>
        <div class="login-container">
            <div class="login-options" @click="goToExam">
                <span>考核</span>
            </div>
            <div class="login-options" @click="goToInterview">
                <span>面试</span>
            </div>
            <div class="login-options" @click="goToApplication">
                <span>申请</span>
            </div>
            <div class="login-options" @click="goToCollection">
                <span>收藏</span>
            </div>
            <!-- <img src="../assets/sends_logo.png" alt=""> -->
        </div>
    </div>
</template>

<script>
import {setUserToken, getUserToken, isUserLogin, wxRedirect, isInWechat, getWechatCode} from '@/request/wx_auth'
import axios from 'axios';
export default{
    data(){
        return{
            data1:String,
            isLoggedIn:false
        }
    },
    mounted(){
        // localStorage.removeItem('HQU_naxin'); // token名称为HQU_naxin
        if(isUserLogin()){
            // alert(getUserToken());
            this.data1=getUserToken();
            this.isLoggedIn=true;
        }
    },
    methods:{
        async login() {
            try {
                if (!isInWechat()) { // 如果不是在微信页面中，执行微信授权重定向
                    wxRedirect(); 
                    return;
                }

                const code=getWechatCode();
                if (!code) { // 如果在url中没有code
                    wxRedirect();
                    alert(code);
                    return;
                }
                this.checkCode(code);
            }
            catch (error) {
                console.error('登录失败', error);
            }
        },
        async checkCode(code) {
            try {
                const response = await axios.post('http://124.221.99.127:10810/user/login', { code });
                // alert(response.data.code,response.data.data,response.data.msg);
                const token = response.data.data;
                // 保存 'token' 到本地存储
                setUserToken(token);
                alert(getUserToken());
                // 更新登录状态
                this.isLoggedIn = true;
                // 跳转到指定页面，例如 '/Homepage'
                this.$router.replace('/user/homepage');
            }
            catch (error) {
                alert(error);
            }
        },
        goToExam(){
            this.$router.push('/user/Examine_page')
        },
        goToInterview(){
            this.$router.push('/user/interview')
        },
        goToApplication(){
            this.$router.push('/user/Applications')
        },
        goToCollection(){
            this.$router.push('/user/Collection_list')
        }

    }
}
</script>

<style scoped lang="less">

.header-container{
  height: 100%;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
}

.header-navigator{
  display: flex;
  align-items: center;
  padding: 5px;
  flex: 1; /* 占据剩余空间 */

}

.header-navigator img{
    height: 3%;
    width: 4%;
    border-radius: 50%;
    @media (max-width: 769px) {
        height: 48%;
        width: 20%;;
    }
}

.header-navigator span{
    font-family: 'Source Han Sans SC VF', sans-serif;
    padding-left:8px;
    display: inline-block;
    line-height: 100%;
    font-size: 1.3rem;
}

.login-container{
    @media (max-width: 769px) {
        margin-right: 0;
    }
    display: flex;
    height: 100%;
    align-items: center;
    margin-right: 10px; /* 可以调整右侧距离 */
    width: 40%;
    justify-content: space-between;
}

.login-container2{
    @media (max-width: 769px) {
        margin-right: 0;
    }
    display: flex;
    height: 100%;
    align-items: center;
    margin-right: 10px; /* 可以调整右侧距离 */
    width: 15%;
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

.login-container img{
    height: 46%;
    width: 7%;
    border-radius: 50%;
    @media (max-width: 769px) {
        height: 58%;
        width: 14%;
    }
}

.login-options{
    font-size: 16px;
}
.header-organ{
    font-size: 20px;
}
</style>