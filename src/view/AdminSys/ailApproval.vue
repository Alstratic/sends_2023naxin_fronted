<template>
  <div> 
    <p>申请列表</p>
    <div v-if="isLoading">loading</div>
    <div v-else class="ApplyText"> 
    <div > 
      <div class="application-list-top">
          <label v-for="(tag,index) in tags" :key="tag" :class="{'active': selectedTags[index]}" class="application-list-tag" @click="selectTag(index)">
                  {{ tag }}
          </label>
      </div>
    </div>
    <div class="message" style="overflow-x: scroll;">
      <template v-for="(v, i) in filteredStoreList" >
        <el-col :key="i" v-if='i%2 == 0' offset="5" class="message1" >
            <el-row  class="message2" >
                <div>{{filteredStoreList[i].name}}</div>
                <div>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">申请职位：</span>
                  <span style="font-size: 8px;font-weight: 400;">{{filteredStoreList[i].postsName}}</span>
                </div>
                <div>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">学号：</span>
                  <span style="font-size: 8px;font-weight: 400;margin-right: 2vw;">{{filteredStoreList[i].stuNum}}</span>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">联系电话：</span>
                  <span style="font-size: 8px;font-weight: 400;">{{filteredStoreList[i].phoneNum}}</span>
                </div>
                <div>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">QQ：</span>
                  <span style="font-size: 8px;font-weight: 400;margin-right: 2vw;">{{filteredStoreList[i].qq}}</span>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">邮箱：</span>
                  <span style="font-size: 8px;font-weight: 400;">{{filteredStoreList[i].email}}</span>
                </div>
                <div>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">自我介绍：</span>
                  <span style="font-size: 8px;font-weight: 400;">{{filteredStoreList[i].introduction}}</span>
                </div>
                <div v-show="filteredStoreList[i].hasOwnProperty('file')" style="font-size: 10px;margin-top: 3px;">
                  <i class="zip" ></i>
                  <!-- 这里应该是一个下载链接 之后具体看后端咋传，目前先写好下载方式-->
                  {{filteredStoreList[i].stuNum}}.zip
                  <i class="download" @click="loadFile(filteredStoreList[i].file)"></i>
                </div>
                <div>
                <div v-if="filteredStoreList[i].state===2" style="text-align: center;color: #D0B65C;margin-top: 6vh;font-size: 1.5rem;font-weight: 400;">
                    已拒绝该申请
                </div>
                <div v-else style="padding: 2vh;display: flex;flex-wrap: wrap;justify-content: space-between;">
                  <el-button v-show="(filteredStoreList[i].state===1||filteredStoreList[i].state===3)" @click="ChangeState(filteredStoreList[i].posts,filteredStoreList[i].stuNum,4)" type="warning" style="padding-left: 38px;padding-right: 38px;opacity: 0.8;color: black;line-height:50%;margin-top: 6px;" plain>进入考核</el-button>
                  <!-- <el-button v-show="filteredStoreList[i].state===5" type="warning" style="padding-left: 38px;padding-right: 38px;opacity: 0.8;color: black;line-height:50%;margin-top: 6px;" plain>发布个人考核</el-button> -->
                  <div v-show="filteredStoreList[i].state===3" style="color:#7E7E7E;margin-top: 2vh;">待面试</div>
                  <el-button v-show="filteredStoreList[i].state===1" @click="GoView(filteredStoreList[i].postsName,filteredStoreList[i].name,filteredStoreList[i].stuNum,filteredStoreList[i].posts)" type="warning" style="padding-left: 38px;padding-right: 38px; background-color: #FFD74D;opacity: 0.8;color: black;line-height:50% ;margin-left: 0px;margin-top: 6px;">安排面试</el-button>
                </div>
                <div v-show="filteredStoreList[i].state===4" style="margin-bottom: 1vh; text-align: center; color: #e4c85f;">
                    待考核
                </div>
                <div v-show="filteredStoreList[i].state===5" style="margin-bottom: 1vh; text-align: center; color: #e4c85f;">
                    考核中
                </div>
                <el-button v-show="(filteredStoreList[i].state===6)" @click="ChangeState(filteredStoreList[i].posts,filteredStoreList[i].stuNum,7)" type="warning" style="padding-left: 38px;padding-right: 38px;opacity: 0.8;color: black;line-height:50%;margin-top: 6px;" plain>同意录用</el-button>
                <el-button v-show="(filteredStoreList[i].state===6)" @click="ChangeState(filteredStoreList[i].posts,filteredStoreList[i].stuNum,8)" type="warning" style="padding-left: 38px;padding-right: 38px;opacity: 0.8;color: black;line-height:50%;margin-top: 6px;" >拒绝录用</el-button>
                
                <div v-show="filteredStoreList[i].state===6" style="margin-bottom: 1vh; text-align: center; color: #e4c85f;">
                    完成考核
                </div>
                <div v-if="filteredStoreList[i].state===2" @click="ChangeState(filteredStoreList[i].posts,filteredStoreList[i].stuNum,1)" style="cursor: pointer; text-align: center;font-size: 7px;color:#929292;" >
                    重置操作
                </div> 
                <!-- <el-dropdown v-if="filteredStoreList[i].state===2">
                  <span class="el-dropdown-link">
                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  @click.native="GoView">安排面试</el-dropdown-item>
                    <el-dropdown-item >进入考核</el-dropdown-item>
                    <el-dropdown-item >拒绝申请</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> -->
                <div v-else style="text-align: center;font-size: 7px;color:#929292;cursor: pointer;" @click="ChangeState(filteredStoreList[i].posts,filteredStoreList[i].stuNum,2)">拒绝此申请</div>
              </div>
              </el-row>
            <br/>
            <el-row  class="message2" v-if="i+1 < filteredStoreList.length">
              <div>
                <div>{{filteredStoreList[i+1].name}}</div>
                <div>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">申请职位：</span>
                  <span style="font-size: 8px;font-weight: 400;">{{filteredStoreList[i+1].postsName}}</span>
                </div>
                <div>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">学号：</span>
                  <span style="font-size: 8px;font-weight: 400;margin-right: 2vw;">{{filteredStoreList[i+1].stuNum}}</span>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">联系电话：</span>
                  <span style="font-size: 8px;font-weight: 400;">{{filteredStoreList[i+1].phoneNum}}</span>
                </div>
                <div>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">QQ：</span>
                  <span style="font-size: 8px;font-weight: 400;margin-right: 2vw;">{{filteredStoreList[i+1].qq}}</span>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">邮箱：</span>
                  <span style="font-size: 8px;font-weight: 400;">{{filteredStoreList[i+1].email}}</span>
                </div>
                <div>
                  <span style="font-size: 8px;color: #7E7E7E;font-weight: 200;">自我介绍：</span>
                  <span style="font-size: 8px;font-weight: 400;">{{filteredStoreList[i+1].introduction}}</span>
                </div>
                <div v-show="filteredStoreList[i+1].hasOwnProperty('file')" style="font-size: 10px;margin-top: 3px;">
                  <i class="zip" ></i>
                  <!-- 先用学号命名-->
                  {{filteredStoreList[i+1].stuNum}}.zip
                  <i class="download" @click="loadFile(filteredStoreList[i+1].file)"></i>
                </div>
              </div>
              <div>
                <div v-if="filteredStoreList[i+1].state===2" style="text-align: center;color: #D0B65C;margin-top: 6vh;font-size: 1.5rem;font-weight: 400;">
                    已拒绝该申请
                </div>
                <div v-else style="padding: 2vh;display: flex;flex-wrap: wrap;justify-content: space-between;">
                  <el-button v-show="(filteredStoreList[i+1].state===1||filteredStoreList[i+1].state===3)" @click="ChangeState(filteredStoreList[i+1].posts,filteredStoreList[i+1].stuNum,4)" type="warning" style="padding-left: 38px;padding-right: 38px;opacity: 0.8;color: black;line-height:50%;margin-top: 6px;" plain>进入考核</el-button>
                  <!-- <el-button v-show="filteredStoreList[i+1].state===5"  type="warning" style="padding-left: 38px;padding-right: 38px;opacity: 0.8;color: black;line-height:50%;margin-top: 6px;" plain>发布个人考核</el-button> -->
                  <div v-show="filteredStoreList[i+1].state===3" style="color:#7E7E7E;margin-top: 2vh;">待面试</div>
                  <el-button v-show="filteredStoreList[i+1].state===1" @click="GoView(filteredStoreList[i+1].postsName,filteredStoreList[i+1].name,filteredStoreList[i+1].stuNum,filteredStoreList[i+1].posts)" type="warning" style="padding-left: 38px;padding-right: 38px; background-color: #FFD74D;opacity: 0.8;color: black;line-height:50% ;margin-left: 0px;margin-top: 6px;">安排面试</el-button>
                </div>
                <div v-show="filteredStoreList[i+1].state===4" style="margin-bottom: 1vh; text-align: center; color: #e4c85f;">
                    待考核
                </div>
                <div v-show="filteredStoreList[i+1].state===5" style="margin-bottom: 1vh; text-align: center; color: #e4c85f;">
                    考核中
                </div>
                <el-button v-show="(filteredStoreList[i+1].state===6)" @click="ChangeState(filteredStoreList[i+1].posts,filteredStoreList[i+1].stuNum,7)" type="warning" style="padding-left: 38px;padding-right: 38px;opacity: 0.8;color: black;line-height:50%;margin-top: 6px;" plain>同意录用</el-button>
                <el-button v-show="(filteredStoreList[i+1].state===6)" @click="ChangeState(filteredStoreList[i+1].posts,filteredStoreList[i+1].stuNum,8)" type="warning" style="padding-left: 38px;padding-right: 38px;opacity: 0.8;color: black;line-height:50%;margin-top: 6px;" >拒绝录用</el-button>
                <div v-show="filteredStoreList[i+1].state===6" style="margin-bottom: 1vh; text-align: center; color: #e4c85f;">
                    完成考核
                </div>
                
                <div v-if="filteredStoreList[i+1].state===2" @click="ChangeState(filteredStoreList[i+1].posts,filteredStoreList[i+1].stuNum,1)" style="cursor: pointer; text-align: center;font-size: 7px;color:#929292;" >
                    重置操作
                </div> 
                <div v-else style="text-align: center;font-size: 7px;color:#929292;cursor: pointer;" @click="ChangeState(filteredStoreList[i+1].posts,filteredStoreList[i+1].stuNum,2)">拒绝此申请</div>
              </div>

            </el-row>
          </el-col>      
      </template>
    </div>
  </div>
  </div>




