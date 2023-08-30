<template>
  <el-card class="box-card">
<<<<<<< HEAD
<<<<<<< HEAD
    <div style="display: flex; justify-content: space-between" @click="cardClick">
=======
    <div style="display: flex; justify-content: space-between">
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <div class="hot-position-details">
          <span class="hot-position-name">{{ positionName }}</span>
        </div>
        <div class="organization-detail1">
          <div class="organization-details-name1">
            <img
              src="../assets/sends_logo.png"
              alt=""
              style="width: 23px; height: 23px; border-radius: 50%"
            />
            <span class="organization-name1">桑梓实验室</span>
            <div class="null"></div>
            <span class="organization-type1">校级组织|互联网</span>
          </div>
        </div>
      </div>
      <div style="display: flex">
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          "
        >
<<<<<<< HEAD
          <span style="color: #929292">{{ time }}</span>

          <span class="hot-position-num">{{ address }}</span>

          <span style="color: #d0b65c; font-size: 3px">{{ statusText }}</span>
=======
          <span style="color: #929292">time</span>

          <span class="hot-position-num">{{ status }}</span>

          <span style="color: #d0b65c; font-size: 3px">面试结束</span>
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <el-button type="warning" plain @click="abandonView"
            >放弃面试</el-button
          >
          <el-button
            type="warning"
            @click="talkTime"
            style="background-color: #ffd74d"
            >协调时间</el-button
          >
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    positionName: String,
<<<<<<< HEAD
    time: String,
    id:Number,
    address:String,
    status:Number
  },
  data(){
    return{
      statusBar:[
        '待面试',
        '面试结束'
      ]
    }
=======
    status: String,
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
  },
  methods: {
    //放弃面试
    async abandonView() {
<<<<<<< HEAD
      let posts = Number(this.id)
      let data = {
        posts: posts,
        organization: 1,
      }
      let headers = {
        'Content-Type': 'application/json',
        accept: 'application/json',
        token: localStorage.getItem('HQU_naxin'),
      }
=======
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
      this.$confirm('您是否放弃面试?', '提示', {
        showClose: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '您已放弃面试!',
          })
<<<<<<< HEAD
          this.$router.replace('/')

          axios
            .post(this.baseUrl, data, { headers })
            .then((response) => {
              // 将从后端获取的数据填充到 cardData 对象中
              console.log(response)
            })
            .catch((error) => {
              console.error('Failed to fetch card data:', error)
            })
=======

          //这里之后还得再改一下。跟后端发请求，再重新更改页面
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
        })
        .catch(() => {})
    },
    //协调时间
    async talkTime() {
      window.open('https://uutool.cn/qq-chat/')
    },

<<<<<<< HEAD
    cardClick(){
      console.log(this.id);
      this.$router.push({name:'Interview',params:{id:this.id,positionName:this.positionName,status:this.statusText,time:this.time,address:this.address}})
    }
  },
  computed:{
    statusText(){
      return this.statusBar[this.status]
    }
  }
=======
    <div style="display: flex;justify-content: space-between;">
        <div style="display: flex;flex-direction: column;justify-content: space-between;">
          <div class="hot-position-details">
            <span class="hot-position-name">{{positionName}}</span>
          </div>
          <div class="organization-detail1">
            <div class="organization-details-name1">
              <img src="../assets/sends_logo.png" alt="" style="width:23px;height: 23px;border-radius: 50%;">
              <span class="organization-name1">桑梓实验室</span>
              <div class="null"></div>
              <span class="organization-type1">校级组织|互联网</span>
            </div>
          </div>
        </div>
        <div style="display: flex;">
          <div style="display: flex;flex-direction: column;justify-content: space-around;">
            <span style="color:#929292;">time</span>
            
            <span class="hot-position-num">{{status}}</span>
            
            <span style="color:#D0B65C;font-size: 3px;">面试结束</span>
          </div>
          <div style="display: flex;flex-direction: column;justify-content: space-between;"> 
            <el-button type="warning" plain  @click="abandonView">放弃面试</el-button>
            <el-button type="warning"  @click="talkTime" style="background-color: #FFD74D;">协调时间</el-button>
          </div>
        </div>
    </div>
  </el-card>

</template>

<script>
export default{
props: {
  positionName: String,
      status: String,
     
},
methods:{

   //放弃面试
  async abandonView(){
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

          //这里之后还得再改一下。跟后端发请求，再重新更改页面
        }).catch(() => {
         
        });
    },
    //协调时间
    async talkTime(){
      window.open("https://uutool.cn/qq-chat/")
    },

// ChooseCollect(){
//     //补充：给后端发
//     this.isCollect=!this.isCollect
// }
},
created:{
//补充：从后端获得isCollect的状态
}
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
=======
    // ChooseCollect(){
    //     //补充：给后端发
    //     this.isCollect=!this.isCollect
    // }
  },
  // created:{
  // //补充：从后端获得isCollect的状态
  // }
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
}
</script>

<style lang="less" scoped>
.box-card {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
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
    @media (max-width: 920px) {
      display: none;
    }
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
}
.el-button {
  text-align: right;
  font-size: 1px;
  line-height: 2px;
  height: 1rem;
  width: 88px;
  font-family: Source Han Sans SC VF;
  font-weight: 600;
  color: black;
  border-radius: 10px;
  opacity: 0.8;
  margin-left: 7px;
}
<<<<<<< HEAD
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
  @media (max-width: 920px) {
    display: none;
}
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
}
.el-button{
      text-align: right;
      font-size: 1px;
      line-height:2px ;
      height: 1rem;
      width:88px ;
      font-family: Source Han Sans SC VF;
      font-weight: 600; 
      color: black;
      border-radius: 10px;
      opacity: 0.8;
      margin-left: 7px;
    }
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
=======
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
</style>
