<template>
<el-container class="all-container">
  <!-- Headers区域 -->
  <el-header class="header-container">
    <div class="header-navigator">
      <img src="../assets/sends_logo.png" alt="">
      <span>华侨大学网络创新实验室(现在缺乏这个字体的类型)</span>
    </div>
    <el-button type="warning" class="un-login">登录</el-button>

  </el-header>
  <!-- Main区域 -->

  <el-main>
    <!-- 搜索框 -->
    <div class="search-box">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
    <!-- 轮播图 -->
    <div class="transforming-pics">
      
    </div>
    <!-- 热门职位 -->
    <div class="hot-positions">
      
    </div>
    <!-- 热门组织 -->
    <div class="hot-orgnazations">

    </div>
  </el-main>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style lang="less" scoped>

.all-container{
height: 100%;
background-color: #373d41;
}
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
  img{
    height: 5%;
    width: 5%;
    border-radius: 50%;
  }
  span{
    font-family: 'Source Han Sans SC VF', sans-serif;
    padding-left:8px;
    display: inline-block;
    line-height: 100%;
    font-size: 24px;
  }
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

.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFD74D;
}
</style>