</template>

<script>
import Login_nav from '@/components/Login_nav.vue';
import axios from 'axios';
import {applicatioPost} from '../../api/index'
import {applicatioChange} from '../../api/index'
import {WaitChange} from '../../api/index'
export default{
  components:{Login_nav,axios},
  data(){
    return{
      isLoading: true,
        tags:['全部','待处理','待面试','待考核','考核中','完成考核','已录用','未录用','已拒绝'],
        indexValue:[0,1,3,4,5,6,7,8,2],
        selectedTags:[true,false,false,false,false,false,false,false,false],
        storeList:[],
        filteredStoreList: [],
        postApply:{
        posts:0,
        state:0,
        stu_num:''
      },
    }
  },
  methods:{
      showTag(index){
        if (index === 0) {
            // 全部标签被选中，显示所有已查看过的所有申请
            this.filteredStoreList = this.storeList.filter(item => item.hasOwnProperty('state'));
            console.log( this.filteredStoreList)
          } else if (index === 1) {
            // 待处理标签被选中，显示没有state=1的对象，在前面应聘名单就已显示
            this.filteredStoreList = this.storeList.filter(item => item.state === 1);
          } else if (index === 2) {
            // 待面试标签被选中，显示state=3的对象
            this.filteredStoreList = this.storeList.filter(item => item.state === 3);
          } else if (index === 3) {
            // 待考核标签被选中，显示state=4的对象
            this.filteredStoreList = this.storeList.filter(item => item.state === 4);
          } else if (index === 4) {
            // 考核中标签被选中，显示state=5的对象
            this.filteredStoreList = this.storeList.filter(item => item.state ===5);
          }
          else if (index === 5) {
            // 完成考核标签被选中，显示state=6的对象
            this.filteredStoreList = this.storeList.filter(item => item.state ===6);
          }
          else if (index === 6) {
            // 已录用标签被选中，显示state=7的对象
            this.filteredStoreList = this.storeList.filter(item => item.state ===7);
          }
          else if (index === 7) {
            // '未录用标签被选中，显示state=7的对象
            this.filteredStoreList = this.storeList.filter(item => item.state ===8);
          } else if (index === 8) {
            // '拒绝标签被选中，显示state=2的对象
            this.filteredStoreList = this.storeList.filter(item => item.state ===2);
          }
      },
      selectTag(index) {
          this.selectedTags = this.selectedTags.map((_, idx) => idx === index);
          console.log(this.selectedTags)
          this.showTag(index)
          sessionStorage.setItem('index',index)
      },
      loadFile(file){  
        console.log(file)
        // axios.get(file,{responseType:"blob"}).then((res)=>{
        //   saveAs(res.data)
        // })
        window.open(file, '_blank');
    },
    ChangeState(posts,stunum,state){
      this.postApply.posts=parseInt(posts)
      this.postApply.state=state
      this.postApply.stu_num=stunum
      applicatioChange(this.postApply).then(
          applicatioPost().then(res=>{
              console.log(res)
              console.log(1)
              this.storeList=res.data.data.allApplications  
              this.filteredStoreList = (
                sessionStorage.getItem('index') === '0' 
                  ? this.storeList.filter(item => item.hasOwnProperty('state'))
                  : this.storeList.filter(item => item.state === this.indexValue[sessionStorage.getItem('index')])
              )
              // this.filteredStoreList =(sessionStorage.getItem('index')===0? this.filteredStoreList = this.storeList.filter(item => item.hasOwnProperty('state')):this.storeList.filter(item => item.state === this.indexValue[sessionStorage.getItem('index')])) ;
          }),    
      )
      if(state===4||state===1){
        this.postApply.state=1
        WaitChange(this.postApply).then(res=>{
        })
      }
    },
    GoView(postsName,Name,stuNum,posts){
      sessionStorage.setItem('postsName',postsName)
      sessionStorage.setItem('posts',posts)
      sessionStorage.setItem('Name',Name)
      sessionStorage.setItem('stuNum',stuNum)
      this.$router.push('/admin/viewArra')
    }
  },
  mounted(){
    applicatioPost().then(res=>{
      console.log(res)
      this.storeList=res.data.data.allApplications
      this.filteredStoreList=this.storeList
      this.isLoading=false
    })
  }
}

