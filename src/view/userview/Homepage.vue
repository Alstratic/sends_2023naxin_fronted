<template>
  <el-container class="all-container">
    <!-- Headers区域 -->
    <el-header class="header-container">
      <Login_nav></Login_nav>
    </el-header>
    <!-- Main区域 -->
    <el-main>
      <!-- 搜索框 -->
      <!-- 轮播图 -->
      <div class="transforming-pics">
        <div class="tramsforming-container">
          <el-carousel trigger="click" class="carousel">
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
          <div
            v-for="(row, rowIndex) in groupedCards"
            :key="rowIndex"
            class="card-row"
            style=""
          >
            <hot-position-card
              v-for="(data, index) in row"
              :key="index"
              :position-name="data.Name"
              :position-num="data.Nums"
              :tags="mergeTags(data)"
              :logo="data.OrganizationPath"
              :organization-name="data.OrganizationName"
              :OrganizationCategory="data.OrganizationCategory"
              :organizationClassify="data.OrganizationClassify"
              :id="data.id"
            />
          </div>
        </div>
        <el-button
          type="warning"
          class="un-login"
          @click="goToPositionDetailsPage"
          >更多</el-button
        >
      </div>
    </el-main>
  </el-container>
</template>
  
  <script>
import VueSlickCarousel from 'vue-slick-carousel'
import HotPositionCard from '@/components/HotPositionCard.vue'
import axios from 'axios'
import Login_nav from '@/components/Login_nav.vue'

export default {
  components: {
    VueSlickCarousel,
    HotPositionCard,
    Login_nav,
  },
  data() {
    return {
      input: '',
      cardData: {},
      cardDataList: [],
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    isMobile() {
      return this.windowWidth <= 768
    },
    groupedCards() {
      const isMobile = this.isMobile // 使用组件内部的 isMobile 属性
      const rowsToShow =isMobile ? 2 : 3// 最多显示的行数
      const totalCards = this.cardDataList.length
      const cardsPerRow = isMobile ? 1 : 3 // 根据设备决定每行显示的卡片数 PC端最多同时展示9个卡片 移动端最多同时展示3个卡片 因此每行展示的不一样

      const grouped = []
      for (let i = 0; i < totalCards; i += cardsPerRow) {
        grouped.push(this.cardDataList.slice(i, i + cardsPerRow))
      }
      return grouped.slice(0, rowsToShow)
    },
  },
  methods: {
    goToPositionDetailsPage() {
      this.$router.push('/user/All_positions')
    },
    mergeTags(cardData) {
      const mergedTags = []
      if (cardData.Classify) {
        mergedTags.push(cardData.Classify)
      }
      if (cardData.Experience) {
        mergedTags.push(cardData.Experience)
      }
      if (cardData.Object) {
        mergedTags.push(cardData.Object)
      }
      return mergedTags
    },
  },

  mounted() {
    let that = this
    let baseUrl = 'https://recruit.sends.cc/api/square/posts/host?number=9'
    axios.get(baseUrl).then((response) => {
      // console.log(response.data.data.posts)
      this.cardDataList = response.data.data.posts
    })

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
}
</script>
  
 <style lang="less" scoped>
.all-container {
  height: 100%;
  background-color: #fff;
}

.carousel{
  height:20rem;
  @media (max-width: 769px) {
    height: 12rem;
  }
}

.un-login {
  color: black;
  background-color: #ffd74d;
  font-family: 'Source Han Sans SC VF', sans-serif;
  font-size: 1rem;
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
  .search-input {
    width: 75%;
    padding: 8px 12px;
    border: 1px solid #fff;
    font-size: 18px;
    color: #909090;
    outline: none; /* 去除输入框点击时的外边框 */
    background-color: #fff;
    border-radius: 15px;
    border: 1px solid #ffd74d;
    box-sizing: border-box;
    display: inline-block;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-bottom: 1%;
  }

  #search-button {
    position: absolute;
    right: 15%;
    top: 48%;
    transform: translateY(-100%);
    cursor: pointer;
    outline: none; /* 去除按钮点击时的外边框 */
  }

  .guess-you-like {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .guess-you-like-words {
      font-size: 12px;
      color: #3e3e3e;
    }
    .el-tag {
      margin-right: 2%;
      padding: 0 1%;
      color: #3e3e3e;
      background-color: #e7e7e7;
    }
  }
}

.transforming-pics {
  width: 100%;
  height: 25%;
  margin-bottom: 2.5rem;
  background-color: #fff;
  @media (max-width: 769px) {
    margin-bottom: 0px;
  }
  .transforming-container {
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

  .el-carousel__item {
    width: 80%;
    left: 10%;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}

.hot-position-font {
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Source Han Serif CN VF';
  margin-bottom: 1rem;
  @media (max-width: 769px) {
    font-size: 35px;
  }
}
.hot-positions {
  width: 100%;
  height: 80%;
  padding-top: 10vh;
  background-color: #fff;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 769px) {
    padding-top: 12vh;
    height: 80%;
  }

  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }

  .hot-position-cards {
    display: flex; /* 使用Flex布局，使el-card在同一行内显示 */
    justify-content: center;
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
    margin: 2vh 2vw;
  }
  .el-tag {
    margin-right: 1vw;
    padding: 0 1%;
    color: #6e6e6e;
    background-color: #e7e7e7;
    height: 2rem;
    width: 2rem;
    font-weight: 600;
  }
}
.hot-orgnazations {
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
