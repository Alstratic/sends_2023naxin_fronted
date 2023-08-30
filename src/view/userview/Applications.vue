<template>
  <el-container class="all-container">
    <el-header class="header-container">
      <Login_nav></Login_nav>
    </el-header>
    <el-main>
      <div class="container">
        <div class="ApplyText">
          <span>申请面试</span>
          <div class="row py-4 align-items-center" style="font-size: 15px">
            <!--查询条件-->
            <div class="col-lg-12 col-md-12">
              <div class="py-3 text-center1">
                <p class="lead">面试职位</p>
                <p class="tet">{{ ChoosePosition }}</p>
              </div>
              <el-form
                :model="ruleForm"
                ref="ruleForm"
                label-width="150px"
                class="demo-ruleForm pl-5 ml-5"
                label-position="top"
              >
                <el-form-item
                  label="姓名"
                  prop="inputName"
                  :rules="[
                    {
                      required: true,
                      min: 2,
                      max: 100,
                      message: '请正确输入姓名',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input v-model="ruleForm.inputName"></el-input>
                </el-form-item>
                <el-form-item
                  label="学号"
                  prop="stuNum"
                  :rules="[
                    {
                      required: true,
                      min: 10,
                      max: 11,
                      message: '*学号错误，请检查输入',
                      trigger: 'blur',
                    },
                    {
                      pattern: /^[0-9]*$/,
                      message: '*学号错误，请检查输入',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input v-model="ruleForm.stuNum"></el-input>
                </el-form-item>

                <el-form-item
                  label="电话号码"
                  prop="phoneNumber"
                  :rules="[
                    {
                      required: true,
                      min: 11,
                      max: 11,
                      message: '*电话号码错误，请检查输入',
                      trigger: 'blur',
                    },
                    {
                      pattern: /^[0-9]*$/,
                      message: '*电话号码错误，请检查输入',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input v-model="ruleForm.phoneNumber"></el-input>
                </el-form-item>

                <el-form-item label="QQ" prop="QQNumber">
                  <el-input v-model="ruleForm.QQNumber"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="Email">
                  <el-input v-model="ruleForm.Email"></el-input>
                </el-form-item>
                <el-form-item
                  class="Self"
                  label="自我介绍"
                  prop="desc"
                  :rules="[
                    { required: true, message: '*请输入内容', trigger: 'blur' },
                  ]"
                >
                  <el-input
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 10, maxRows: 40 }"
                    v-model="ruleForm.desc"
                    placeholder="介绍一下自己吧~"
                  >
                  </el-input>
                </el-form-item>
                <!-- action中的string之后改成上传的地址 -->
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action
                  :file-list="fileList"
                  :auto-upload="false"
                  :http-request="uploadFile"
                  :on-change="handleChange"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :multiple="multiple"
                  style="height: 10vh"
                >
                  <el-button
                    slot="trigger"
                    size="small"
                    type="warning"
                    plain
                    @click="delFile"
                    >上传附件</el-button
                  >
                  <span
                    style="
                      font-size: 2px;
                      margin-left: 13px;
                      color: #7e7e7e;
                      font-family: Source Han Sans SC VF;
                    "
                    >上传个人简历，作品等</span
                  >
                </el-upload>
                <div class="butn">
                  <el-button
                    type="warning"
                    @click="submitForm('ruleForm')"
                    style="
                      padding-left: 38px;
                      padding-right: 38px;
                      background-color: #ffd74d;
                      opacity: 0.8;
                      color: black;
                      line-height: 50%;
                    "
                    >提交申请</el-button
                  >
                </div>
                <el-dialog
                  class="dialog"
                  :visible.sync="dialogVisible"
                  :show-close="false"
                  :close-on-click-modal="false"
                  :close-on-press-escape="true"
                  width="dialogWidth"
                  center
                >
                  <div class="tip" style="font-size: 1rem">
                    {{ this.ChoosePosition }} 职位申请已提交
                  </div>

                  <div class="tip" style="font-size: 0.9rem">
                    请等待组织负责人联系
                  </div>

                  <div class="tip" style="font-size: 0.2rem; font-weight: 500">
                    {{ times }}秒后返回首页，<a
                      style="text-decoration: underline"
                      @click="returnHome"
                      >返回</a
                    >
                  </div>
                </el-dialog>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
  <script>
import CHeader from '@/components/CHeader.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import { userupload } from '../../api/index'
import { view } from '../../api/index'
import axios from 'axios'
import Login_nav from '@/components/Login_nav.vue'
export default {
  name: 'Applications',
  components: { VueSlickCarousel, CHeader, Login_nav },
  data() {
    return {
      id: String,
      data1: '',
      fileList: [],
      // 不支持多选
      multiple: false,
      formData: '',
      times: 5,
      dialogVisible: false,
      aheadReturn: false,
      dialogWidth: '1080px',
      ChoosePosition: String,
      fileUrl: '',
      ruleForm: {
        inputName: '',
        stuNum: '',
        phoneNumber: '',
        QQNumber: '',
        Email: '',
        desc: '',
        file: '',
      },
    }
  },
  //改变弹出框自适应
  created() {
    this.setDialogWidth()
  },
  mounted() {
    let that = this
    this.id = this.$route.params.id
    this.ChoosePosition = this.$route.params.positionName
    console.log(this.$route.params.id)
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
  },
  methods: {
    gh() {
      view(0).then((res) => {
        console.log(res)
        this.data1 = res
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //通过表单验证，再启动提交
          this.onSubmit()
        } else {
          return false
        }
      })
    },
    returnHome() {
      this.$router.replace('/user/homepage')
      this.aheadReturn = true
      window.clearInterval(interval)
      window.close()
      this.dialogVisible = false //倒计时结束时运行的业务逻辑，这里的是关闭当前页面
    },
    setDialogWidth() {
      var val = document.body.clientWidth
      const def = 1080 // 默认宽度
      if (val < def) {
        this.dialogWidth = '100%'
      } else {
        this.dialogWidth = def + 'px'
      }
    },
    // 点击上传文件触发的额外事件,清空fileList
    delFile() {
      this.fileList = []
    },
    // 文件上传
    handleChange(file, fileList) {
      this.fileList = fileList
      this.$nextTick(() => {
        let fileElementList = document.getElementsByClassName(
          'el-upload-list__item-name'
        )
        console.log(fileElementList)
        if (fileElementList && fileElementList.length > 0) {
          for (let ele of fileElementList) {
            let fileName = ele.innerText
            //获取文件名后缀
            let fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
            let iconElement = ele.getElementsByTagName('i')[0]
            // 仅支持zip文件
            if (['zip', 'ZIP'].indexOf(fileType) != -1) {
              iconElement.className = 'imgicon-zip' // 压缩包
              let formData = new FormData()
              formData.append('file', this.fileList[0].raw) //拿到存在fileList的文件存放到formData中
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  token: localStorage.getItem('HQU_naxin'),
                },
              }
              axios
                .put(
<<<<<<< HEAD
                  'http://124.221.99.127:10810/file/userupload',
=======
                  'https://recruit.sends.cc/api/file/userupload',
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
                  formData,
                  config
                )
                .then((res) => {
                  console.log(res)
                  console.log(res.data.data)
                  this.fileUrl = res.data.data
                })
                .catch((res) => {
                  console.log(res)
                })
            } else {
              this.delFile()
              this.$message({
                message: '文件类型只能是zip格式!',
                type: 'warning',
              })
            }
          }
        }
      })
    },
    //自定义上传文件
    uploadFile(file) {
      this.formData.append('file', file.file)
      console.log('sb1')
      // console.log(file.file, "sb2");
    },
    //删除文件
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    // 点击文件
    handlePreview(file) {
      console.log('sb2')
      // console.log(file);
    },
    //保存按钮  提交申请
    onSubmit() {
      let postID = Number(this.id)
      let positionName = this.ChoosePosition
      let fileUrl = this.fileUrl
      let formData = {
        name: this.ruleForm.inputName,
        stu_num: this.ruleForm.stuNum,
        phone_num: this.ruleForm.phoneNumber,
        qq: this.ruleForm.QQNumber,
        email: this.ruleForm.Email,
        introduction: this.ruleForm.desc,
        path: 'https://hqu-service-1309039959.cos.ap-shanghai.myqcloud.com/2023-08-19:06:09:58/2125103034.png', // 请确保路径正确
        posts: postID,
        posts_name: positionName,
        organization: 1,
        organization_name: '桑梓实验室',
        file: fileUrl,
      }
      console.log(formData)
      console.log(localStorage.getItem('HQU_naxin'))

      let headers = {
        'Content-Type': 'application/json',
        accept: 'application/json',
        token: localStorage.getItem('HQU_naxin'),
      }

      axios
        .post(
<<<<<<< HEAD
          'http://124.221.99.127:10810/user/applications/submit',
=======
          'https://recruit.sends.cc/api/user/applications/submit',
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
          formData,
          { headers }
        )
        .then((res) => {
          console.log(res)
        })
<<<<<<< HEAD
      this.dialogVisible = true
      this.times = 5
      let that = this
      let interval = window.setInterval(function () {
        --that.times
        if (that.times === 0) {
          if (that.aheadReturn === false) {
            that.$router.replace('/')
            window.clearInterval(interval)
            window.close()
            that.dialogVisible = false //倒计时结束时运行的业务逻辑，这里的是关闭当前页面
          }
        }
      }, 1000)
    },
