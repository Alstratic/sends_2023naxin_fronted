<template>
  <el-card class="box-card">
    <div class="hot-position-details">
<<<<<<< HEAD
      <span class="hot-position-name">{{ positionName }}</span>
      <span class="hot-position-num">{{ statusText }}</span>
      <span class="hot-position-tips" v-if="this.isShow">请在{{ tipsText }}页面查看详细信息</span>
    </div>

    <div class="organization-detail1">
      <div class="organization-details-name1">
        <img
          src="https://hqu-service-1309039959.cos.ap-shanghai.myqcloud.com/2023-08-19:14:34:53/.png"
          alt=""
          style="width: 23px; height: 23px; border-radius: 50%"
        />
=======
      <span class="hot-position-name">{{positionName}}</span>
      <span class="hot-position-num">{{status}}</span>
    </div>
    <div class="hot-position-tags">
      <el-tag type="info" v-for="tag in tags" :key="tag">{{tag}}</el-tag>
    </div>
    <div class="organization-detail1">
      <div class="organization-details-name1">
        <img src="../assets/logo.png" alt="" style="width:23px;height: 23px;border-radius: 50%;">
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
        <span class="organization-name1">桑梓实验室</span>
        <div class="null"></div>
        <span class="organization-type1">校级组织|互联网</span>
      </div>
    </div>
  </el-card>
<<<<<<< HEAD
</template>

<script>
export default {
  props: {
    positionName: String,
    status: Number,
  },
  data() {
    return {
      isShow:false,
      statusBar: [
        '未查看',
        '已查看',
        '已拒绝',
        '待面试',
        '待考核',
        '考核中',
        '完成考核',
        '已录用',
        '未录用',
      ],
      tipsBar:[
        '考核',
        '面试'
      ]
    }
  },
  computed: {
    statusText() {
      return this.statusBar[this.status]
    },
    tipsText(){
      if(this.status===4||this.status===5||this.status===6)
      {
        this.isShow=true
        return  this.tipsBar[0]
      }
      else if(this.status===3){
        this.isShow=true
        return this.tipsBar[1]
      }
      else{
        this.isShow=false
        return
      }
    }
  },

=======

</template>

<script>
export default{
props: {
  positionName: String,
      status: String,
      tags: Array,
},
methods:{
// ChooseCollect(){
//     //补充：给后端发
//     this.isCollect=!this.isCollect
// }
},
created:{
//补充：从后端获得isCollect的状态
}
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
}
</script>

<style lang="less" scoped>
.box-card {
<<<<<<< HEAD
  margin-top: 1.5vh;
  width: 50%;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  @media (max-width: 800px) {
    width: 90%;
  }
}
.organization-detail1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3vh;
  .organization-details-name1 {
    font-size: 6px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .null {
    padding: 0 4px;
  }
  .organization-name1 {
    padding-left: 3px;
    text-align: left;
    font-size: 0.5rem;
  }
  .organization-type1 {
    font-size: 6px;
    text-align: right;
    color: #bbbbbb;
  }
}
.hot-position-details {
  display: flex;
  justify-content: space-between;
}
.hot-position-name {
  font-size: 1rem;
  font-weight: 600;
}
.hot-position-num {
  font-size: 1.5rem;
  font-weight: 600;
}
.el-tag {
  margin-right: 1vw;
  padding: auto;
  margin-top: 3px;
  color: #6e6e6e;
  background-color: #e7e7e7;
  height: 18px;
  // width: 45px; 宽度不要指明，让文字撑开
  font-weight: 600;
  font-size: 0.5rem;
  line-height: 15px;
}
.hot-position-tags {
  padding-right: 2vw;
  display: flex;
  flex-wrap: wrap;
=======
margin-top: 1.5vh;
width: 50%;
border: #ffd74d 1.5px solid;
border-radius: 15px;
@media (max-width: 800px) {
width: 90%;
}
}
.organization-detail1{
display: flex;
justify-content: space-between;
align-items: center;
margin-top:3vh;
.organization-details-name1{
  font-size: 6px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.null{
  padding: 0 4px;
}
.organization-name1{
  padding-left: 3px;
  text-align: left;
  font-size: 0.5rem;
}
.organization-type1{
  font-size: 6px;
  text-align: right;
  color: #BBBBBB;
}
}
.hot-position-details{
display: flex;
justify-content: space-between;
}
.hot-position-name{
font-size: 1rem;
font-weight: 600;
}
.hot-position-num{
font-size: 1.5rem;
font-weight: 600;
}
.el-tag{
margin-right: 1vw;
padding: auto;
margin-top:3px;
color:#6e6e6e;
background-color: #e7e7e7;
height: 18px;
// width: 45px; 宽度不要指明，让文字撑开
font-weight: 600;
font-size: 0.5rem;
line-height: 15px;
}
.hot-position-tags{
padding-right:2vw;
display: flex;
flex-wrap: wrap;
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
}
</style>
