<template>
  <div class="container">
    <div class="ApplyText">
      <span>考核批阅</span>
      <div v-if="isLoading">
          Loading...
        </div>
      <div v-else class="message" style="overflow-x: scroll;">
        <div class="message1" v-for="(Position, index) in allPosition" :key="index">
          <div style="display: flex;justify-content: space-around;">
            <div style="padding-right: 7vw;font-size: 15px;font-weight: 550;">{{ Position.Name }}</div>
            <div style="color: #7E7E7E;">考核人数{{Position.all}}人</div>
          </div>
          <div class="message2" @click="GoAssessDetail(Position.id)"  v-if="Position.waitList && Object.keys(Position.waitList).length !== 0">
            <div style="display: flex;justify-content: space-around;flex-direction: column;">
              <span style="font-size: 1rem;font-weight: 550;">{{ Position.waitList.name }}</span>
              <span  style="color: #D0B65C; font-size: 0.9rem;">截止时间: {{formattedDateTime(Position.waitList.ddl.seconds)}}</span>
            </div>
           <div style="display: flex;justify-content: center;align-items: center;color: #929292">
            <span>{{ Position.finished }}</span>
              <span>/</span>
              <span>{{ Position.all }}</span>
           </div>
          </div>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import { AdminSqure } from '../../api/index'
import { AccessView } from '../../api/index'
import {TaskCount} from '../../api/index'
export default {
  data() {
    return {
      allPosition: [],
      isLoading: true,
    }
  },
  created() {
    AdminSqure().then(res => {
      //解决异步问题：在模板渲染完成后，allPosition里面的waitList还没添加进去
      this.allPosition = res.data.data;
      const promiseArray = this.allPosition.map(obj => AccessView(obj.id));
      Promise.all(promiseArray).then(results => {
        results.forEach((res, index) => {
          this.allPosition[index].waitList = res.data.data || {};
        });
      });
      const promiseArray1 = this.allPosition.map(obj => TaskCount(obj.id));
      Promise.all(promiseArray1).then(results => {
        results.forEach((res, index) => {
          this.allPosition[index].all = res.data.data.all || 0;
          this.allPosition[index].finished = res.data.data.finished || 0;
        });
        this.isLoading = false;
      });
      console.log(this.allPosition)
    });
    


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
    GoAssessDetail(id,all,fin){
      sessionStorage.setItem('PostId',id)
      const currentPath=this.$route.path;
            const targetPath='/admin/AssessDetail';
            if(currentPath !== targetPath)
            {
                this.$router.push(targetPath)
            }
    }
  
  }
}
</script>

<style lang="less" scoped>
.ApplyText{
    margin-left: 3vw;
    margin-right: 8vw;
    padding-top: 2vh;
    @media (max-width: 920px) {
      margin-left: 6vw;
      margin-right: 3vw;
    }
    span{
      font-family: Source Han Serif CN VF;
      font-size: 1.5rem;
      font-weight: 545;
      line-height: 0.5rem;
      letter-spacing: 0em;
      @media (max-width: 720px) {
        font-size: 16px;
    }
    }
  }
  .message{
    margin-top: 2vh;
    min-height: 50vh;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  margin-right: 8vw;
  border-width: 0px;
  font-size: 0.7rem;
  width: 98%;
  display: flex;
    height: 100vh;
flex-wrap: nowrap;
  // @media (max-width: 769px) {
  //   margin-right: 0;
  // }
}
.message1{
  margin:5px;
  padding: 15px;
  height: 90%;
  flex-direction: column;
  align-items: center;
  min-width: 40%;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  border-width: 1px;
  font-size: 0.7rem;
  display: flex;
  @media (max-width: 920px) {
    min-width: 100%; 
  }
}
.message2{
  margin:5px;
  padding: 15px;
  height: 10vh;
  min-width: 80%;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  border-width: 1px;
  font-size: 0.7rem;
  display: flex;
  justify-content: space-between;
  @media (max-width: 920px) {
    width: 100%; 
  }
}
</style>