<template>
  <el-container class="all-container">
    <el-header class="header-container">
      <Login_nav></Login_nav>
    </el-header>
    <el-main>
      <div class="Examine_det">
        <div class="Examine_Introduce">
          <div class="Intro">
            <div class="position-name">
              <!-- 先写死 -->
              <span id="Title">{{ testName }}</span>
              <div class="hot-position-tags">
                <div class="deadline">截止时间：{{ ddl }}</div>
              </div>
            </div>
            <div class="statu">{{ status }}</div>
          </div>
          <div class="operation">
            <div class="organization-details">
              <div class="organization-details-name">
                <img
                  src="../../assets/sends_logo.png"
                  alt=""
                  style="width: 26px; height: 26px; border-radius: 50%"
                />
                <span class="organization-name">桑梓实验室</span>
                <div class="null"></div>
                <span class="organization-type">校级组织|互联网</span>
              </div>
            </div>
            <div class="position-operation">
              <el-button
                type="warning"
                style="background-color: #ffd74d; color: black"
                @click="talkTime"
                >联系一下</el-button
              >
            </div>
          </div>
          <div class="Examine-message">
            <span style="margin-left: 1vw">考核目的</span>
            <!-- 先写死 -->
            <el-card class="message">
              {{ testObject }}
            </el-card>
            <br />
            <span style="margin-left: 1vw">考核内容</span>
            <!-- 先写死 -->
            <el-card class="message">
              {{ testContent }}
            </el-card>
            <br />
            <span style="margin-left: 1vw">相关文件</span>
            <!-- 先写死 -->
            <el-card
              class="message"
              style="
                font-size: 15px;
                font-weight: 500;
                font-family: Source Han Sans SC VF;
              "
            >
              <i class="zip"></i>
              <!-- 这里应该是一个下载链接 之后具体看后端咋传，目前先写好下载方式-->
              <a :href="accessPath">{{ accessPath }}</a>
            </el-card>
            <br />
            <!-- action中的string之后改成上传的地址 -->
            <span style="margin-left: 0.5vw">考核提交</span>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="string"
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
                  font-size: 0.5rem;
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
                @click="submitUpload"
                style="
                  padding-left: 38px;
                  padding-right: 38px;
                  background-color: #ffd74d;
                  opacity: 0.8;
                  color: black;
                  line-height: 50%;
                "
                >提交考核</el-button
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
              <div class="tip" style="font-size: 1.5rem">考核已提交</div>
              <div class="tip" style="font-size: 0.2rem; font-weight: 500">
                {{ times }}秒后返回首页，<a
                  style="text-decoration: underline"
                  @click="returnHome"
                  >返回</a
                >
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
  
<script>
import { saveAs } from 'file-saver'
import VueSlickCarousel from 'vue-slick-carousel'
import positionCard from '../../components/positionCard.vue'
import CHeader from '../../components/CHeader.vue'
import axios from 'axios'
import Login_nav from '../../components/Login_nav.vue'

