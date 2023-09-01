<template>
  <div class="Orgnization_det">
    <CHeader></CHeader>
    <div class="Orgnization_Introduce">
      <div class="Intro">
          <div class="Orgnization">
            <!-- 先写死 -->
            <img src="../../assets/sends_logo.png" alt="" style="width:33px;height: 33px;margin-right: 4px;border-radius: 50%;">
            <div class="organizationel"> 
              <span class="organization-name">桑梓实验室</span>
              <br/>
              <span class="organization-type">校级组织 | 互联网</span>
            </div>
          </div>
          <div class="contact">
            <el-button type="warning" style="background-color: #FFD74D;">联系一下</el-button>
          </div> 
      </div>
    </div>  
    <div class="position-message">
        <span style="margin-left: 1vw;">组织信息</span>
        <!-- 先写死 -->
        <el-card class="message">
            招聘对象：大一全体同学
            <br/>
            职位任务:PRD文档编写，项目推进
            <br/>
            特殊说明
            <br/>
        </el-card>
        <!-- 推荐职位 -->
    <div class="recommend-positions">
      <div class="recommend-position-font">
        <span>发布职位</span>
      </div>
      <div class="recommend-position-cards"> 
        <!-- 先定死放两个 -->
        <positionCard
        :position-name="cardData.positionName"
        :position-num="cardData.positionNum"
        :tags="cardData.tags"
        :logo="cardData.logo"
        :organization-name="cardData.organizationName"
        :organization-type="cardData.organizationType"
        />
        <positionCard
        :position-name="cardData.positionName"
        :position-num="cardData.positionNum"
        :tags="cardData.tags"
        :logo="cardData.logo"
        :organization-name="cardData.organizationName"
        :organization-type="cardData.organizationType"
        />
      </div>
    </div>
  </div>
  </div>
</template>
  
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import positionCard from '../../components/positionCard.vue'
import CHeader from '../../components/CHeader.vue';
import axios from 'axios';
export default {
  components: { VueSlickCarousel,positionCard,CHeader },
  name:"Orgnization_details",
  data(){
  return{ 
    //从后端接收
    cardData:{},
  }
},
methods:{
},
mounted(){
  let that=this;
  axios.get('/api/cardData')
    .then(response => {
      // 将从后端获取的数据填充到 cardData 对象中
      // console.log(response.data);
      that.cardData = response.data;
      // console.log(response.data);
    })
    .catch(error => {
      console.error('Failed to fetch card data:', error);
    });
}
};
</script>
  
<style lang="less" scoped>
.Orgnization_det{
  height: 100%;
}
.Orgnization_Introduce{
margin-left: 10vw;
margin-right: 10vw;
padding-top: 7vh;
@media (max-width: 920px) {
  margin-left: 3vw;
  margin-right: 3vw;
}
}
.Intro{
display: flex;
justify-content: space-around;

}
.Orgnization{
display: flex;
#Title{
  font-family: Source Han Serif CN VF;
  font-size: 1.5rem;
  font-weight: 545;
  line-height: 0.5rem;
  letter-spacing: 0em;
}
}
.el-tag{
    margin-right: 1vw;
    margin-top:2vh;
    padding: auto;
    color:#6e6e6e;
    background-color: #e7e7e7;
    height: 18px;
    // width: 45px; 宽度不要指明，让文字撑开
    font-weight: 600;
    font-size: 0.5rem;
    line-height: 15px;
}
.contact{
font-family: Source Han Sans SC VF;
font-size: 2rem;
font-weight: 545;
}
.organization-name{
font-family: Source Han Sans SC VF;
font-size: 1.2rem;
font-weight: 550;
}
.organization-type{
font-size: 8px;
text-align: right;
color: #BBBBBB;
font-family: Source Han Sans SC VF;
font-weight: 600;

}
.el-button{
    font-size: 1px;
    line-height:2px ;
    height: 1rem;
    width:88px ;
    font-family: Source Han Sans SC VF;
    font-weight: 600; 
    color: black;
    border-radius: 10px;
    opacity: 0.8;
}
.position-message{
padding-top: 5vh;
padding-left: 25vw;
padding-right: 25vw;
font-family: Source Han Serif CN VF;
font-size: 16px;
font-weight: 500;
line-height: 34px;
color: #101010;
@media (max-width: 800px) {
  padding-left: 12vw;
padding-right: 10vw;
  }
;
}
.message{
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
.recommend-positions{
padding-top: 5vh;

}
.recommend-position-font{
display: flex;
justify-content: center;
align-items: center;
font-size: 25px;
font-weight: 500;
font-family: 'Source Han Serif CN VF';

}
.recommend-position-cards{
margin-top: 2vh;
display: flex;
flex-wrap: wrap;
justify-content: space-between;

}
</style>
  
