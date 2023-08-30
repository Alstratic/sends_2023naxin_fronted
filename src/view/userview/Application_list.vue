<!-- 申请 -->
<template>
  <el-container class="all-container">
    <el-header class="header-container">
      <Login_nav></Login_nav>
    </el-header>
    <el-main>
      <div class="all-container">
        <div class="application-list-top">
          <div class="application-list-font">
            <span class="application-list-font-detail"> 申请列表 </span>
          </div>
          <div class="application-list-tags">
            <ListTags :tags="this.tags" @tag-selected="SlctTagId"> </ListTags>
          </div>
        </div>
        <div class="application-card-list" v-if="!isEmpty">
          <Application_list_card
            v-for="(cardData, cardIndex) in cardData"
            :key="cardIndex"
            :position-name="cardData.postsName"
            :status="cardData.State"
          >
          </Application_list_card>
        </div>
        <el-empty description="描述文字" v-else></el-empty>
      </div>
    </el-main>
  </el-container>
</template>
  
  <script>
import Login_nav from '@/components/Login_nav.vue'
import axios from 'axios'
import Application_list_card from '@/components/Application_list_card.vue'
import CHeader from '@/components/CHeader.vue'
import ListTags from '@/components/ListTags.vue'
export default {
  components: {
    Login_nav,
    axios,
    Application_list_card,
    CHeader,
    ListTags,
  },
  data() {
    return {
      tags: ['全部', '查看阶段', '面试阶段', '考核阶段', '完成阶段'],
      selectedTags: [true, false, false, false, false],
<<<<<<< HEAD
      baseUrl: 'http://124.221.99.127:10810/user/applications/view',
=======
      baseUrl: 'https://recruit.sends.cc/api/user/applications/view',
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
      cardData: [],
      showData1: [],
      showData2: [],
      showData3: [],
      showData4: [],
      AllcardData: [],
      isEmpty: false,
    }
  },
  methods: {
    SlctTagId(tag) {
      console.log(tag)
      if (tag === '查看阶段') {
        this.cardData = this.showData1
        return
      } else if (tag === '面试阶段') {
        this.cardData = this.showData2
        return
      } else if (tag === '考核阶段') {
        this.cardData = this.showData3
        return
      } else if (tag === '完成阶段') {
        this.cardData = this.showData4
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
    let data = {
      stage: -1,
    }

    let headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      token: localStorage.getItem('HQU_naxin'),
    }

    axios
      .post(this.baseUrl, data, { headers })
      .then((response) => {
        // 将从后端获取的数据填充到 cardData 对象中
        that.cardData = response.data.data.applications
        that.AllcardData = that.cardData
        for (let i = 0; i < that.cardData.length; i++) {
          if (that.cardData[i].State === undefined) {
            that.cardData[i].State = 0
            that.AllcardData = that.cardData
            that.showData1.push(this.cardData[i])
          } else if (that.cardData[i].State === 1) {
            that.showData1.push(this.cardData[i])
          } else if (that.cardData[i].State === 3) {
            that.showData2.push(this.cardData[i])
          } else if (
            that.cardData[i].State === 4 ||
            that.cardData[i].State === 5 ||
            that.cardData[i].State === 6
          ) {
            that.showData3.push(this.cardData[i])
          } else if (
            that.cardData[i].State === 2 ||
            that.cardData[i].State === 7 ||
            that.cardData[i].State === 8
          ) {
            that.showData4.push(this.cardData[i])
          }
        }
        console.log(that.AllcardData)
      })
      .catch((error) => {
        console.error('Failed to fetch card data:', error)
      })
  },
}
</script>
  
  <style scoped lang="less">
.all-container {
  height: 100%;
  background-color: #fff;
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
}

.application-card-list {
  margin-top: 30px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.el-card_body {
  padding: 13px;
}
</style>
  
