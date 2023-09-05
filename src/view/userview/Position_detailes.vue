<template>
  <el-container class="all-container">
    <el-header class="header-container">
      <Login_nav></Login_nav>
    </el-header>

    <el-main>
      <div class="Position_det">
        <div class="Position_Introduce">
          <div class="Intro">
            <div class="position-name">
              <!-- 先写死 -->
              <span id="Title">{{ this.cardData1.Name }}</span>
              <div class="hot-position-tags">
                <el-tag type="info" v-for="(tag, index) in tagArray" :key="index">{{ tag }}</el-tag>
              </div>
            </div>
            <div class="position-num">{{this.cardData1.Nums}}人</div>
          </div>
          <div class="collect-position">
            <!-- <i class="el-icon-star-off"></i> -->
            <div style="width: 75%; height: 23px"></div>
            <i
              :class="isCollect ? 'el-icon-star-on' : 'el-icon-star-off'"
              @click="ChooseCollect"
            ></i>
            <span style="font-size: 14px;">收藏职位</span>
          </div>
          <div class="operation">
            <div class="organization-details">
              <div class="organization-details-name">
                <img
                  src="../../assets/sends_logo.png"
                  alt=""
                  style="width: 26px; height: 26px; border-radius: 50%"
                />
                <span class="organization-name">{{this.cardData1.OrganizationName}}</span>
                <div class="null"></div>
                <span class="organization-type">{{this.cardData1.OrganizationCategory}}|{{this.cardData1.OrganizationClassify}}</span>
              </div>
            </div>
            <div class="position-operation">
              <el-button @click="Talk" type="warning" style="background-color: #ffd74d;"
                >联系一下</el-button>
              <el-button type="warning" plain @click="GoApplications"
                >申请面试</el-button
              >
            </div>
          </div>
          <div class="position-message">
            <span style="margin-left: 1vw">职位信息</span>
            <!-- 先写死 -->
            <el-card class="message">
              招聘对象：{{this.cardData1.Object}}
              <br />
              职位任务：{{ this.cardData1.Task }}
              <br />
              特别说明：{{ this.cardData1.Illustrate }}
              <br />
            </el-card>
            <!-- 推荐职位 -->
            <div class="recommend-positions">
              <div class="recommend-position-font">
                <span>推荐职位</span>
              </div>
              <div class="recommend-position-cards">
                <!-- 先定死放两个 -->
                <positionCard
                  v-for="(cardData,cardIndex) in groupedCardData"
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
        </div>
      </div>
    </el-main>
  </el-container>
</template>
  
<script>
import positionCard from '../../components/positionCard.vue'
import Login_nav from '../../components/Login_nav.vue'
import axios from 'axios'
import {getUserToken} from '../../request/wx_auth.js'
import Qs from 'qs'

