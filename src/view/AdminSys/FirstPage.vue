<template>
  <div>
    <el-card class="message">
      <div class="organization-details">
            <div class="organization-details-name">
              <img src="../../assets/sends_logo.png" alt="" style="width:32px;height: 32px;border-radius: 50%;">
              <span class="organization-name">桑梓实验室</span>
              <div class="null"></div>
              <span class="organization-type" v-if="vVisible">{{TableTxt.label1}}</span>
              <input type="text" size="10" class="organization-type"  contenteditable="true" v-else v-model="TableTxt.label1">
              <span style="color:#BBBBBB ;margin-left:5px;margin-right:5px;"> | </span>
              <span class="organization-type" v-if="vVisible">{{TableTxt.label2}}</span>
              <input type="text" size="10" class="organization-type" v-else v-model="TableTxt.label2">
            </div>
              <el-button size="mini" style="border-color: #FFD74D; margin-left: 6px;" v-if="vVisible" @click="edit">编辑信息</el-button>
              <el-button size="mini" style="border-color: #FFD74D;" v-else  @click="Finish">完成</el-button>
      </div>
    </el-card>
    <div class="mindin">
      <el-card class="message1">
        <p style="font-family: Source Han Sans SC VF;font-size:1.2vw;font-weight: 700;margin-top: 1px;color: #7E7E7E;">组织信息</p>
        <p style=" margin-bottom:0px ;color: #7E7E7E;">负责人</p>
        <span v-if="vVisible" style="font-size:1.2vw;font-weight: 520; margin-top:0px;">{{TableTxt.Mainjor}}</span>
        <input type="text" size="10" style="font-size: 1.2vw"  contenteditable="true" v-else v-model="TableTxt.Mainjor">
      <br/>
      <p style=" margin-bottom:0px ;color: #7E7E7E;">单位</p>
        <span v-if="vVisible" style="font-size:1.2vw;font-weight: 520; margin-top:0px;">{{TableTxt.Workplace}}</span>
        <input type="text" size="10" style="font-size: 1.2vw"  contenteditable="true" v-else v-model="TableTxt.Workplace">
      <br/>
      <p style=" margin-bottom:0px ;color: #7E7E7E;">联系方式</p>
        <span v-if="vVisible" style="font-size:1.2vw;font-weight: 520; margin-top:0px;">{{TableTxt.Contact}}</span>
        <input type="text" size="10" style="font-size: 1.2vw"  contenteditable="true" v-else v-model="TableTxt.Contact">
      <br/>
      </el-card>
      <el-card class="message2">
        <p style="font-family: Source Han Sans SC VF;font-size:1.2vw;font-weight: 700;margin-top: 1px;color: #7E7E7E;">具体数据 </p>
        <div class="contain">
          <div v-for="(value,key,index) in area" :key="index" style="width:30%;margin-right: 0.5vw;">
            <p style="margin-bottom:0px ;color: #7E7E7E;">{{key}}</p>
            <p style="font-size:1.2vw;font-weight: 540;">{{value}}</p>
          </div>
        </div>
      </el-card>
      <el-card class="message3">
        <p style="font-family: Source Han Sans SC VF;font-size:1.2vw;font-weight: 700;margin-top: 1px;color: #7E7E7E;">动态</p>
        <!-- 未写 -->
      </el-card>
    </div>
    <div class="BottomContain" style="display: flex;flex-wrap: wrap;">
      <el-card class="message4">
        <p style="font-family: Source Han Sans SC VF;font-size:1.2vw;font-weight: 700;margin-top: 1px;color: #7E7E7E;">面试时间表</p>
      </el-card>
      <el-card class="message5">
        <p style="font-family: Source Han Sans SC VF;font-size:1.2vw;font-weight: 700;margin-top: 1px;color: #7E7E7E;">近期考核任务</p>
        
      </el-card>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "FirstPage",
  data(){
      return{
          TableTxt:{
            Txt:'',
            label1:"校级组织",
            label2:"互联网",
            Mainjor:"张志飞",
            Workplace:"信息处",
            Contact:"1234567890",
          },
          vVisible: true,
          area:{
              "发布职位":5,
              "职位申请待审批":5,
              "招聘人数":5,
              "面试人数":5,
              "考核人数":5,
              "考核待批阅":12,
          }
      }
  },
  methods: {
      // 点击编辑按钮
      edit() {
          this.vVisible = !this.vVisible
      },
      Finish(){
        this.vVisible = !this.vVisible
        //发给后端
      }
  },
};
</script>
<style lang="less" scoped>
.organization-details{
  overflow-x:auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
      padding-left: 10px;
      margin-right: 4vw;
      text-align: left;
      font-size: 1.2rem;
      @media (max-width: 920px) {
        font-size: 5px;
        margin-right: 0vw;
      }
    }
    .organization-type{
      font-size: 6px;
      color: #BBBBBB;
  }
}
.message{
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  margin-right: 8vw;
  border-width: 1px;
  font-size: 0.7rem;
  width: 98%;
  // @media (max-width: 769px) {
  //   margin-right: 0;
  // }
}
.message1{
  width: 15%;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;

  border-width: 1px;
  font-size: 0.7rem;
  @media (max-width: 920px) {
    width: 100%; 
    margin-bottom: 1.5vh;
  }
}
.message2{
  width: 30%;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;

  border-width: 1px;
  font-size: 0.7rem;
  @media (max-width: 920px) {
    width: 100%; 
    margin-bottom: 1.5vh;
  }
}
.message3{
  width: 30%;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  margin-right: 2vw;
  border-width: 1px;
  font-size: 0.7rem;
  @media (max-width: 920px) {
    width: 100%; 
    margin-bottom: 1.5vh;
  }
}
.message4{
  width: 40%;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  margin-right: 2vw;
  border-width: 1px;
  font-size: 0.7rem;
  margin-top: 5vh;
  @media (max-width: 920px) {
    width: 100%; 
    margin-bottom: 1.5vh;
    margin-top: 0vh;
  }
}
.message5{
  width: 55%;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  margin-right: 2vw;
  border-width: 1px;
  font-size: 0.7rem;
  margin-top: 5vh;
  @media (max-width: 920px) {
    width: 100%; 
    margin-bottom: 1.5vh;
    margin-top: 0vh;
  }
}
.mindin{
margin-top: 5vh;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
}
input{
border-bottom: 1px solid #BBBBBB;
border-left-width: 0;
border-top-width: 0;
border-right-width: 0;
}
input:focus {

border-bottom: 1px solid #BBBBBB;
border-left-width: 0;
border-top-width: 0;
border-right-width: 0;
outline: none;
}
input:hover {

outline: none;
border-bottom: 1px solid #BBBBBB;
border-left-width: 0;
border-top-width: 0;
border-right-width: 0;
}
.contain{
  display: flex;
  flex-wrap: wrap;
}
</style>
 