<template>
<el-container class="all-container">
  <!-- Headers区域 -->
  <el-header class="header-container">
    <div class="header-navigator">
      <img src="../../assets/sends_logo.png" alt="">
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
        <div v-for="(row, rowIndex) in groupedCards" :key="rowIndex" class="card-row" style="">
          <hot-position-card
          v-for="(data,index) in row"
          :key="index"
          :position-name="data.positionName"
          :position-num="data.positionNum"
          :tags="data.tags"
          :logo="data.logo"
          :organization-name="data.organizationName"
          :organization-type="data.organizationType"
          />
        </div>
      </div>
      <el-button type="warning" class="un-login" @click="goToPositionDetailsPage">更多</el-button>
    </div>
    <!-- 热门组织 -->
    <!-- <div class="hot-orgnazations">
      <div class="hot-position-font">
        <span>热门组织</span>
      </div>
    </div> -->
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
      cardDataList:[],
      windowWidth: window.innerWidth
    }
  },
  computed:{
    isMobile(){
      return this.windowWidth<=768
    },
    groupedCards(){
      const isMobile = this.isMobile; // 使用组件内部的 isMobile 属性
      const rowsToShow = 3; // 最多显示的行数
      const totalCards = this.cardDataList.length;
      const cardsPerRow = isMobile ? 1 : 3; // 根据设备决定每行显示的卡片数 PC端最多同时展示9个卡片 移动端最多同时展示3个卡片 因此每行展示的不一样

      const grouped = [];
      for (let i = 0; i < totalCards; i += cardsPerRow) {
        grouped.push(this.cardDataList.slice(i, i + cardsPerRow));
      }
      return grouped.slice(0, rowsToShow);
    }
  },
  methods:{
    goToPositionDetailsPage(){
      this.$router.push('/Position_detailes');
    },
  },


  mounted(){
    let that=this;
    const urls = [
      '/api/cardData/1', 
      '/api/cardData/2', 
      '/api/cardData/3', 
      '/api/cardData/5',
      '/api/cardData/6',
      '/api/cardData/7',
      '/api/cardData/8',
      '/api/cardData/9',
      '/api/cardData/10'
    ];
    for(let i =0;i<urls.length;i++)
    {
      axios.get(urls[i])
        .then(response => {
        // 将从后端获取的数据填充到 cardDataList 中
        that.cardDataList.push(response.data);
      })
        .catch(error => {
        console.error('Failed to fetch card data:', error);
      });
    }

    window.addEventListener('resize',()=>{
      this.windowWidth=window.innerWidth
    })
}
}
</script>

<style lang="less" scoped>

.all-container{
height: 100%;
background-color: #fff;
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

.hot-position-font{
  font-size: 48px;
  font-weight: 600;
  font-family: 'Source Han Serif CN VF';
  margin-bottom: 1rem;
}
.hot-positions{
  width: 100%;
  height: 110%;
  background-color: #fff;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 769px) {
    padding-top: 5vh;
    height: 120%;
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
  flex-wrap: wrap;
  padding-bottom: 2vh;
  @media (max-width: 769px) {
    flex-direction: column;
    padding-bottom: 5vh;
  }
}

.card-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin:0 2vw;
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
.hot-orgnazations{
  width: 100%;
  height: 110%;
  background-color: #fff;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 769px) {
    padding-top: 5vh;
    height: 120%;
  }
}
</style>
