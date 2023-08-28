<template>
  <div class="container">
      <div class="ApplyText"> 
        <div style="display:flex;justify-content: space-between;margin-bottom: 7px;">
          <span>{{post.Name}}</span>
          <span>3人</span>
        </div>
        <div>
          <el-tag type="info" style="font-size: 0.5rem; font-weight: 550;line-height: 15px" v-for="tags in tag" :key="tags">{{tags}}</el-tag>
        </div>
        <div>
          <el-button type="warning" style="background-color: #FFD74D;" @click= Return>返回</el-button>
           <el-button type="warning" plain @click="EndRecruit">结束招聘</el-button>
        </div>
        <div class="position-message">
          <span style="margin-left: 1vw;font-size:18px;font-weight: 500;">职位信息</span>
          <!-- 先写死 -->
          <el-card class="message">
              招聘对象：{{this.post.Object}}
              <br/>
              职位任务：{{this.post.Task}}
              <br/>
              特殊说明：{{this.post.Illustrate}}
              <br/>
          </el-card>
          <br/>
          <!-- 具体根据返回情况决定是否显示 -->
          <span style="margin-left: 1vw;font-size:18px;font-weight: 500;">应聘名单</span>
          <!-- 先写死 -->
          <div class="message" style="overflow-x: scroll;">
            <div class="message1" v-for="(allApplication,index) in allApplications" :key="index" @click="GetStuNum(allApplication,index)">
              <div style="display: flex;justify-content: space-between;margin-top: 1vh;">
                <span style="font-size: 17px;font-weight: 600;margin-right: 3px;">{{allApplication.name}}</span>
                <span style="font-size: 17px; color:#D0B65C;font-weight: 520;">{{allApplication.hasOwnProperty('state')? allApplication.state===2?'已拒绝':'已同意' :'待处理'}}</span>
              </div>
              <p>个人情况</p>
              <el-input type="textarea" v-model.trim = "PerEvaluate[index]" resize="none" :autosize="{ minRows: 1, maxRows:10}" placeholder="还不能用">    
            </el-input>
              <p>面试阶段</p>
              <el-input type="textarea" v-model.trim = "PerEvaluate[index]" resize="none" :autosize="{ minRows: 1, maxRows:10}" placeholder="还不能用">    
            </el-input>
              <p>考核阶段</p>
              <el-input type="textarea" v-model.trim = "PerEvaluate[index]" resize="none" :autosize="{ minRows: 1, maxRows:10}" placeholder="还不能用">    
            </el-input>
            <el-button type="warning" style="background-color: #FFD74D;" v-show="allApplication.hasOwnProperty('state')? false:true" @click="Agree">同意申请</el-button>
            <el-button type="warning" plain v-show="allApplication.hasOwnProperty('state')? false:true" @click="DisAgree">拒绝申请</el-button>
             </div>
          </div>
    </div>
      </div>

  </div>
  </template>

<script>
import {PostsSqure} from '../../api/index'
import {applicatioPost} from '../../api/index'
import {applicatioChange} from '../../api/index'
import axios from 'axios'
export default {
  data(){
    return{
      post:{},
      tag:[],
      allApplications:[],
      PerEvaluate:[],
      postApply:{
        posts:0,
        state:0,
        stu_num:''
      },
    }
  },
  // 这边这个监听还会有点问题
//   watch:{
//     PerEvaluate:{
//       deep:true,
//         immediate: true,
//         handler(){
//            console.log(sessionStorage.getItem('index'))
//           if(sessionStorage.getItem('index')!=null &&this.PerEvaluate[sessionStorage.getItem('index')]!=''){
//             this.postApply.posts=parseInt(sessionStorage.getItem('id'))
//             this.postApply.state=1
//             this.postApply.stu_num=sessionStorage.getItem('stunum')
//             applicatioChange(this.postApply).then(res=>{
             
//               console.log(res)
//             })
//           }
//         }
//     }
// } ,
  mounted(){
    // sessionStorage.removeItem('index')
    PostsSqure(sessionStorage.getItem('id')).then(res=>{
      this.post=res.data.data.post
      this.tag.push(this.post.Classify)
      this.tag.push(this.post.Experience)
      this.tag.push(this.post.Object)
    })
    applicatioPost(parseInt(sessionStorage.getItem('id'))).then(res=>{
      console.log(res)
      this.allApplications=res.data.data.allApplications
    })
  },
  methods: {
    Return(){
      const currentPath=this.$route.path;
            const targetPath='/admin/jobList';
            if(currentPath !== targetPath)
            {
                this.$router.push(targetPath)
            }
    },
    EndRecruit(){
      this.$confirm('确定结束招聘?', '提示', {
          showClose:false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'token': localStorage.getItem('token')
          }
          }
          axios.put(`http://124.221.99.127:10810/admin/posts/${this.post.id}/state`, null,config).then(res=>{
            this.$message({
            type: 'success',
            message: '已结束招聘!'
          });
          this.$router.replace('/jobList')
          })
        }).catch(() => {
        });
    },
    GetStuNum(allApplication,index){
      sessionStorage.setItem('stunum',allApplication.stuNum)
      // sessionStorage.setItem('index',index)
    },
    Agree(){
      this.postApply.posts=parseInt(sessionStorage.getItem('id'))
      this.postApply.state=1
      this.postApply.stu_num=sessionStorage.getItem('stunum')
      applicatioChange(this.postApply).then(
        applicatioPost(parseInt(sessionStorage.getItem('id'))).then(res=>{
        this.allApplications=res.data.data.allApplications
      })
      )
    },
    DisAgree(){
      this.postApply.posts=parseInt(sessionStorage.getItem('id'))
      this.postApply.state=2
      this.postApply.stu_num=sessionStorage.getItem('stunum')
      applicatioChange(this.postApply).then(
        applicatioPost(parseInt(sessionStorage.getItem('id'))).then(res=>{
        this.allApplications=res.data.data.allApplications
      })
      )
    }
}
}
</script>

<style lang="less" scoped>
.ApplyText{
    margin-left: 10vw;
    margin-right: 10vw;
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
  .el-button{
      text-align: center;
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
  .el-tag{
      margin-right: 1vw;
      margin-top:2vh;
      padding: auto;
      color:#6e6e6e;
      background-color: #e7e7e7;
      height: 18px;
      // width: 45px; 宽度不要指明，让文字撑开
}
.position-message{
  padding-top: 7vh;
  font-family: Source Han Serif CN VF;
  font-size: 16px;
  font-weight: 500;
  line-height: 34px;
  color: #101010;
}
.message{
    border: #ffd74d 1.5px solid;
    border-radius: 15px;
    margin-right: 8vw;
    border-width: 1px;
    font-size: 1rem;
    width: 100%;
    font-weight: 550;
    display: flex;
    // @media (max-width: 769px) {
    //   margin-right: 0;
    // }
}
.message1{
  margin:5px;
  padding: 15px;
  justify-content: space-between;  
  align-items: center;
  min-width: 30%;
  height: 65vh;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  border-width: 1px;
  font-size: 1rem;
  @media (max-width: 920px) {
    min-width: 100%; 
  }
}
p{
  margin-bottom:0px
}
  /deep/.el-textarea__inner{
    width: 100%;
    border: 0px solid #FFD74DB2;
  }
  /deep/.el-textarea__inner:focus {
    border: 0px solid #FFD74DB2;
    box-shadow:0 0 2.5px #FFD74DB2
  }
  /deep/.el-textarea__inner:hover {
    border: 0px solid #FFD74DB2;
  }
  /deep/.el-textarea__inner {
    border: 0px solid #FFD74DB2;
  }
</style>