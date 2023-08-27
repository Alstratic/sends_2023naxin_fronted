<template>
  <div class="container">
    <div class="ApplyText"> 
        <span>职位发布</span>
        <div class="row py-4 align-items-center"  style="font-size:15px;margin-top: 2vh;">
        <!--查询条件-->
        <div class="col-lg-12 col-md-12">
        <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm pl-5 ml-5" label-position="top" >
          <el-form-item
          label="招聘岗位"
          prop="name"
          :rules="[
          { required: true, trigger: 'blur'},
          ]"
          >
          <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item
          label="招聘人数"
          prop="nums"
          :rules="[
            {required: true, trigger: 'blur'},
            {pattern:/^[0-9]*$/,message: '*请输入数字',trigger: 'blur'}
          ]"
          >
          <el-input v-model="ruleForm.nums"></el-input>
          </el-form-item>
   <el-form-item 
          label="招聘对象"
          prop="object"
          >
          <el-select v-model="ruleForm.object">
              <el-option label="不限" value="不限"></el-option>
              <el-option label="大一" value="大一"></el-option>
              <el-option label="大二·" value="大二"></el-option>
              <el-option label="大三" value="大三"></el-option>
              <el-option label="大四" value="大四"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item
          label="职位分类"
          prop="classify">
          <el-select v-model="ruleForm.classify">
              <el-option label="互联网/电子技术" value="互联网/电子技术"></el-option>
              <el-option label="策划/管理" value="策划/管理"></el-option>
              <el-option label="新媒体/运营" value="新媒体/运营"></el-option>
              <el-option label="设计" value="设计"></el-option>
              <el-option label="其他" value="其他"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item
          label="职位经验"
          prop="experience">
          <el-select v-model="ruleForm.experience">
              <el-option label="无需经验" value="无需经验"></el-option>
              <el-option label="仅了解" value="仅了解"></el-option>
              <el-option label="熟悉" value="熟悉"></el-option>
              <el-option label="精通" value="精通"></el-option>
              <el-option label="不限" value="不限"></el-option>
          </el-select>
          </el-form-item>
           
          <el-form-item
          label="职位任务"
          prop="task"
          :rules="[
            {required: true,message: '*请输入内容', trigger: 'blur'},
            ]">
          <el-input type="textarea" resize="none" :autosize="{ minRows: 4, maxRows:40}"  v-model="ruleForm.task">  
          </el-input>
      
          </el-form-item>
          <el-form-item  label="面试通过回复结果模板" prop="interviews_pass_info" :rules="
            {trigger: 'blur'}" 
            >
            <el-input type="textarea" resize="none" :autosize="{ minRows: 4, maxRows:40}"  v-model="ruleForm.interviews_pass_info">    
            </el-input>
          </el-form-item>
          <el-form-item  label="面试未通过回复模板" prop="interviews_unpass_info" :rules="
            {trigger: 'blur'}" 
            >
            <el-input type="textarea" resize="none" :autosize="{ minRows: 4, maxRows:40}"  v-model="ruleForm.interviews_unpass_info">    
            </el-input>
          </el-form-item>
          <el-form-item  style="width: 60vw;" label="特别说明" prop="illustrate" :rules="
            {trigger: 'blur'}" 
            >
            <el-input type="textarea" resize="none" :autosize="{ minRows: 4, maxRows:40}"  v-model="ruleForm.illustrate">    
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
          <span style="font-size:2px;margin-left: 13px;color:#7E7E7E; font-family: Source Han Sans SC VF">职位相关文件</span>
        </el-upload>
        <div class="butn">
          <el-button type="warning"  @click="submitForm('ruleForm')" style="padding-left: 38px;padding-right: 38px; background-color: #FFD74D;opacity: 0.8;color: black;line-height:50% ;">提交申请</el-button>
        </div>
        <el-dialog class="dialog"
          :visible.sync="dialogVisible"
          :show-close= false            
          :close-on-click-modal= false            
          :close-on-press-escape= true            
          width="dialogWidth"         
          center>
          <div  class="tip" style="font-size:1rem; ">{{this.ruleForm.name}} 职位发布成功</div>
          <div class="tip" style="font-size:0.2rem; font-weight: 500;">{{times}}秒后返回首页，<a style="text-decoration:underline;" @click="returnHome">返回</a></div> 
        </el-dialog>
    </el-form>
  </div>
  </div>
    </div>
  
  
  </div>
  </template>
  <script>
  import CHeader from '@/components/CHeader.vue';
  import VueSlickCarousel from 'vue-slick-carousel'
  import {AdminPost} from '../../api/index'
  import {view} from '../../api/index'
  import axios from 'axios';
  export default {
    
    name:'Applications',
    components: { VueSlickCarousel,CHeader },
    data() {
      return {
        fileList: [],
        // 不支持多选
        multiple: false,
        formData: "",
        times:5,
        dialogVisible:false,
        aheadReturn:false,
        dialogWidth: "1080px",
        ruleForm: {
          classify:'互联网/电子技术',
          experience:'无需经验',
          file:'',
          illustrate:'',
          interviews_pass_info:'',
          interviews_unpass_info:'',
          name:'',
          nums:'',
          object:'不限',
          task:'',
          },
      };
      },
      //改变弹出框自适应
      created() { 
        this.setDialogWidth() 
      },
      mounted() {
        window.onresize = () => {
          return (() => {
            this.setDialogWidth()
          })()
        }
      },
    methods: {
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
        this.$router.replace('/FirstPage') 
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
            // if (['png','jpg','jpeg',".gif",'PNG','JPG','JPEG',"GIF"].indexOf(fileType) != -1) {
            //     iconElement.className = "imgicon-img" // 图⽚，动图
            //   } else if (['mp4','3gp','avi',"flv",'MP4','3GP','AVI',"FLV"].indexOf(fileType) != -1) {
            //     iconElement.className = 'imgicon-video' // 视频
            //   } else if (['doc','docx','DOC','DOCX'].indexOf(fileType) != -1) {
            //     iconElement.className = 'imgicon-docx' // 文档
            //   } else if (['xls','xlsx','XLS','XLSX'].indexOf(fileType) != -1) {
            //     iconElement.className = 'imgicon-xlsx' // 表格
            //   } else if (['ppt','pptx','PPT','PPTX'].indexOf(fileType) != -1) {
            //     iconElement.className = 'imgicon-pptx' // PPT
            //   } else if (['zip','ZIP'].indexOf(fileType) != -1) {
            //     iconElement.className = 'imgicon-zip' // 压缩包
            //   } else if (['pdf','PDF'].indexOf(fileType) != -1) {
            //     iconElement.className = 'imgicon-pdf' // PDF
            //   } else {
            //     iconElement.className = 'imgicon-default' //默认图标
            //   }
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
              axios.put("http://124.221.99.127:10810/file/adminupload", file, config).then(res => {
                   if(res.data.msg==='success'){
                      this.$message({
                      message: '上传成功!',
                      type: 'success'
                    });
                    this.ruleForm.file=res.data.data
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
        AdminPost(this.ruleForm).then(res=>{
          if(res.data.msg==='success'){
            this.dialogVisible=true;
            this.times = 5;            
            let that = this            
            let interval = window.setInterval(function () {                    
              --that.times                    
              if (that.times === 0) {     
                if(that.aheadReturn===false){
                  that.$router.replace('/FirstPage')                                
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
