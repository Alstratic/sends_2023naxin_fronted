<template>
    <el-card class="box-card">
      <div style="display: flex;justify-content: space-between;">
          <div style="display: flex;flex-direction: column;justify-content: space-between;">
            <div class="hot-position-details">
              <span class="hot-position-name">{{ taskName }}</span>
            </div>
            <div style="margin-top: 5px;">
                <!-- 产品经理这里记得改 -->
              <span style="color: #7E7E7E;font-family: Source Han Sans SC VF;
                  font-size: 16px;font-weight: 400;">{{positionName}}</span>
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
              <span class="hot-position-num">{{statusText}}</span>
             
            </div>
          </div>
      </div>
    </el-card>
  
  </template>
  
  <script>
  export default{
  props: {
    taskName:String,
    positionName: String,
    status: Number,
  },
  data(){
    return{
      statusBar:[
        '待完成',
        '已完成',
        '已截止'
      ]
    }
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
  computed:{
    statusText() {
      return this.statusBar[this.status]
    },
  }
  // created:{
  // //补充：从后端获得isCollect的状态
  // }
  }
  </script>
  
  <style lang="less" scoped>
  .box-card {
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
  </style>