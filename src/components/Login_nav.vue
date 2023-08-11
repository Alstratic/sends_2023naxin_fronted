<template>
    <div class="header-container" v-if="isLoggedIn">
        <div class="header-navigator">
            <img src="../assets/sends_logo.png" alt="">
            <span>华侨大学网络创新实验室</span>
        </div>
        <div class="login-container">
            <el-button type="warning" class="un-login">登录</el-button>
        </div>
    </div>
    <div class="header-container" v-else>
        <div class="header-navigator">
            <img src="../assets/sends_logo.png" alt="">
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
            <img src="../assets/sends_logo.png" alt="">
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            isLoggedIn:false
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
</style>