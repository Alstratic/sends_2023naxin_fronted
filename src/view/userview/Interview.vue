<template>
  <!-- 面试详情 -->
  <el-container class="all-container">
    <el-header class="header-container">
      <Login_nav></Login_nav>
    </el-header>

    <el-main>
      <div class="Position_det">
        <div class="Position_Introduce">
          <div class="Intro">
            <div class="position-name">
              <!-- 先写死 -->
              <span id="Title">{{ positionName }}</span>
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
                style="background-color: #ffd74d"
                @click="talkTime"
                >联系一下</el-button
              >
            </div>
          </div>
          <div class="position-message">
            <span style="margin-left: 1vw">面试信息</span>
            <!-- 先写死 -->
            <el-card class="message">
              面试时间：{{ time }}
              <br />
              面试地点:{{ address }}
              <br />
              特殊说明:
              <br />
            </el-card>
            <br />
            <div class="butn">
              <el-button
                type="warning"
                @click="abandonView"
                style="
                "
                plain
                >放弃面试</el-button
              >
              <el-button
                type="warning"
                @click="talkTime"
                style="
                  background-color: #ffd74d;
                  opacity: 0.8;
                "
                >协调时间</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
  
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import positionCard from '../../components/positionCard.vue'
import axios from 'axios'
import Login_nav from '../../components/Login_nav.vue'

export default {
  components: { VueSlickCarousel, positionCard, Login_nav },
  name: 'Position_detailes',
  data() {
    return {
      //从后端接收
      Isdisplay: true,
      isCollect: false,
      cardData: {},
      id: null,
      positionName: null,
      status: null,
      time: null,
      address: null,
      baseUrl: 'https://recruit.sends.cc/api/user/wait/abandon',
    }
  },
  methods: {
    //放弃面试
    abandonView() {
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
          this.$router.replace('/')

          axios
            .post(this.baseUrl, data, { headers })
            .then((response) => {
              // 将从后端获取的数据填充到 cardData 对象中
              // console.log(response)
            })
            .catch((error) => {
              console.error('Failed to fetch card data:', error)
            })
        })
        .catch(() => {})
    },
    //协调时间
    talkTime() {
      window.open('http://wpa.qq.com/msgrd?v=3&uin=384637134&site=qq&menu=yes')
    },

    ChooseCollect() {
      //补充：给后端发
      this.isCollect = !this.isCollect
    },
  },

  mounted() {
    let that = this
    this.id = this.$route.params.id
    this.positionName = this.$route.params.positionName
    this.status = this.$route.params.status
    this.time = this.$route.params.time
    this.address = this.$route.params.address
  },
}
</script>
  
<style lang="less" scoped>
.Position_det {
  height: 100%;
  // @media (max-width: 769px) {
  //     background-color: blue;
  // }
}
.statu {
  font-family: Source Han Sans SC VF;
  font-size: 1.6rem;
  font-weight: 545;
  color: #d0b65c;
  @media (max-width: 920px) {
    font-size: 1.4rem;
  }
}
.Position_Introduce {
  margin-left: 15vw;
  margin-right: 15vw;
  padding-top: 7vh;
  @media (max-width: 920px) {
    margin-left: 3vw;
    margin-right: 3vw;
  }
}
.Intro {
  display: flex;
  justify-content: space-around;
}
.position-name {
  #Title {
    font-family: Source Han Serif CN VF;
    font-size: 1.5rem;
    font-weight: 545;
    line-height: 0.5rem;
    letter-spacing: 0em;
  }
}
.el-tag {
  margin-right: 1vw;
  margin-top: 2vh;
  padding: auto;
  color: #6e6e6e;
  background-color: #e7e7e7;
  height: 18px;
  // width: 45px; 宽度不要指明，让文字撑开
  font-weight: 600;
  font-size: 0.5rem;
  line-height: 15px;
}
.position-num {
  font-family: Source Han Sans SC VF;
  font-size: 2rem;
  font-weight: 545;
}
.organization-details-name {
  font-size: 6px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
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
  .organization-details-name {
    font-size: 6px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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
.operation {
  display: flex;
  margin-top: 4vh;
  justify-content: space-around;
}
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
.position-message {
  padding-top: 5vh;
  padding-left: 10vw;
  padding-right: 8vw;
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
.recommend-positions {
  padding-top: 5vh;
}
.recommend-position-font {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 25px;
  font-weight: 500;
  font-family: 'Source Han Serif CN VF';
}
.recommend-position-cards {
  margin-top: 2vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.butn {
  width: 100%;
  margin-top: 8%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10%;
}
</style>
  
