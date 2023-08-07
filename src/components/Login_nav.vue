<template>
    <div class="header-container">
        <div class="header-navigator">
            <img src="../assets/sends_logo.png" alt="">
            <span>华侨大学网络创新实验室</span>
        </div>
        <div class="login-container">
            <el-button type="warning" class="un-login">登录</el-button>
        </div>
    </div>
</template>

<script>

</script>

<style scoped lang="less">

.header-container{
  height: 5%;
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
    height: 5%;
    width: 5%;
    border-radius: 50%;
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
    align-items: center;
    margin-right: 10px; /* 可以调整右侧距离 */
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


</style>