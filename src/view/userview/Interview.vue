<template>
  <!-- 面试详情 -->
  <div class="Position_det">
    <CHeader></CHeader>
  <div class="Position_Introduce">
    <div class="Intro">
            <div class="position-name">
              <!-- 先写死 -->
                <span id="Title">产品经理</span>
                <div class="hot-position-tags">
                  <el-tag type="info">大一</el-tag>
                  <el-tag type="info">播音</el-tag>
                  <el-tag type="info">口才</el-tag>
                  <el-tag type="info">无需经验</el-tag>
                </div>
            </div>
            <div class="statu">面试结束</div> 
    </div> 
    <div class="operation">
        <div class="organization-details">
              <div class="organization-details-name">
                <img src="../../assets/sends_logo.png" alt="" style="width:26px;height: 26px;border-radius: 50%;">
                <span class="organization-name">桑梓实验室</span>
                <div class="null"></div>
                <span class="organization-type">校级组织|互联网</span>
              </div>
        </div>
       <div class="position-operation">
           <el-button type="warning" style="background-color: #FFD74D;" @click="talkTime">联系一下</el-button>
       </div>
    </div>
    <div class="position-message">
          <span style="margin-left: 1vw;">面试信息</span>
          <!-- 先写死 -->
          <el-card class="message">
              招聘对象：大一全体同学
              <br/>
              职位任务:PRD文档编写，项目推进
              <br/>
              特殊说明
              <br/>
          </el-card>
          <br/>
          <!-- 具体根据返回情况决定是否显示 -->
          <span style="margin-left: 1vw;" v-show="Isdisplay">面试结果</span>
          <!-- 先写死 -->
          <el-card class="message" v-show="Isdisplay">
              招聘对象：大一全体同学
              <br/>
              职位任务:PRD文档编写，项目推进
              <br/>
              特殊说明
              <br/>
          </el-card>
          <div class="butn">
            <el-button type="warning" @click="abandonView" style="padding-left: 38px;padding-right: 38px;opacity: 0.8;color: black;line-height:50%" plain>放弃面试</el-button>
            <el-button type="warning" @click="talkTime" style="padding-left: 38px;padding-right: 38px; background-color: #FFD74D;opacity: 0.8;color: black;line-height:50% ;">协调时间</el-button>
          </div>
    </div>
  </div>
  
</div>
</template>
  
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import positionCard from '../../components/positionCard.vue';
import CHeader from '../../components/CHeader.vue';
import axios from 'axios';
export default {
  components: { VueSlickCarousel,positionCard,CHeader },
  name:'Position_detailes',
  data(){
    return{ 
      //从后端接收
      Isdisplay:true,
      isCollect:false, 
      cardData:{},
    }
  },
  methods:{
    //放弃面试
    abandonView(){
      this.$confirm('您是否放弃面试?', '提示', {
        showClose:false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '您已放弃面试!'
          });
          this.$router.replace('/Homepage')
        }).catch(() => {
         
        });
    },
    //协调时间
    talkTime(){
      window.open("https://uutool.cn/qq-chat/")
    },

    ChooseCollect(){
        //补充：给后端发
        this.isCollect=!this.isCollect
    },

  },
  created:{
      //补充：从后端获得isCollect的状态
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
.Position_det{
  height: 100%;
  // @media (max-width: 769px) {
  //     background-color: blue;
  // }
}
.statu{
  font-family: Source Han Sans SC VF;
  font-size: 1.6rem;
  font-weight: 545;
  color: #D0B65C;
  @media (max-width: 920px) {
      font-size: 1.4rem;
  }

}
.Position_Introduce{
  margin-left: 15vw;
  margin-right: 15vw;
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
.position-name{
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
.position-num{
  font-family: Source Han Sans SC VF;
  font-size: 2rem;
  font-weight: 545;
}
.organization-details-name{
        font-size: 6px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
}
.collect-position{
  display: flex;
  font-family: Source Han Sans SC VF;
  // padding-top: 3vh;
  // margin-left: 48vw;
  font-size: 0.5rem;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color:#6e6e6e;
  .el-icon-star-on,.el-icon-star-off{
    padding-top: 0.1vh;
    margin-right: 1px;
    font-size: 18px;
    color: #FFD74D;
    opacity:70%;
}
}
.organization-details{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top:3vh;
      .organization-details-name{
        font-size: 6px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .null{
        padding: 0 4px;
      }
      .organization-name{
        padding-left: 3px;
        text-align: left;
        font-size: 1rem;
      }
      .organization-type{
        font-size: 6px;
        text-align: right;
        color: #BBBBBB;
        @media (max-width: 769px) {
          display: block;
          display: none;
        }
    }
}
  .operation{
    display: flex;
    margin-top:4vh;
    justify-content: space-around;
    .el-button{
      text-align: right;
      font-size: 1px;
      line-height:2px ;
      height: 1rem;
      width:88px ;
      margin-top:3vh;
      font-family: Source Han Sans SC VF;
      font-weight: 600; 
      color: black;
      border-radius: 10px;
      opacity: 0.8;
    }
  }
.position-message{
  padding-top: 5vh;
  padding-left: 10vw;
  padding-right: 8vw;
  font-family: Source Han Serif CN VF;
  font-size: 16px;
  font-weight: 500;
  line-height: 34px;
  color: #101010;
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
  justify-content: space-around;
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
.butn{
    width: 100%;
    margin-top: 8%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 10%;
  }
</style>
  