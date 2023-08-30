<template>
  <div class="container">
    <div class="ApplyText"> 
        <span>考核发布</span>
        <div class="row py-4 align-items-center"  style="font-size:15px;margin-top: 2vh;">
        <!--查询条件-->
        <div class="col-lg-12 col-md-12">
        <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm pl-5 ml-5" label-position="top" >
          <el-form-item
          label="招聘职位"
          prop="posts_name"
          :rules="[
          { required: true, trigger: 'blur'},
          ]"
          >
          <el-select v-model="ruleForm.posts" >
              <el-option label="未选职位" value="" ></el-option>
              <el-option v-for="(position,index) in allPosition" :key="index" :label="position.Name" :value=position.id ></el-option>
          </el-select>
         </el-form-item>
         <el-form-item
          label="考核名称"
          prop="name"
          :rules="[
          { required: true, trigger: 'blur'},
          ]"
          >
          <el-input v-model="ruleForm.name" >
          </el-input>
         </el-form-item>
          <el-form-item 
          label="截止时间"
          prop="ddl"
          >
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="待定">
            </el-date-picker>
          </div>`
          </el-form-item>
          <el-form-item  style="width: 60vw;" label="考核目的" prop="object" :rules="
            {trigger: 'blur'}" 
            >
            <el-input type="textarea" resize="none" :autosize="{ minRows: 4, maxRows:40}"  v-model="ruleForm.object">    
            </el-input>
          </el-form-item>
          <el-form-item  style="width: 60vw;" label="考核说明" prop="content" :rules="
            {trigger: 'blur'}" 
            >
            <el-input type="textarea" resize="none" :autosize="{ minRows: 4, maxRows:40}"  v-model="ruleForm.content">    
            </el-input>
          </el-form-item>
          <!-- action中的string之后改成上传的地址 -->
          <el-upload class="upload-demo"
                   ref="upload"  
                   action="string"         
                   :file-list="fileList"	
                   :auto-upload="false"	
                   :http-request="uploadFile"		
                   :on-change="handleChange"	
                   :on-preview="handlePreview"	
                   :on-remove="handleRemove"
                   :multiple="multiple"
                   style="height: 10vh;"
                   >	
          <el-button slot="trigger"
                     size="small"
                     type="warning"
                     plain
                     @click="delFile">上传附件</el-button>
          <span style="font-size:2px;margin-left: 13px;color:#7E7E7E; font-family: Source Han Sans SC VF">考核相关文件</span>
        </el-upload>
        
        <div class="butn">
           
          <el-button type="warning"  @click="Retrun" style="padding-left: 38px;padding-right: 38px; opacity: 0.8;color: black;line-height:50% ;" >返回首页</el-button>
          <el-button type="warning"  @click="submitForm('ruleForm')" style="padding-left: 38px;padding-right: 38px; background-color: #FFD74D;opacity: 0.8;color: black;line-height:50% ;">发布考核</el-button>
        </div>
        <el-dialog class="dialog"
          :visible.sync="dialogVisible"
          :show-close= false            
          :close-on-click-modal= false            
          :close-on-press-escape= true            
          width="dialogWidth"         
          center>
          <div  class="tip" style="font-size:1rem; ">{{this.ruleForm.name}} 考核发布成功</div>
          <div class="tip" style="font-size:0.2rem; font-weight: 500;">{{times}}秒后返回首页，<a style="text-decoration:underline;" @click="returnHome">返回</a></div> 
        </el-dialog>
    </el-form>
  </div>
  </div>
    </div>
  
  
  </div>
  </template>
  <script>
  import moment from 'moment'
  import CHeader from '@/components/CHeader.vue';
  import VueSlickCarousel from 'vue-slick-carousel'
  import {AccessCreate} from '../../api/index'
  import {applicatioPost} from '../../api/index'
  import {AdminSqure} from '../../api/index'
  import {TaskCreate} from '../../api/index'
  import axios from 'axios';
  export default {
    
    name:'Applications',
    components: { VueSlickCarousel,CHeader },
    data() {
      return {
        allPosition:[],
        value1: '',
        fileList: [],
        // 不支持多选
        multiple: false,
        formData: "",
        times:5,
        dialogVisible:false,
        aheadReturn:false,
        dialogWidth: "1080px",
        StudentApply:[],
        ruleF:{
          name: "",
          organization: 1,
          organization_name: "桑梓实验室",
          path: 'https://hqu-service-1309039959.cos.ap-shanghai.myqcloud.com/2023-08-19:06:09:58/2125103034.png',
          posts:0,
          posts_name: "",
          stu_num: ""
        },
        ruleForm: {
          content:'',
          ddl:'',
          file_path:'',
          name:'',
          object:'',
          organization_name:'桑梓实验室',
          path:'https://hqu-service-1309039959.cos.ap-shanghai.myqcloud.com/2023-08-19:06:09:58/2125103034.png',
          posts:'',
          posts_name:'',
          },
      };
      },

      mounted() {
        AdminSqure().then(res=>{
          console.log(res)
          this.allPosition = res.data.data.filter(obj => !obj.hasOwnProperty('State'));
        })
        
        window.onresize = () => {
          return (() => {
            this.setDialogWidth()
          })()
        }
      },
    methods: {
      returnHome(){
        this.$router.replace('/admin/FirstPage') 
        this.aheadReturn=true
        window.clearInterval(interval)                    
        window.close();            
        this.dialogVisible = false;  //倒计时结束时运行的业务逻辑，这里的是关闭当前页面
      },
      Retrun(){
        this.$router.replace('/admin/FirstPage') 
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //通过表单验证，再启动提交
            this.onSubmit()
          } else {
            return false;
          }
        });
      },
      setDialogWidth() {
          var val = document.body.clientWidth
          const def = 1080 // 默认宽度
          if (val < def) {
            this.dialogWidth = '100%'
          } else {
            this.dialogWidth = (def+ 'px')
          }
        },
          //点击上传文件触发的额外事件,清空fileList
        delFile () {
        this.fileList = [];
      },
      
      handleChange (file, fileList) {
        this.fileList = fileList;
        this.$nextTick(() => {
        let fileElementList = document.getElementsByClassName('el-upload-list__item-name');
        console.log(fileElementList)
        if (fileElementList && fileElementList.length > 0) {
          for (let ele of fileElementList) {
            let fileName = ele.innerText;
            //获取文件名后缀
            let fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
            let iconElement = ele.getElementsByTagName('i')[0];
            if (['zip','ZIP'].indexOf(fileType) != -1) {
              iconElement.className = 'imgicon-zip' // 压缩包
              let file = new FormData();
              file.append("file", this.fileList[0].raw);//拿到存在fileList的文件存放到formData中
              let config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'token': localStorage.getItem('token')
                    }
                }
              axios.put("https://recruit-manage.sends.cc/api/file/adminupload", file, config).then(res => {
                if(res.data.msg==='success'){
                      this.$message({
                      message: '上传成功!',
                      type: 'success'
                    });
                    this.ruleForm.file_path=res.data.data
                   }
                   else{
                    this.delFile()
                    this.$message({
                    message: '上传失败,请重新上传!',
                    type: 'error'
                  });
                   }
                    console.log(res)
                }).catch(res => {
                  this.delFile()
                  this.$message({
                  message: '上传失败,请重新上传!',
                  type: 'error'
                });
                })
            }
            else{
              this.delFile()
              this.$message({
              message: '文件类型只能是zip格式!',
              type: 'warning'
            });
            }
          }
        }
      })  
      },

      //保存按钮  提交文件这里可能得改
      onSubmit () {
        AccessCreate(this.ruleForm).then(res=>{
          console.log(res)
          if(res.data.msg==='success'){
            applicatioPost(this.ruleForm.posts).then(res=>{
                this.StudentApply=res.data.data.allApplications.filter(obj=>obj.state===5)
                console.log( this.StudentApply)
                this.ruleF.posts=this.ruleForm.posts
                this.ruleF.posts_name=this.ruleForm.posts_name
                for (const item of this.StudentApply){
                  this.ruleF.name=item.name
                  this.ruleF.stu_num=item.stuNum
                   TaskCreate(this.ruleF).then(res=>{
                   if(res.data.msg==='success'){
                    this.dialogVisible=true;
                    this.times = 5;            
                    let that = this            
                    let interval = window.setInterval(function () {                    
                      --that.times                    
                      if (that.times === 0) {     
                        if(that.aheadReturn===false){
                          that.$router.replace('/admin/FirstPage')                                
                          window.clearInterval(interval)                    
                          window.close();            
                          that.dialogVisible = false;  //倒计时结束时运行的业务逻辑，这里的是关闭当前页面
                        }  
                      }            
                  }, 1000) 
                   }else{
                    this.$message({
                      message: '考核发布失败!',
                      type: 'error'
                      
                    });
                   }
                  
                  } ) 
                }     
                })    
          }
          else{
             console.log(this.ruleForm)
            this.$message({
              message: '发布失败!',
              type: 'error'
            });
          }
          console.log(res)
        })
      }
    },
    watch: {
    'ruleForm.posts'(newValue) {
      const selectedOption = this.allPosition.find(option => option.id === newValue);
      const selectedLabel = selectedOption ? selectedOption.Name : '';
      this.ruleForm.posts_name=selectedLabel
    },
    value1(newValue) {
          if (newValue) {
            const formattedDate = moment(newValue).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
            this.ruleForm.ddl=formattedDate
            console.log(this.ruleForm.ddl);
            // 将符合 RFC3339 标准的日期时间格式发送到后端或进行其他操作
          }
        }
  },
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
    }
  }
  .lead{
    margin-top:5vh;
    font-size: 0.5rem;
    color: #7E7E7E;
  }
  .tet{
    margin-top:1vh;
    font-weight: 545;
  }
  .el-form-item{
    width: 40%;
    margin-right: 6%;
  }
  .el-form{
   
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  /deep/.el-input__inner{
      border: 1px solid #FFD74DB2
  }
  /deep/.el-input__inner{
      border: 1px solid #FFD74DB2
  }
  /deep/.el-input__inner:focus {
    border: 1px solid #FFD74DB2;
    box-shadow:0 0 2.5px #FFD74DB2
  }
  /deep/.el-input__inner:hover {
    border: 1px solid #FFD74DB2;
  }
  /deep/.el-textarea__inner{
    width: 100%;
    border: 1px solid #FFD74DB2;
  }
  /deep/.el-textarea__inner:focus {
    border: 1px solid #FFD74DB2;
    box-shadow:0 0 2.5px #FFD74DB2
  }
  /deep/.el-textarea__inner:hover {
    border: 1px solid #FFD74DB2;
  }
  /deep/.el-textarea__inner {
    border: 1px solid #FFD74DB2;
  }

  .butn{
    width: 100%;
    margin-top: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20%;
  }
  
  .upload-demo/deep/.imgicon-video{
      display: inline-block;
      width: 20px;
      margin-bottom: -3px;
      height: 20px;
      background-size: 100% 100%;
      margin-right: 10px;
      background-image: url("../../assets/file-mp4.png");
    }
    .upload-demo/deep/.imgicon-img{
        display: inline-block;
      width: 20px;
      margin-bottom: -3px;
      height: 20px;
      background-size: 100% 100%;
      margin-right: 10px;
      background-image: url("../../assets/pic.png");
    }
    .upload-demo /deep/.imgicon-pdf{
        display: inline-block;
      width: 20px;
      margin-bottom: -3px;
      height: 20px;
      background-size: 100% 100%;
      margin-right: 10px;
      background-image: url("../../assets/PDF.png") !important;
    }
    .upload-demo /deep/.imgicon-docx{
        display: inline-block;
      width: 20px;
      margin-bottom: -3px;
      height: 20px;
      background-size: 100% 100%;
      margin-right: 10px;
      background-image: url("../../assets/word.png") !important;
      }
    .upload-demo /deep/.imgicon-zip{
        display: inline-block;
      width: 20px;
      margin-bottom: -3px;
      height: 20px;
      background-size: 100% 100%;
      margin-right: 10px;
      background-image: url("../../assets/zip.png") !important;
    }
  
  .tip{
    text-align: center;
    margin-bottom: 2vh;
  }
  a:hover{
    cursor: pointer;
  }

  </style>
