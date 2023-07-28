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
        <hot-position-card
        :position-name="cardData.positionName"
        :position-num="cardData.positionNum"
        :tags="cardData.tags"
        :logo="cardData.logo"
        :organization-name="cardData.organizationName"
        :organization-type="cardData.organizationType"
        />
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
import HotPositionCard from '@/components/HotPositionCard.vue';
import axios from 'axios';

export default {
  components:{
    VueSlickCarousel,
    HotPositionCard,
  },
  data() {
    return {
      input: '',
      cardData:{},
    }
  },

  mounted(){
    let that=this;
    axios.get('/api/cardData')
      .then(response => {
        // 将从后端获取的数据填充到 cardData 对象中
        console.log(response.data);
        that.cardData = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch card data:', error);
      });
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
