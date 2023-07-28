<template>
    <el-card class="box-card">
        <div class="hot-position-details">
        <span class="hot-position-name">{{positionName}}</span>
        <span class="hot-position-num">{{positionNum}}人</span>
        </div>
        <div class="hot-position-tags">
        <el-tag type="info" v-for="tag in tags" :key="tag">{{tag}}</el-tag>
        </div>
        <div class="organization-details">
        <div class="organization-details-name">
            <img :src="logo" alt="" style="width:23px;height: 23px;border-radius: 50%;">
            <span class="organization-name">{{organizationName}}</span>
            <div class="null"></div>
            <span class="organization-type">{{organizationType}}</span>
        </div>
        </div>
    </el-card>
</template>

<script>
export default{
    props: {
        positionName: String,
        positionNum: Number,
        tags: Array,
        logo: String,
        organizationName: String,
        organizationType: String,
  },
}
</script>

<style>
  .hot-position-cards {
  display: flex; /* 使用Flex布局，使el-card在同一行内显示 */
  justify-content: space-between;
  @media (max-width: 769px) {
    flex-direction: column;
  }
}

.box-card {
    width: 16rem;
    height: 10rem;
    border: #ffd74d 1.5px solid;
    border-radius: 15px;
    margin-left: 1.5vw;
    margin-right: 1.5vw;
    @media (max-width: 769px) {
      margin-right: 0;
    } 
  }
  
.organization-details{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top:3vh;
}

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
    text-align: left;
}

.organization-type{
    font-size: 6px;
    text-align: right;
    font-weight: 400;
}
.hot-position-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; /* 添加一些间距，根据需求调整 */
}
.el-tag{
    margin-right: 1vw;
    color:#6e6e6e;
    background-color: #e7e7e7;
    height: 2rem;
    width: 4vw;
    font-weight: 600;
    font-size: 6px;
}
</style>