export default {
  components: { VueSlickCarousel, positionCard, CHeader, Login_nav },
  name: 'Examine_page',
  data() {
    return {
      //从后端接收
      //看是要{}还是[]
      fileList: [],
      // 不支持多选
      multiple: false,
      formData: '',
      times: 5,
      dialogVisible: false,
      aheadReturn: false,
      dialogWidth: '1080px',
      baseUrl: 'https://recruit.sends.cc/api/user/access/view',
      id: null,
      testName: null,
      status: null,
      ddl: null,
      address: null,
      cardData: [],
      testObject: null,
      testContent: null,
      accessPath: null,
      fileUrl: '',
    }
  },
  created() {
    this.setDialogWidth()
  },
  mounted() {
    this.id = this.$route.params.id
    this.status = this.$route.params.status
    // console.log(this.id)
    let posts = Number(this.id)
    let organization = 1
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }

    let data = {
      posts: posts,
      organization: organization,
    }

    let headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      token: localStorage.getItem('HQU_naxin'),
    }

    axios
      .post(this.baseUrl, data, { headers })
      .then((response) => {
        // 将从后端获取的数据填充到 cardData 对象中
        // console.log(response.data.data.name)
        this.testName = response.data.data.name
        this.ddl = this.formattedDateTime(response.data.data.ddl.seconds)
        this.testContent = response.data.data.content
        this.testObject = response.data.data.object
        this.accessPath = response.data.data.accessPath
      })
      .catch((error) => {
        console.error('Failed to fetch card data:', error)
      })
  },
  methods: {
    //限制只能提交zip格式
    formattedDateTime(seconds) {
      const milliseconds = seconds * 1000 // 转换为毫秒
      const date = new Date(milliseconds)
      // 获取月、日、小时、分钟
      const month = date.getMonth() + 1 // 月份从0开始，所以要加1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      // 格式化日期时间
      const formattedDate = `${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`

      return `${formattedDate} ${formattedTime}`
    },

    talkTime() {
      window.open('http://wpa.qq.com/msgrd?v=3&uin=384637134&site=qq&menu=yes')
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
    //点击上传文件触发的额外事件,清空fileList
    returnHome() {
      this.$router.replace('/')
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
    //点击上传文件触发的额外事件,清空fileList
    delFile() {
      this.fileList = []
    },

    handleChange(file, fileList) {
      this.fileList = fileList
      this.$nextTick(() => {
        let fileElementList = document.getElementsByClassName(
          'el-upload-list__item-name'
        )
        if (fileElementList && fileElementList.length > 0) {
          for (let ele of fileElementList) {
            let fileName = ele.innerText
            //获取文件名后缀
            let fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
            let iconElement = ele.getElementsByTagName('i')[0]
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
                  'https://recruit.sends.cc/api/file/userupload',
                  formData,
                  config
                )
                .then((res) => {
                  // console.log(res)
                  // console.log(res.data.data)
                  this.fileUrl = res.data.data
                  this.$message({
                    message: '文件上传成功！',
                    type: 'warning',
                  })
                })
                .catch((res) => {
                  this.$message({
                    message: '文件上传失败，请检查网络后重新上传！',
                    type: 'warning',
                  })
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
      // console.log('sb1')
      // console.log(file.file, "sb2");
    },
    //删除文件
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    // 点击文件
    handlePreview(file) {
      // console.log('sb2')
      // console.log(file);
    },

    //保存按钮
    submitUpload() {
      if (this.fileList.length != 0) {
        //自行添加数据到formData(使用键值对方式存储)
        let fileUrl = this.fileUrl
        let posts = Number(this.id)
        let formData = {
          organization: 1,
          path: fileUrl,
          posts: posts,
        }
        // console.log(formData.posts)
        let headers = {
          'Content-Type': 'application/json',
          accept: 'application/json',
          token: localStorage.getItem('HQU_naxin'),
        }

        axios
          .post('https://recruit.sends.cc/api/user/access/submit', formData, {
            headers,
          })
          .then((res) => {
            // console.log(res)
          })

        this.dialogVisible = true
        this.times = 5
        let that = this
        let interval = window.setInterval(function () {
          --that.times
          if (that.times === 0) {
            if (that.aheadReturn === false) {
              that.$router.replace('/Homepage')
              window.clearInterval(interval)
              window.close()
              that.dialogVisible = false //倒计时结束时运行的业务逻辑，这里的是关闭当前页面
            }
          }
        }, 1000)
      }
    },
    ChooseCollect() {
      //补充：给后端发
      this.isCollect = !this.isCollect
    },
  },
}
</script>
  
<style lang="less" scoped>
.Examine_det {
  height: 100%;
  // @media (max-width: 769px) {
  //     background-color: blue;
  // }
}
.Examine_Introduce {
  margin-left: 11vw;
  margin-right: 11vw;
  padding-top: 7vh;
  @media (max-width: 920px) {
    margin-left: 1vw;
    margin-right: 1vw;
  }
}
.Intro {
  display: flex;
  justify-content: space-between;
  padding-left: 15vw;
  padding-right: 15vw;
}
.position-name {
  #Title {
    font-family: Source Han Serif CN VF;
    font-size: 1.5rem;
    font-weight: 545;
    line-height: 0.5rem;
    letter-spacing: 0em;
    @media (max-width: 920px) {
      font-size: 1rem;
    }
  }
}
.deadline {
  margin-top: 1.5vh;
  padding: auto;
  color: #d0b65c;
  font-size: 15px;
}
.statu {
  font-family: Source Han Sans SC VF;
  font-size: 1.6rem;
  font-weight: 545;
  color: #d0b65c;
  @media (max-width: 920px) {
    font-size: 15px;
  }
}
.organization-details-name {
  font-size: 6px;
  font-weight: 600;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.collect-position {
  display: flex;
  font-family: Source Han Sans SC VF;
  // padding-top: 3vh;
  // margin-left: 48vw;
  font-size: 0.5rem;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #6e6e6e;
  .el-icon-star-on,
  .el-icon-star-off {
    padding-top: 0.1vh;
    margin-right: 1px;
    font-size: 18px;
    color: #ffd74d;
    opacity: 70%;
  }
}
.organization-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3vh;
  .null {
    padding: 0 4px;
  }
  .organization-name {
    padding-left: 3px;
    text-align: left;
    font-size: 1rem;
  }
  .organization-type {
    font-size: 12px;
    text-align: right;
    color: #bbbbbb;
    @media (max-width: 769px) {
      display: block;
      display: none;
    }
  }
}
.position-operation {
  .el-button {
    font-size: 1rem;
    line-height: 2px;
    height: 1.5rem;
    margin-top: 3vh;
    font-weight: 600;
    color: black;
    border-radius: 10px;
    opacity: 0.8;
  }
}
.operation {
  display: flex;
  margin-top: 2vh;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  justify-content: space-around;
  @media (max-width: 769px) {
    padding-left: 1vw;
    padding-right: 1vw;
  }
}
.Examine-message {
  padding-top: 5vh;
  padding-left: 14vw;
  padding-right: 13vw;
  font-family: Source Han Serif CN VF;
  font-size: 16px;
  font-weight: 500;
  line-height: 34px;
  color: #101010;
}
.message {
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  margin-right: 8vw;
  border-width: 1px;
  font-size: 0.7rem;
  width: 100%;
  // @media (max-width: 769px) {
  //   margin-right: 0;
  // }
}
.butn {
  width: 100%;
  margin-top: 8%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10%;
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
.zip {
  display: inline-block;
  width: 20px;
  margin-bottom: -5px;
  height: 20px;
  background-size: 100% 100%;
  margin-right: 3px;
  background-image: url('../../assets/zip.png') !important;
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
.download {
  display: inline-block;
  width: 20px;
  margin-bottom: -5px;
  height: 20px;
  background-size: 100% 100%;
  margin-right: 10px;
  background-image: url('../../assets/load.png') !important;
  margin-left: 10px;
  font-size: 18px;
}
.download:hover {
  background-image: url('../../assets/loadhover.png') !important;
}
</style>
  
