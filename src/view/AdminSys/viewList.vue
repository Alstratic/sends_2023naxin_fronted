<template>
  <div class="container">
    <div class="ApplyText">
      <span @click="ff">面试列表</span>
      <div v-if="isLoading">
          Loading...
        </div>
      <div v-else class="message" style="overflow-x: scroll;">
        <div class="message1" v-for="(Position, index) in allPosition" :key="index" style="overflow-y: scroll;overflow-x: hidden;">
          <div style="display: flex;justify-content: space-around;">
            <div style="padding-right: 7vw;font-size: 15px;font-weight: 550;">{{ Position.Name }}</div>
            <div style="color: #7E7E7E;">面试人数{{getPositionWaitListLength(Position)}}人</div>
          </div>
          <div class="message2" v-for="(wait, ind) in Position.waitList" :key="ind">
            <div style="display: flex;justify-content: space-between ;">
              <span style="font-size: 1rem;font-weight: 550;"> {{ wait.name }}</span>
              <span v-if="wait.time.hasOwnProperty('seconds')" style="color: #D0B65C; font-size: 0.9rem;">{{ formattedDateTime(wait.time.seconds) }}</span>
              <span v-else style="color: #D0B65C; font-size: 0.9rem;">待定</span>
            </div>
            <br/>
           <div style="display: flex;justify-content: space-between ;">
            <span style="font-size: 0.7rem; color: #929292;">{{wait.stuNum }}</span>
            <span style="font-size: 1rem;font-weight: 550;">{{wait.address }}</span>
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AdminSqure } from '../../api/index'
import { AdminWaitView } from '../../api/index'

export default {
  data() {
    return {
      allPosition: [],
      isLoading: true,

    }
  },
  created() {
    AdminSqure().then(res => {
      console.log(res)
      //解决异步问题：在模板渲染完成后，allPosition里面的waitList还没添加进去
      this.allPosition = res.data.data;
      const promiseArray = this.allPosition.map(obj => AdminWaitView(obj.id));
      Promise.all(promiseArray).then(results => {
        results.forEach((res, index) => {
          this.allPosition[index].waitList = res.data.data.wait || [];
        });
        console.log(this.allPosition)
        this.isLoading = false;
      });
    });
  },
  methods:{
    ff(){
      AdminWaitView(5).then(ress=>{
        console.log(ress)
      })
    },
    getPositionWaitListLength(position) {
      if (position.waitList) {
        return position.waitList.length;
      } else {
        return 0;
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
  
  }
}
</script>

<style lang="less" scoped>
.ApplyText{
    margin-left: 3vw;
    margin-right: 8vw;
    padding-top: 2vh;
    @media (max-width: 920px) {
      margin-left: 0vw;
      margin-right: 0vw;
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
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 920px) {
    width: 100%; 
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 4e7778855066a2d3138879b91e2d013968217de6
