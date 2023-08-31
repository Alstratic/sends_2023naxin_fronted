<template>
  <el-container class="all-container">
    <el-header class="header-container">
      <Login_nav></Login_nav>
    </el-header>

    <el-main>
      <div class="main-section">
        <div class="application-list-top">
          <div class="application-list-font">
            <span class="application-list-font-detail"> 收藏列表 </span>
          </div>
          <div class="application-list-tags">
            <ListTags :tags="this.tags" @tag-selected="SlctTagId"> </ListTags>
          </div>
        </div>

        <div class="recommend-position-cards">
          <div class="recomment-position-card-detail">
            <collectionCard
              v-for="(cardData, cardIndex) in groupedCardData"
              :id="cardData.id"
              :key="cardIndex"
              :position-name="cardData.Name"
              :position-num="cardData.Nums"
              :tags="mergeTags(cardData)"
              :logo="cardData.OrganizationPath"
              :organization-name="cardData.OrganizationName"
              :organization-type="cardData.OrganizationCategory"
              :OrganizationClassify="cardData.OrganizationClassify"
            />
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Login_nav from '@/components/Login_nav.vue'
import axios from 'axios'
import positionCard from '../../components/positionCard.vue'
import collectionCard from '@/components/collectionCard.vue'
import { getUserToken } from '../../request/wx_auth.js'
import ListTags from '@/components/ListTags.vue'

export default {
  components: { Login_nav, axios, positionCard, collectionCard,ListTags},
  data() {
    return {
      tags: ['全部', '进行中', '已结束'],
      selectedTags: [true, false, false, false, false],
      baseUrl: 'https://recruit.sends.cc/api/square/posts/',
      cardData: [],
      showData1: [],
      showData2: [],
      AllcardData: [],
      token: String,
    }
  },
  methods: {
    SlctTagId(tag) {
      if (tag === '进行中') {
        this.cardData = this.showData1
        return
      } else if (tag === '已结束') {
        this.cardData = this.showData2
        return
      } else {
        this.cardData = this.AllcardData
        return
      }
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
    this.token = getUserToken()
    let headers = {
      token: this.token,
    }
    let params = {
      state: null,
    }

    axios
      .get('https://recruit.sends.cc/api/square/posts/favorite', {
        headers,
        params,
      })
      .then((response) => {
        // 将从后端获取的数据填充到 cardData 对象中
        that.cardData = response.data.data.posts
        that.AllcardData = that.cardData
        console.log(that.cardData)
      })
      .catch((error) => {
        console.error('Failed to fetch card data:', error)
      })
    params.state=0
    axios
      .get('https://recruit.sends.cc/api/square/posts/favorite?state=0', {
        headers,
        params,
      })
      .then((response) => {
        // 将从后端获取的数据填充到 cardData 对象中
        that.showData1 = response.data.data.posts
        console.log(that.showData1)
      })
      .catch((error) => {
        console.error('Failed to fetch card data:', error)
      })
      params.state=1
    axios
      .get('https://recruit.sends.cc/api/square/posts/favorite?state=1', {
        headers,
        params,
      })
      .then((response) => {
        // 将从后端获取的数据填充到 cardData 对象中
        that.showData2 = response.data.data.posts
        console.log(that.showData2)
      })
      .catch((error) => {
        console.error('Failed to fetch card data:', error)
      })

  },
  computed: {
    groupedCardData() {
      let grouped = []
      if(!this.cardData){
        return
      }
      for (let i = 0; i < this.cardData.length; i++) {
        const group = this.cardData[i]
        // if(this.cardData[i].id==this.id){
        // continue;
        // }
        grouped.push(group)
      }
      return grouped
    },
  },
}
</script>

<style lang="less" scoped>
.main-section {
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.all-container {
  height: 100%;
}
.application-list-top {
  margin-top: 15px;
  display: flex;
  width: 100%;
  background-color: #fff;
  margin-left: 25vw;
  height: 10%;
  flex-wrap: wrap;
  flex-direction: row;
  @media (max-width: 920px) {
    margin-left: 6vw;
  }
}

.application-list-font {
  flex-basis: 100%; /* 将宽度设置为100%，使其占据整行 */
  font-size: 25px;
  font-weight: 500;
  padding-bottom: 30px;
}
.application-list-tags {
  display: flex;
  justify-content: space-between;
}

.application-list-tag {
  text-align: center;
  border-radius: 15%;
  margin-top: 10px;
  background-color: #fff;
  margin-right: 4px;
  border: #ffd74d 2px solid;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 2px;
  @media (max-width: 769px) {
    margin-left: 8px;
    padding: 0 2px;
  }
}
.recommend-position-cards {
  margin-top: 2vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 50%;
  @media (max-width: 769px) {
    width: 80%;
  }
}
.recomment-position-card-detail {
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
}
.active {
  background-color: #ffd74d;
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
