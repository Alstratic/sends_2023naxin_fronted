<template>
  <el-card class="box-card" >
    <div @click="cardClick">
      <div class="hot-position-details">
        <span class="hot-position-name">{{positionName}}       {{positionNum}}人</span>
        <!-- <span class="hot-position-num">{{positionNum}}人</span> -->
      </div>
      <div class="hot-position-tags">
        <span class="hot-position-tag" v-for="tag in tags" :key="tag">{{tag}}</span>
      </div>
      <div class="organization-details">
        <div class="organization-details-name">
            <img :src="logo" alt="" style="width:23px;height: 23px;border-radius: 50%;">
            <span class="organization-name">{{organizationName}}</span>
            <div class="null"></div>
            <span class="organization-type">{{OrganizationCategory}} | {{ organizationClassify }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default{
  props: {
      positionName: String,
      positionNum: String,
      tags: Array,
      logo: String,
      organizationName: String,
      OrganizationCategory: String,
      organizationClassify:String,
      id:Number
  },
  methods:{
    cardClick(){
      console.log(this.id);
      this.$router.push({name:'Position_detailes',params:{id:this.id}});
    }
  },
}
</script>

<style scoped lang="less">
.box-card {
  width: 26vw;
 
  border: #ffd74d 1.5px solid !important;
  border-radius: 15px !important;
  margin-left: 1.5vw;
  margin-right: 1.5vw;
  margin-top:3vh ;
  @media (max-width: 769px) {
    margin-right: 0;
    width: 65vw;
  } 
}

.organization-details{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top:6vh;
  @media (max-width: 769px) {
    margin-top:3vh;
  } 
}

.organization-details-name{
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 769px) {
    font-size: 6px;
  } 
}

.null{
  padding: 0 4px;
}

.organization-name{
  text-align: left;
}

.organization-type{
  font-size: 16px;
  text-align: right;
  font-weight: 400;
  @media (max-width: 769px) {
    font-size: 6px;
  } 
}
.hot-position-details {
display: flex;
justify-content: space-between;
margin-bottom: 10px; /* 添加一些间距，根据需求调整 */
}
.hot-position-name{
font-weight: 600;
font-size: 24px;
@media (max-width: 769px) {
    font-size: 18px;
  } 
}
.hot-position-num{
  font-size: 24px;
  @media (max-width: 769px) {
    font-size: 18px;
  } 
}
.hot-position-tag{
margin-right: 1vw;
color:#6e6e6e;
background-color: #e7e7e7;
height: 2rem;
width: 4vw;
font-weight: 400;
border-color: #d9ecff;
height: 32px;
padding: 0 3px;
line-height: 30px;
border-width: 1px;
border-style: solid;
border-radius: 4px;
box-sizing: border-box;
white-space: nowrap;
font-size: 14px;
@media (max-width: 769px) {
  font-size: 6px;
  } 
}
</style>
