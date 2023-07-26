<template>
<el-container class="all-container">
  <!-- Headers区域 -->
  <el-header class="header-container">
    <div class="header-navigator">
      <img src="../assets/sends_logo.png" alt="">
      <span>华侨大学网络创新实验室</span>
    </div>
    <el-button type="warning" class="un-login">登录</el-button>

  </el-header>
  <!-- Main区域 -->

  <el-main>
    <!-- 搜索框 -->
    <div class="search-box">
      <!-- <el-input v-model="input" placeholder="请输入内容" class="search-input">
      </el-input> -->
      <input type="text" class="search-input" placeholder="请输入内容" v-model="input">
      <el-button type="warning" class="un-login" id="search-button">搜索</el-button>
      <div class="guess-you-like">
        <span class="guess-you-like-words">你可能想搜：</span>
          <el-tag type="info">青协</el-tag>
          <el-tag type="info">校团委</el-tag>
          <el-tag type="info">桑梓</el-tag>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="transforming-pics">
      <div class="tramsforming-container">
        <el-carousel trigger="click" height="20rem">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small"></h3>
        </el-carousel-item>
        </el-carousel>
      </div>

    </div>
    <!-- 热门职位 -->
    <div class="hot-positions">
      <div class="hot-position-font">
        <span>热门职位</span>
      </div>
      <div class="hot-position-cards">
        <el-card class="box-card">
          <div class="hot-position-details">
            <span class="hot-position-name">英语播音员</span>
            <span class="hot-position-num">2人</span>
          </div>
          <div class="hot-position-tags">
            <el-tag type="info">大一</el-tag>
            <el-tag type="info">播音</el-tag>
            <el-tag type="info">口才</el-tag>
          </div>
          <div class="organization-details">
            <div class="organization-details-name">
              <img src="../assets/logo.png" alt="" style="width:23px;height: 23px;border-radius: 50%;">
              <span class="organization-name">华侨大学广播台</span>
              <div class="null"></div>
              <span class="organization-type">校级组织|广播电台</span>
            </div>
          </div>
        </el-card>

        <el-card class="box-card">
          <div class="hot-position-details">
            <span class="hot-position-name">英语播音员</span>
            <span class="hot-position-num">2人</span>
          </div>
          <div class="hot-position-tags">
            <el-tag type="info">大一</el-tag>
            <el-tag type="info">播音</el-tag>
            <el-tag type="info">口才</el-tag>
          </div>
        </el-card>

        <el-card class="box-card">
          <div class="hot-position-details">
            <span class="hot-position-name">英语播音员</span>
            <span class="hot-position-num">2人</span>
          </div>
          <div class="hot-position-tags">
            <el-tag type="info">大一</el-tag>
            <el-tag type="info">播音</el-tag>
            <el-tag type="info">口才</el-tag>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 热门组织 -->
    <div class="hot-orgnazations">

    </div>
  </el-main>
</el-container>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'


export default {
  components:{
    VueSlickCarousel,
  },
  data() {
    return {
      input: '',

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
    font-size: 1.3rem;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: relative;
  height: 30%;
  .search-input{
    width: 75%;
    padding: 8px 12px;
    border: 1px solid #fff;
    font-size: 18px;
    color: #909090;
    outline: none; /* 去除输入框点击时的外边框 */
    background-color: #FFF;
    border-radius: 15px;
    border: 1px solid #ffd74d;
    box-sizing: border-box;
    display: inline-block;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    margin-bottom: 1%;
  }

  #search-button{
    position: absolute;
    right: 15%;
    top: 48%;
    transform: translateY(-100%);
    cursor: pointer;
    outline: none; /* 去除按钮点击时的外边框 */
  }

  .guess-you-like{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .guess-you-like-words{
      font-size:12px;
      color:#3E3E3E
      
    }
    .el-tag{
      margin-right: 2%;
      padding: 0 1%;
      color:#3e3e3e;
      background-color: #e7e7e7;
    }
  }
}


.transforming-pics{
  width: 100%;
  height: 50%;

  background-color: #fff;

  .transforming-container{
    width: 80%;
    display: flex;
    justify-content: center;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item{
    width:80%;
    left:10%;
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
}

.hot-positions{
  width: 100%;
  height: 60%;
  background-color: #fff;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  .hot-position-font{
    font-size: 48px;
    font-weight: 600;
    font-family: 'Source Han Serif CN VF';
    margin-bottom: 1rem;
  }
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 16rem;
    height: 10rem;
    border: #ffd74d 1.5px solid;
    border-radius: 15px;
    margin-left: 1.5vw;
    margin-right: 1.5vw;
    @media (max-width: 769px) {
      margin-right: 0;
    }
    .organization-details{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top:5vh;
      .organization-details-name{
        font-size: 6px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .null{
        padding: 0 4px;
      }
      .organization-name{
        text-align: left;
      }
      .organization-type{
        font-size: 6px;
        text-align: right;
      }
    }
  }
  .hot-position-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; /* 添加一些间距，根据需求调整 */
  }
  .hot-position-cards {
  display: flex; /* 使用Flex布局，使el-card在同一行内显示 */
  justify-content: space-between;
  @media (max-width: 769px) {
    flex-direction: column;
  }
}
  .el-tag{
      margin-right: 1vw;
      padding: 0 1%;
      color:#6e6e6e;
      background-color: #e7e7e7;
      height: 2rem;
      width: 2rem;
      font-weight: 600;

    }
}
</style>
