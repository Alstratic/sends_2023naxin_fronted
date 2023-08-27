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
            <ListTags
             :tags="this.tags"
             @tag-selected="SlctTagId">
            </ListTags>
          </div>
        </div>
        <div class="application-card-list">
          <Application_list_card
            :position-name="cardData.positionName"
            :status="cardData.Status"
            :tags="cardData.tags"
          >
          </Application_list_card>
          <Application_list_card
            :position-name="cardData.positionName"
            :status="cardData.Status"
            :tags="cardData.tags"
          >
          </Application_list_card>
          <Application_list_card
            :position-name="cardData.positionName"
            :status="cardData.Status"
            :tags="cardData.tags"
          >
          </Application_list_card>
        </div>
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
      baseUrl:'http://124.221.99.127:10810/user/applications/view',
      cardData: {},
      stage:-1,
    }
  },
  methods: {
    SlctTagId(tag)
    {
      console.log(tag)
    }
  },
  mounted() {
    let that = this
    let stage=Number(this.stage)
    let data={
      'stage':stage
    }

    let headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      token: localStorage.getItem('HQU_naxin'),
    }

    axios.post(this.baseUrl,data,{headers})
      .then((response) => {
        // 将从后端获取的数据填充到 cardData 对象中
        // that.cardData = response.data
        console.log(response)
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
  