=======
        this.dialogVisible=true;
          this.times = 5;            
          let that = this            
          let interval = window.setInterval(function () {                    
            --that.times                    
            if (that.times === 0) {     
              if(that.aheadReturn===false){
                that.$router.replace('/')                                
                window.clearInterval(interval)                    
                window.close();            
                that.dialogVisible = false;  //倒计时结束时运行的业务逻辑，这里的是关闭当前页面
              }  
            }            
        }, 1000) 
    },
    
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
  },
}
</script>
  
  <style lang="less" scoped>
.container {
  height: 100%;
}
.ApplyText {
  margin-left: 26vw;
  margin-right: 23vw;
  padding-top: 7vh;
  @media (max-width: 920px) {
    margin-left: 6vw;
    margin-right: 3vw;
  }
  span {
    font-family: Source Han Serif CN VF;
    font-size: 1.5rem;
    font-weight: 545;
    line-height: 0.5rem;
    letter-spacing: 0em;
  }
}
.lead {
  margin-top: 5vh;
  font-size: 0.5rem;
  color: #7e7e7e;
}
.tet {
  margin-top: 1vh;
  font-weight: 545;
}
.el-form-item {
  width: 40%;
  margin-right: 6%;
}
.el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/deep/.el-input__inner {
  border: 1px solid #ffd74db2;
}
/deep/.el-input__inner {
  border: 1px solid #ffd74db2;
}
/deep/.el-input__inner:focus {
  border: 1px solid #ffd74db2;
  box-shadow: 0 0 2.5px #ffd74db2;
}
/deep/.el-input__inner:hover {
  border: 1px solid #ffd74db2;
}
/deep/.el-textarea__inner {
  width: 100%;
  border: 1px solid #ffd74db2;
}
/deep/.el-textarea__inner:focus {
  border: 1px solid #ffd74db2;
  box-shadow: 0 0 2.5px #ffd74db2;
}
/deep/.el-textarea__inner:hover {
  border: 1px solid #ffd74db2;
}
/deep/.el-textarea__inner {
  border: 1px solid #ffd74db2;
}
.Self {
  width: 100%;
}
.butn {
  width: 100%;
  margin-top: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20%;
}

