<template>
  <div class="Examine_det">
  <div class="Examine_Introduce">
    <div class="Intro">
            <div class="position-name">
              <!-- 先写死 -->
                <span id="Title">{{this.AssessDet.name}}</span>
                <div class="hot-position-tags">
                  <div class="deadline">
                      截止时间 {{formattedDateTime(this.AssessDet.ddl.seconds)}}
                  </div>
                </div>
            </div>
            <div class="statu">
              {{this.finished}}/{{ this.all }}
            </div> 
    </div> 
    <div class="Examine-message">
          <span style="margin-left: 1vw;">考核目的</span>
          <!-- 先写死 -->
          <el-card class="message">
             {{this.AssessDet.object }}
          </el-card>
          <br/>
          <span style="margin-left: 1vw;">考核内容</span>
          <!-- 先写死 -->
          <el-card class="message">
             {{ this.AssessDet.content }}
          </el-card>
          <br/>
          <span style="margin-left: 1vw;">考核文件</span>
          <!-- 先写死 -->
          <el-card class="message" style="font-size: 15px;font-weight: 500; font-family: Source Han Sans SC VF;">
            <div v-for="(Access,index) in AccessPer" :key="index" style="font-size: 10px;margin-top: 3px;">
              <div style="display: flex;justify-content: space-between; flex-wrap: nowrap;"> 
                <div class="mess">{{Access.name}}</div>
              <!-- <div>{{ formattedDateTime(this.AssessDet.ddl.seconds)}}</div> -->
                <div class="mess1">
                  <i class="zip" ></i>
                    <!-- 这里应该是一个下载链接 之后具体看后端咋传，目前先写好下载方式-->
                    {{Access.stuNum}}.zip
                    <i class="download" @click="loadFile(Access.path)"></i>
                </div>
              </div> 
            </div>
          </el-card>
    </div>
  </div>
  
</div>
</template>
  
<script>
import {saveAs} from "file-saver"
import VueSlickCarousel from 'vue-slick-carousel'
import positionCard from '../../components/positionCard.vue';
import CHeader from '../../components/CHeader.vue';
import {AccessView} from '../../api/index'
import {TaskCount} from '../../api/index'
import {AdminTaskView} from '../../api/index'

import axios from 'axios';
export default {
  components: { VueSlickCarousel,positionCard,CHeader },
  name:'Examine_page',
  data(){
    return{ 
      
      AssessDet:{},
      all:0,
      finished:0,
      AccessPer: [],
    }
  },
  mounted() { 
    AccessView(parseInt(sessionStorage.getItem('PostId'))).then(res=>{
      console.log(res)
        this.AssessDet=res.data.data
    })
    TaskCount(parseInt(sessionStorage.getItem('PostId'))).then(res=>{
        console.log(res)
        this.all= res.data.data.all ||0
        this.finished= res.data.data.finished ||0;
    })
    AdminTaskView(parseInt(sessionStorage.getItem('PostId'))).then(res=>{
        console.log(res)
        this.AccessPer=res.data.data.task.filter(item => item.state === 1)
        console.log(this.AccessPer)
    })

  },
 
  methods:{
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
    },
    loadFile(file){  
        console.log(file)
        // axios.get(file,{responseType:"blob"}).then((res)=>{
        //   saveAs(res.data)
        // })
        window.open(file, '_blank');
    },
  }
}
</script>
  
<style lang="less" scoped>
.Examine_det{
  height: 100%;
  // @media (max-width: 769px) {
  //     background-color: blue;
  // }
}
.Examine_Introduce{
  margin-left: 3vw;
  margin-right: 3vw;
  padding-top: 7vh;
  @media (max-width: 920px) {
    margin-left: 0vw;
    margin-right: 0vw;
  }
}
.Intro{
  display: flex;
  justify-content: space-between;
  padding-left: 15vw;
  padding-right: 15vw;
  @media (max-width: 820px) {
    padding-left: 0vw;
  padding-right: 0vw;
  }
}
.position-name{
  #Title{
    font-family: Source Han Serif CN VF;
    font-size: 1.5rem;
    font-weight: 545;
    line-height: 0.5rem;
    letter-spacing: 0em;
    @media (max-width: 920px) {
      font-size: 1rem;
  }
  }
}
.deadline{
      margin-top:4vh;
      padding: auto;
      color:#D0B65C;
      font-size: 0.5rem;
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
.organization-details-name{
        font-size: 6px;
        font-weight: 600;
        display: flex;
        justify-content: space-around;
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
    margin-top: 2vh;
    padding-left: 1.5vw;
    padding-right: 1.5vw;
    justify-content: space-around;
    @media (max-width: 769px) {
      padding-left: 1vw;
    padding-right: 1vw;
        }
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
.Examine-message{
  padding-top: 5vh;
  padding-left: 14vw;
  padding-right: 13vw;
  font-family: Source Han Serif CN VF;
  font-size: 16px;
  font-weight: 500;
  line-height: 34px;
  color: #101010;
  @media (max-width: 820px) {
    padding-left: 0vw;
  padding-right: 0vw;
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
.zip{
  display: inline-block;
      width: 20px;
      margin-bottom: -5px;
      height: 20px;
      background-size: 100% 100%;
      margin-right: 3px;
      background-image: url("../../assets/zip.png") !important;
}
.download{
    display: inline-block;
      width: 20px;
      margin-bottom: -5px;
      height: 20px;
      background-size: 100% 100%;
      margin-right: 10px;
      background-image: url("../../assets/load.png") !important;
    margin-left: 10px;
    font-size:18px;
  }
  .download:hover{
    background-image: url("../../assets/loadhover.png") !important;
  }
  .mess{
    font-weight: 550;
    font-size: 0.9rem;
  }
  .mess1{
    font-weight: 550;
  }
</style>
  