<template>
  <!-- Header区域 -->
  <el-container class="all-container">
    <el-header class="header-container">
      <Login_nav></Login_nav>
    </el-header>
    <el-main>
      <div class="application-list-top">
        <div class="application-list-font">
          <span class="application-list-font-detail"> 面试列表 </span>
        </div>
        <div class="application-list-tags">
            <ListTags :tags="this.tags" @tag-selected="SlctTagId"> </ListTags>
        </div>
      </div>
      <div class="application-card-list">
        <Interview_list_card
          v-for="(cardData,cardIndex) in cardData"
          :key="cardIndex"
          :id="cardData.posts"
          :position-name="cardData.postsName"
          :time="formattedDateTime(cardData.time.seconds)"
          :address="cardData.address"
          :status="cardData.state"
        >
        </Interview_list_card>
      </div>
    </el-main>
  </el-container>
</template>
   
   <script>
import Login_nav from '@/components/Login_nav.vue'
import axios from 'axios'
import Interview_list_card from '@/components/Interview_list_card.vue'
import ListTags from '@/components/ListTags.vue'
export default {
  components: { Login_nav, axios, Interview_list_card, ListTags },
  data() {
    return {
      tags: ['全部', '待面试', '面试结束'],
      selectedTags: [true, false, false],
      baseUrl: 'https://recruit.sends.cc/api/user/wait/view',
      cardData: {},
      showData1:[],
      showData2:[],
      AllcardData:[]
    }
  },
  methods: {
    SlctTagId(tag) {
      // console.log(tag)
      if (tag === '待面试') {
        this.cardData = this.showData1
        return
      } else if (tag === '面试结束') {
        this.cardData = this.showData2
        return
      } else {
        this.cardData = this.AllcardData
        return
      }
    },
    formattedDateTime(seconds) {
      const milliseconds = seconds * 1000; // 转换为毫秒
      const date = new Date(milliseconds);
      // 获取月、日、小时、分钟
      const month = date.getMonth() + 1; // 月份从0开始，所以要加1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      // 格式化日期时间
      const formattedDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      return `${formattedDate} ${formattedTime}`;
    }
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
        that.cardData = response.data.data.wait
        // console.log(response.data.data.wait)
        that.AllcardData = that.cardData
        for (let i = 0; i < that.cardData.length; i++) {
          if (that.cardData[i].state === undefined) {
            that.cardData[i].state = 0
            that.showData1.push(this.cardData[i])
          } else if (that.cardData[i].state === 1) {
            that.showData2.push(this.cardData[i])
          }
        }
        // console.log(that.AllcardData)
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
font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 4vh;
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

.active {
  background-color: #ffd74d;
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.application-card-list {
  margin-top: 8vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 769px) {
    margin-top: 3vh;
    } 

}

.el-card_body {
  padding: 13px;
}
</style>