export default {
  components: { positionCard, Login_nav },
  name: 'Position_detailes',
  data() {
    return {
      id:Number,
      isCollect: false,
      token:String,
      cardData: [],
      cardData1:{},
      tagsData:{},
      collectData:{},
      baseUrl:'https://recruit.sends.cc/api/square/posts/',
      baseUrl2:'https://recruit.sends.cc/api/square/organizations/posts/1',
      baseUrl3:'https://recruit.sends.cc/api/square/posts/favorite/'
    }
  },
  methods: {
    Talk(){
      window.open('http://wpa.qq.com/msgrd?v=3&uin=384637134&site=qq&menu=yes')
    },
    GoApplications() {
      // console.log(this.id);
      this.$router.push({name:'Applications',params:{id:this.id,positionName:this.cardData1.Name}})
    },
    ChooseCollect() {
      //补充：给后端发
      let data={
        'postID':this.id
      }
      let headers={
        'accept':'application/json',
        'token':this.token,
      }
      let that=this
      let queryString=this.baseUrl3+this.id;

      if(this.isCollect===false)
      {
        axios.post(queryString, data,{headers}).then((response) => {
          // 将从后端获取的数据填充到 cardData 对象中
          that.collectData = response.data
          // console.log(that.collectData)
        })
        .catch((error) => {
          console.error('Failed to fetch card data:', error)
        })
        this.isCollect = !this.isCollect
      }

      else if(this.isCollect===true){
        data=Qs.stringify(data)
        axios.delete(queryString,{headers}).then((response) => {
          // 将从后端获取的数据填充到 cardData 对象中
          that.collectData = response.data
          // console.log(that.collectData)
        })
        .catch((error) => {
          console.error('Failed to fetch card data:', error)
        })
        this.isCollect = !this.isCollect
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
  created() {
    let that = this
    this.token = getUserToken()
    let headers = {
      token: this.token,
    }
    let params = {
      state: null,
    }
    console.log(this.$route.params.id)
    axios
      .get('https://recruit.sends.cc/api/square/posts/favorite', {
        headers,
        params,
      })
      .then((response) => {
        if(response.data.msg==='success'){
          const res=response.data.data.posts
          const IsT = res.some(obj => obj.id === this.$route.params.id);
          this.isCollect=IsT
        }
        // 将从后端获取的数据填充到 cardData 对象中
      })
  },
  mounted() {
    let that = this
    this.id=this.$route.params.id
    this.token=getUserToken()
    let queryString1=this.baseUrl+this.id

    axios
      .get(queryString1)
      .then((response) => {
        // 将从后端获取的数据填充到 cardData 对象中
        that.cardData1 = response.data.data.post
        // console.log(that.cardData1)
      })
      .catch((error) => {
        console.error('Failed to fetch card data:', error)
      })

    axios
      .get('https://recruit.sends.cc/api/square/organizations/posts/1')
      .then((response) => {
        // 将从后端获取的数据填充到 cardData 对象中
        that.cardData = response.data.data
        // console.log(that.cardData)
      })
      .catch((error) => {
        console.error('Failed to fetch card data:', error)
      })

    
  },
  computed:{
    tagArray(){
      return [this.cardData1.Classify, this.cardData1.Experience, this.cardData1.Object];
    },
    groupedCardData(){
      let grouped=[]
      for (let i = 0; i < this.cardData.length; i ++) {
        const group = this.cardData[i]
        if(this.cardData[i].id==this.id){
          continue;
        }
        grouped.push(group)
      }
      // console.log(grouped)
      return grouped
    }
  }
}
</script>
  
<style lang="less" scoped>
.all-container {
  background-color: #fff;
}
.Position_det {
  height: 100%;
  // @media (max-width: 769px) {
  //     background-color: blue;
  // }
}
.Position_Introduce {
  margin-left: 15vw;
  margin-right: 15vw;
  padding-top: 7vh;
  @media (max-width: 920px) {
    margin-left: 3vw;
    margin-right: 3vw;
  }
}
.Intro {
  display: flex;
  justify-content: space-around;
}
.position-name {
  #Title {
    font-family: Source Han Serif CN VF;
    font-size: 1.5rem;
    font-weight: 545;
    line-height: 0.5rem;
    letter-spacing: 0em;
  }
}
.el-tag {
  margin-right: 1vw;
  margin-top: 2vh;
  padding: auto;
  color: #6e6e6e;
  background-color: #e7e7e7;
  height: 18px;
  // width: 45px; 宽度不要指明，让文字撑开
  font-weight: 600;
  font-size: 1rem;
  line-height: 15px;
}
.position-num {
  font-family: Source Han Sans SC VF;
  font-size: 25px;
  width: 15%;
  font-weight: 545;
}
.organization-details-name {
  font-size: 6px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.collect-position {
  display: flex;
  font-family: Source Han Sans SC VF;
  // padding-top: 3vh;
  // margin-left: 48vw;
  font-size: 0.5rem;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #6e6e6e;
  .el-icon-star-on,
  .el-icon-star-off {
    padding-top: 0.1vh;
    margin-right: 1px;
    font-size: 18px;
    color: #ffd74d;
    opacity: 70%;
  }
}

.custom-button{
  color: black;
}
.organization-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3vh;
  .organization-details-name {
    font-size: 6px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .null {
    padding: 0 4px;
  }
  .organization-name {
    padding-left: 3px;
    text-align: left;
    font-size: 15px;
  }
  .organization-type {
    font-size: 12px;
    text-align: right;
    color: #bbbbbb;
    @media (max-width: 769px) {
      display: block;
      display: none;
    }
  }
}
.operation {
  display: flex;
  margin-left: 3vw;
  justify-content: space-around;
}
.el-button {
    
    font-size: 12px;
    line-height: 2px;
    height: 1.5rem;
    margin-top: 3vh;
    font-weight: 600;
    color: black;
    border-radius: 10px;
    opacity: 0.8;
  }
.position-message {
  padding-top: 5vh;
  padding-left: 10vw;
  padding-right: 8vw;
  font-family: Source Han Serif CN VF;
  font-size: 16px;
  font-weight: 500;
  line-height: 34px;
  color: #101010;
}
.message {
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  margin-right: 8vw;
  border-width: 1px;
  font-size: 0.7rem;
  width: 100%;
  // @media (max-width: 769px) {
  //   margin-right: 0;
  // }
}
.recommend-positions {
  padding-top: 5vh;
}
.recommend-position-font {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 25px;
  font-weight: 500;
  font-family: 'Source Han Serif CN VF';
}
.recommend-position-cards {
  margin-top: 2vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
  
