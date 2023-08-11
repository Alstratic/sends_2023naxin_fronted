<template>
    <el-container class="all-container">
        <!-- navigator的布局 -->
        <el-header class="header-container">
            <Login_nav></Login_nav>
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
                    <div>
                        <Positiontag
                        :tags="cardData.tags">
                        </Positiontag>
                    </div>
                    <div>
                        <Positiontag
                        :tags="cardData.tags">
                        </Positiontag>
                    </div>
                    <div>
                        <Positiontag
                        :tags="cardData.tags">
                        </Positiontag>
                    </div>
                    <div>
                        <Positiontag
                        :tags="cardData.tags">
                        </Positiontag>
                    </div>
                    <div>
                        <Positiontag
                        :tags="cardData.tags">
                        </Positiontag>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div class="position-cards">
                <div class="row-card">
                    <HotPositionCard
                    :key="cardData.index"
                    :position-name="cardData.positionName"
                    :position-num="cardData.positionNum"
                    :tags="cardData.tags"
                    :logo="cardData.logo"
                    :organization-name="cardData.organizationName"
                    :organization-type="cardData.organizationType"
                    />

                    <HotPositionCard
                    :key="cardData.index"
                    :position-name="cardData.positionName"
                    :position-num="cardData.positionNum"
                    :tags="cardData.tags"
                    :logo="cardData.logo"
                    :organization-name="cardData.organizationName"
                    :organization-type="cardData.organizationType"
                    />
                </div>
                <div class="row-card">
                    <HotPositionCard
                    :key="cardData.index"
                    :position-name="cardData.positionName"
                    :position-num="cardData.positionNum"
                    :tags="cardData.tags"
                    :logo="cardData.logo"
                    :organization-name="cardData.organizationName"
                    :organization-type="cardData.organizationType"
                    />

                    <HotPositionCard
                    :key="cardData.index"
                    :position-name="cardData.positionName"
                    :position-num="cardData.positionNum"
                    :tags="cardData.tags"
                    :logo="cardData.logo"
                    :organization-name="cardData.organizationName"
                    :organization-type="cardData.organizationType"
                    />
                </div>

            </div>

        </el-main>
    </el-container>
</template>

<script>
import Positiontag from '@/components/Positiontag.vue'
import axios from 'axios';
import HotPositionCard from '@/components/HotPositionCard.vue';
import Login_nav from '@/components/Login_nav.vue';

export default{
    components:{Positiontag,HotPositionCard,Login_nav},
    data(){
        return{
            cardData:{},
            tagsData:{},
        }
    },
    mounted(){
        let that=this;
        axios.get('/api/cardData/1').then(response => {
            // 将从后端获取的数据填充到 cardData 对象中
            that.cardData = response.data;
        }).catch(error => {
            console.error('Failed to fetch card data:', error);
        })
    }
}
</script>

<style scoped lang="less">
.all-container{
height: 100%;
background-color: #fff;
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
    font-size: 20px;
    font-weight: 400;
    @media (max-width: 769px) {
        font-size: 16px;
    } 
}

.position-cards{
    display: flex;
    justify-content: center;
    height: 80%;
    background-color: #fff;
    flex-wrap: wrap;
    @media (max-width:769px) {
        display: block;
    }
}

.row-card{
    display: flex;
}

.el-card.box-card.is-always-shadow {
    
    @media (max-width:769px) {
        width: 50%;
        height: 32%;
    }
}

</style>