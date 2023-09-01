<template>
  <el-container class="all-container">
    <el-header class="header-container">
      <Login_nav></Login_nav>
    </el-header>
    <el-main>
      <div class="all-container">
        <div class="application-list-top">
          <div class="application-list-font">
            <span class="application-list-font-detail"> 考核列表 </span>
          </div>
          <div class="application-list-tags">
            <ListTags :tags="this.tags" @tag-selected="SlctTagId"> </ListTags>
          </div>
        </div>
        <div class="application-card-list">
          <Exam
            v-for="(cardData, cardIndex) in cardData"
            :key="cardIndex"
            :taskName="cardData.postsName"
            :position-name="cardData.postsName"
            :status="cardData.state"
            :id="cardData.posts"
          >
          </Exam>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
   
   <script>
import Login_nav from '@/components/Login_nav.vue'
import axios from 'axios'
import Interview_list_card from '@/components/Interview_list_card.vue'
import Exam from '@/components/Exam.vue'
import CHeader from '@/components/CHeader.vue'
import ListTags from '@/components/ListTags.vue'
export default {
  components: {
    Login_nav,
    axios,
    Interview_list_card,
    Exam,
    CHeader,
    ListTags,
  },
  data() {
    return {
      tags: ['全部', '待完成', '已完成', '已截止'],
      selectedTags: [true, false, false, false, false],
      baseUrl1: 'https://recruit.sends.cc/api/user/task/view',
      baseUrl2:'https://recruit.sends.cc/api/user/access/view',
      cardData: [],
      showData1:[],
      showData2:[],
      showData3:[],
      AllcardData:[],
      posts:[]
    }
  },
  methods: {
    SlctTagId(tag) {
      if (tag === '待完成') {
        this.cardData = this.showData1
        return
      } else if (tag === '已完成') {
        this.cardData = this.showData2
        return
      } else if (tag === '已截止') {
        this.cardData = this.showData3
        return
      } else {
        this.cardData = this.AllcardData
        return
      }
    },
  },
  async mounted() {
  try {
    let that = this;
    let data = {
      stage: -1,
    };

    let headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      token: localStorage.getItem('HQU_naxin'),
    };

    const response1 = await axios.post(this.baseUrl1, data, { headers });
    that.cardData = response1.data.data.task;
    that.AllcardData = that.cardData;
    for (let i = 0; i < that.cardData.length; i++) {
      if (that.cardData[i].state === undefined) {
        that.cardData[i].state = 0;
        that.showData1.push(this.cardData[i]);
        that.posts.push(this.cardData[i].posts);
      } else if (that.cardData[i].state === 1) {
        that.showData2.push(this.cardData[i]);
        that.posts.push(this.cardData[i].posts);
      } else if (that.cardData[i].state === 2) {
        that.showData3.push(this.cardData[i]);
        that.posts.push(this.cardData[i].posts);
      }
    }
  } catch (error) {
    console.error('Failed to fetch card data:', error);
  }
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
