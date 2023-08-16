<!-- 申请 -->
<template>
    <!-- Header区域 -->
    <div class="all-container">
        <CHeader :Examine="Examine" :Inter="Inter" :Apply="Apply" :Collect="Collect"></CHeader>
        <div class="application-list-top">
            <div class="application-list-font">
                <span class="application-list-font-detail">
                    申请列表    
                </span>
            </div>
            <div class="application-list-tags">
                <label v-for="(tag,index) in tags" :key="tag" :class="{'active':selectedTags[index]}" class="application-list-tag">
                    <input type="checkbox" v-model="selectedTags[index]" style="display: none" @click="toggleTag(index)">{{ tag }}
                </label>
            </div>
        </div>
        <div class="application-card-list">
                <Application_list_card
                :position-name="cardData.positionName"
                :status="cardData.Status"
                :tags="cardData.tags">
                </Application_list_card>
                <Application_list_card
                :position-name="cardData.positionName"
                :status="cardData.Status"
                :tags="cardData.tags">
                </Application_list_card>
                <Application_list_card
                :position-name="cardData.positionName"
                :status="cardData.Status"
                :tags="cardData.tags">
                </Application_list_card>
        </div>
    </div>
  
  </template>
  
  <script>
  import Login_nav from '@/components/Login_nav.vue';
  import axios from 'axios';
  import Application_list_card from '@/components/Application_list_card.vue';
  import CHeader from '@/components/CHeader.vue';
  export default{
    components:{
    Login_nav,
    axios,
    Application_list_card,
    CHeader
  },
    data(){
        return{
            tags:['全部','查看阶段','面试阶段','考核阶段','完成阶段'],
            selectedTags:[true,false,false,false,false],
            cardData:{},
        }
    },
    methods:{
        Examine(){  
      //这个路由回退会有点问题
        this.$router.push('/Examine_page')
    },
    Inter(){
        this.$router.push('/interview')
    },
    Apply(){
        this.$router.push('/Applications')
    },
    
    Collect(){
        // 跳收藏界面
    },
        toggleTag(index) {
            // 先判断是否有标签被选中
  
            if (this.selectedTags.includes(true)) {
                // 如果有标签被选中，则执行选中操作
                this.selectedTags = this.selectedTags.map((tag, idx) => (idx === index ? !tag : false));
            } else {
                // 如果没有标签被选中，则直接将点击的标签设置为选中状态（true）。
                this.selectedTags[index] = true;
            }
            console.log(this.selectedTags)
        }
    },
    mounted(){
        let that=this;
        axios.get('/api/cardData/11').then(response => {
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
  background-color: #fff;;
  }
  .application-list-top{
    margin-top: 15px;
    display: flex;
    width: 100%;
    background-color: #fff;
    margin-left: 20vw;
    height: 10%;
    flex-wrap:wrap;
    flex-direction: row;
    @media (max-width: 920px) {
        margin-left: 6vw;
    } 
  }
  
  .application-list-font {
   
  flex-basis: 100%; /* 将宽度设置为100%，使其占据整行 */
  font-size: 25px;
  font-weight: 500;
  }
  
  .application-list-tags{
    display: flex;
    justify-content: space-between;
  }
  
  .application-list-tag{
    text-align: center;
    border-radius: 15%;
    margin-top: 10px;
    background-color:#fff ;
    margin-right: 4px;
    border: #FFD74D 2px solid;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 2px;
    @media (max-width: 769px) {
        margin-left:8px;
        padding: 0 2px;
    } 
  }
  
  .active{
    background-color: #FFD74D;
    transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  .application-card-list{
    margin-top: 30px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .el-card_body{
    padding: 13px;
  }
  </style>
  