.upload-demo/deep/.imgicon-video {
  display: inline-block;
  width: 20px;
  margin-bottom: -3px;
  height: 20px;
  background-size: 100% 100%;
  margin-right: 10px;
  background-image: url('../../assets/file-mp4.png');
}
.upload-demo/deep/.imgicon-img {
  display: inline-block;
  width: 20px;
  margin-bottom: -3px;
  height: 20px;
  background-size: 100% 100%;
  margin-right: 10px;
  background-image: url('../../assets/pic.png');
}
.upload-demo /deep/.imgicon-pdf {
  display: inline-block;
  width: 20px;
  margin-bottom: -3px;
  height: 20px;
  background-size: 100% 100%;
  margin-right: 10px;
  background-image: url('../../assets/PDF.png') !important;
}
.upload-demo /deep/.imgicon-docx {
  display: inline-block;
  width: 20px;
  margin-bottom: -3px;
  height: 20px;
  background-size: 100% 100%;
  margin-right: 10px;
  background-image: url('../../assets/word.png') !important;
}
.upload-demo /deep/.imgicon-zip {
  display: inline-block;
  width: 20px;
  margin-bottom: -3px;
  height: 20px;
  background-size: 100% 100%;
  margin-right: 10px;
  background-image: url('../../assets/zip.png') !important;
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

.dialog {
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
  box-shadow: 0 1px 3px #ffd74d;
  opacity: 0.9;
}

.tip {
  text-align: center;
  margin-bottom: 2vh;
}
a:hover {
  cursor: pointer;
}
</style>
