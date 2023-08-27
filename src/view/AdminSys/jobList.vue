<template>
    <div class="container">
      <div class="ApplyText"> 
        <span>职位列表</span>
        <div v-if="isLoading">Loading</div>
        <div v-else class="message">
          <div class="message1" v-for="Position in PositionCard" :key="Position" @click="CheckCard(Position.id)">
            <div>
            <span style="font-size: 13px;font-weight: 600;margin-right: 3px;">{{Position.Name}}</span>
            <span style="font-size: 4px;color: #D0B65C;">{{Position.Nums}}人</span>
            </div>
           <p style="font-size: 15px; color:#7E7E7E;font-weight: 520;">{{Position.hasOwnProperty('State')?'已结束':'进行中'}}</p>
          </div>
        </div>  
      </div>
    </div>
  </template>
  <script>
  import {AdminSqure} from '../../api/index'
  export default {
    name: "jobList",
    data(){
      return{
        isLoading:true,
        PositionCard:[],
      }
    },
    created(){
      AdminSqure().then(res=>{
        this.PositionCard=res.data.data
        this.isLoading=false
      })
    },
    methods:{
      CheckCard(id){
        sessionStorage.setItem('id',id)
        this.$router.push('/jobDetails')
      }
    }
  };
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
  .message{
    margin-top: 2vh;
    min-height: 50vh;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  margin-right: 8vw;
  border-width: 1px;
  font-size: 0.7rem;
  width: 98%;
  display: flex;

flex-wrap: wrap;
  // @media (max-width: 769px) {
  //   margin-right: 0;
  // }
}

.message1{
  margin:5px;
  padding: 15px;
  height: 20vh;
  justify-content: space-between;  
  align-items: center;
  min-width: 45%;
  border: #ffd74d 1.5px solid;
  border-radius: 15px;
  border-width: 1px;
  font-size: 0.7rem;
  display: flex;
  @media (max-width: 920px) {
    width: 100%; 
  }
}
  </style>
   