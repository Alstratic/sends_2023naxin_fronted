<template>
  <div class="container">
    <div class="ApplyText"> 
        <span>面试安排</span>
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
          <el-input v-model="ruleForm.posts_name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item
          label="面试人"
          prop="name"
          :rules="[
            {required: true, trigger: 'blur'},
          ]"
          >
          <el-input v-model="ruleForm.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item
          label="学号"
          prop="stu_num"
          :rules="[
            {required: true, trigger: 'blur'},
          ]"
          >
          <el-input v-model="ruleForm.stu_num" :disabled="true"></el-input>
          </el-form-item>


          <el-form-item 
          label="面试时间"
          prop="time"
          >
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="待定">
            </el-date-picker>
          </div>`
          </el-form-item>
          <el-form-item
          label="面试地点"
          prop="address">
          <el-input v-model="ruleForm.address">
          </el-input>
          </el-form-item>
          <el-form-item  style="width: 60vw;" label="特别说明" prop="instructions" :rules="
            {trigger: 'blur'}" 
            >
            <el-input type="textarea" resize="none" :autosize="{ minRows: 4, maxRows:40}"  v-model="ruleForm.instructions">    
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
          <span style="font-size:2px;margin-left: 13px;color:#7E7E7E; font-family: Source Han Sans SC VF">面试相关文件</span>
        </el-upload>
        <div class="butn">
          <el-button type="warning" @click="Return" style="padding-left: 38px;padding-right: 38px;opacity: 0.8;color: black;line-height:50%;" plain>返回</el-button>
          <el-button type="warning"  @click="submitForm('ruleForm')" style="padding-left: 38px;padding-right: 38px; background-color: #FFD74D;opacity: 0.8;color: black;line-height:50% ;">安排面试</el-button>
        </div>
        <el-dialog class="dialog"
          :visible.sync="dialogVisible"
          :show-close= false            
          :close-on-click-modal= false            
          :close-on-press-escape= true            
          width="dialogWidth"         
          center>
          <div  class="tip" style="font-size:1rem; ">已安排面试</div> 
          <div class="tip" style="font-size:0.2rem; font-weight: 500;">{{times}}秒后返回至申请列表，<a style="text-decoration:underline;" @click="returnHome">返回</a></div> 
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
  import {AdminCreateView} from '../../api/index'
  import {applicatioChange} from '../../api/index'
  import axios from 'axios';
  export default {
    
    name:'Applications',
    components: { VueSlickCarousel,CHeader },
    data() {
      return {
        value1: '',
        fileList: [],
        // 不支持多选
        multiple: false,
        formData: "",
        times:5,
        dialogVisible:false,
        aheadReturn:false,
        dialogWidth: "1080px",
        postApply:{
          posts:0,
          state:0,
          stu_num:''
        },
        ruleForm: {
          address:'',
          instructions:'',
          name:'',
          organization_name:'桑梓实验室',
          path:'https://hqu-service-1309039959.cos.ap-shanghai.myqcloud.com/2023-08-19:06:09:58/2125103034.png',
          posts:0,
          posts_name:'',
          stu_num:'',
          time:''
          },
      };
      },
      watch: {
        value1(newValue) {
          if (newValue) {
            const formattedDate = moment(newValue).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
            this.ruleForm.time=formattedDate
            console.log(this.ruleForm.time);
            // 将符合 RFC3339 标准的日期时间格式发送到后端或进行其他操作
          }
        }
      },
      //改变弹出框自适应
      created() { 
        this.setDialogWidth() 
      },
      mounted() {
        this.ruleForm.posts_name=sessionStorage.getItem('postsName')
        this.ruleForm.name=sessionStorage.getItem('Name')
        this.ruleForm.stu_num=sessionStorage.getItem('stuNum')
        this.ruleForm.posts=parseInt(sessionStorage.getItem('posts'))
        window.onresize = () => {
          return (() => {
            this.setDialogWidth()
          })()
        }
      },
    methods: {
      Return(){
          this.$router.push('/admin/ailApproval')
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
      returnHome(){
        this.$router.replace('/admin/ailApproval') 
        this.aheadReturn=true
        window.clearInterval(interval)                    
        window.close();            
        this.dialogVisible = false;  //倒计时结束时运行的业务逻辑，这里的是关闭当前页面
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
                    this.ruleForm.path=res.data.data
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
      //自定义上传文件
      uploadFile (file) {
        this.formData.append("file", file.file);
        console.log("sb1");
        // console.log(file.file, "sb2");
      },
      //删除文件
      handleRemove (file, fileList) {
        // console.log(file, fileList);
      },
      // 点击文件
      handlePreview (file) {
        console.log("sb2");
        // console.log(file);
      }, 
      //保存按钮  提交文件这里可能得改
      onSubmit () {

        AdminCreateView(this.ruleForm).then(res=>{
          console.log(this.ruleForm)
          console.log(222)
          console.log(res)
          if(res.data.msg==='success'){
            this.postApply.posts=parseInt(sessionStorage.getItem('posts'))
            this.postApply.state=3
            this.postApply.stu_num=sessionStorage.getItem('stuNum')
            applicatioChange(this.postApply).then(res=>{
              console.log(res)
            })  
            this.dialogVisible=true;
            this.times = 5;            
            let that = this            
            let interval = window.setInterval(function () {                    
              --that.times                    
              if (that.times === 0) {     
                if(that.aheadReturn===false){
                  that.$router.replace('/admin/ailApproval')                                
                  window.clearInterval(interval)                    
                  window.close();            
                  that.dialogVisible = false;  //倒计时结束时运行的业务逻辑，这里的是关闭当前页面
                }  
              }            
          }, 1000) 
          }
          console.log(res)
        })
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
    // .upload-demo /deep/.imgicon-pptx {
    //   display: inline-block;
    //   width: 20px;
    //   margin-bottom: -3px;
    //   height: 20px;
    //   background-size: 100% 100%;
    //   margin-right: 10px;
    //   background-image: url(" ") !important;
    // }
    // .upload-demo /deep/ .imgicon-xlsx {
    //   display: inline-block;
    //   width: 20px;
    //   margin-bottom: -3px;
    //   height: 20px;
    //   background-size: 100% 100%;
    //   margin-right: 10px;
    //   background-image: url(" ") !important;
    // }
    // .upload-demo /deep/ .imgicon-default {
    //   display: inline-block;
    //   width: 20px;
    //   margin-bottom: -3px;
    //   height: 20px;
    //   background-size: 100% 100%;
    //   margin-right: 10px;
    //   background-image: url(" ") !important;
    // }
  
  .dialog{
    // border: #ffd74d 1.5px solid;
  
    // border-radius: 15px;
    font-weight: 550;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  /deep/ .el-dialog {
      // 取消阴影和背景色
      box-shadow: 0 1px 3px #FFD74D;
      opacity: 0.9;
    }
  
  .tip{
    text-align: center;
    margin-bottom: 2vh;
  }
  a:hover{
    cursor: pointer;
  }

  </style>