</script>

<style lang="less" scoped>
 p{
  margin-left: 2vw;
      margin-top: 0px;
      font-family: Source Han Serif CN VF;
      font-size: 1.5rem;
      font-weight: 545;
      letter-spacing: 0em;
      @media (max-width: 720px) {
        font-size: 16px;
    }
    }
.ApplyText{
  display: flex;
    margin-left: 2vw;
    margin-right: 10vw;
    padding-top: 2vh;
    @media (max-width: 920px) {
      margin-left: 0vw;
      margin-right: 0vw;
    }
  }
.all-container{
height: 100%;
background-color: #909090;;
}
.application-list-top{
  margin-top: 2px;
  width: 100%;
  background-color: #fff;
  height: 10%;
  display: flex;
  flex-direction: column;
}

.application-list-tag{
  width: 4vw;
  text-align: center;
  border-radius: 15%;
  margin-top: 18px;
  background-color:#fff ;
  margin-right: 10px;
  border: #FFD74D 2px solid;
  padding-left: 5px;
  padding-right: 5px;

  @media (max-width: 769px) {
      margin-left:8px;
      padding: 0 2px;
  } 
}

.active{
  background-color: #FFD74D;
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.message{
  margin-top: 1vh;
    border: #ffd74d 1.5px solid;
    border-radius: 15px;
    border-width: 0px;
    font-size: 1rem;
    min-width: 100%;
    font-weight: 550;
    display: flex;
    // @media (max-width: 769px) {
    //   margin-right: 0;
    // }
}
.message1{
  margin-left:15px;
  padding: 15px;
  justify-content: space-between;  
  align-items: center;
  min-width:40%; 
  height: 130vh;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  border-width: 0px;
  font-size: 1rem;
  @media (max-width: 920px) {
    min-width: 100%; 
  }
}
.message2{
  margin-left:15px;
  padding: 15px;

  align-items: center;
  min-width: 20%; 
  height: 60vh;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  border-width: 1px;
  font-size: 1rem;
  @media (max-width: 920px) {
    min-width: 100%; 
  }
}
.zip{
  display: inline-block;
      width: 20px;
      margin-bottom: -5px;
      height: 20px;
      background-size: 100% 100%;
      margin-right: 3px;
      background-image: url("../../assets/zip.png") !important;
}
.download{
    display: inline-block;
      width: 20px;
      margin-bottom: -5px;
      height: 20px;
      background-size: 100% 100%;
      margin-right: 10px;
      background-image: url("../../assets/load.png") !important;
    margin-left: 10px;
    font-size:18px;
  }
  .download:hover{
    background-image: url("../../assets/loadhover.png") !important;
  }
</style>
