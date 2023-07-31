<template>
    <el-container class="all-container">
        <!-- navigator的布局 -->
        <el-header class="header-container">
            <div class="header-navigator">
            <img src="../../assets/sends_logo.png" alt="">
            <span>华侨大学网络创新实验室</span>
            </div>
            <el-button type="warning" id="un-login">登录</el-button>
        </el-header>
        <!-- main区域 -->
        <el-main>
            <div class="all-position-tags">
                <div class="all-position-font">
                    <span class="all-position-font-detail">全部职位</span>
                </div>
                <div class="all-position-tags-detail">
                    <div class="position-tags-types-detail">
                        <span>组织分类</span>
                    </div>

                    <div class="position-tags-types-detail">
                        <span>组织类别</span>
                    </div>
                    <div class="position-tags-types-detail">
                        <span>职位分类</span>
                    </div>
                    <div class="position-tags-types-detail">
                        <span>招聘对象</span>
                    </div>
                    <div class="position-tags-types-detail">
                        <span>职位经验</span>
                    </div>
                </div>
                <div class="position-detail-tags">
                    <Positiontag
                    :tags="cardData.tags">
                    </Positiontag>
                    <Positiontag
                    :tags="cardData.tags">
                    </Positiontag>
                    <Positiontag
                    :tags="cardData.tags">
                    </Positiontag>
                    <Positiontag
                    :tags="cardData.tags">
                    </Positiontag>
                    <Positiontag
                    :tags="cardData.tags">
                    </Positiontag>
                </div>
            </div>


        </el-main>
    </el-container>
</template>

<script>
import Positiontag from '@/components/Positiontag.vue'
import axios from 'axios';

export default{
    components:{Positiontag},
    data(){
        return{
            cardData:{}
        }
    },
    mounted(){
    let that=this;
    axios.get('/api/cardData/1')
      .then(response => {
        // 将从后端获取的数据填充到 cardData 对象中
        that.cardData = response.data;
        console.log(response.data)
      })
      .catch(error => {
        console.error('Failed to fetch card data:', error);
      })
    }
}
</script>

<style>
/* navigator的样式 line 22-67*/
.all-container{
height: 100%;
background-color: #909090;
}

.header-container{
  height: 5%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
}

.header-navigator{
  display: flex;
  align-items: center;
  padding: 5px;


}

.header-navigator   img{
    height: 5%;
    width: 5%;
    border-radius: 50%;
}

.header-navigator   span{
font-family: 'Source Han Sans SC VF', sans-serif;
padding-left:8px;
display: inline-block;
line-height: 100%;
font-size: 1.3rem;
}

#un-login{
  color: black;
  background-color: #FFD74D;
  font-family: 'Source Han Sans SC VF', sans-serif;
  font-size: 14px;
  padding: 8px 14px;
  font-weight: 800;
  border: 0;
}
/* position-tags的样式 */
.all-position-tags{
    display: flex;
    width: 100%;
    background-color: #fff;
    padding-left: 15%;
    height: 40%;
    flex-wrap:wrap;
    flex-direction: row;
    @media (max-width: 769px) {
        padding-left: 7%;
    } 
}

.all-position-font {
  flex-basis: 100%; /* 将宽度设置为100%，使其占据整行 */
  font-size: 32px;
  font-weight: 500;
}

.all-position-tags-detail{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-bottom: 5%;
    white-space: nowrap; /* 添加这一行样式 */
}

.position-tags-types-detail{
    margin-top: 10px;
}

.position-tags-types-detail span{
    color: #929292;
    font-size: 18px;
    font-weight: 400;
    @media (max-width: 769px) {
        font-size: 16px;
    } 
}


</style>