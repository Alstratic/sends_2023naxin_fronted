<template>
  <el-header class="header-container">
        <div class="header-navigator">
          <img src="../assets/sends_logo.png" alt="">
          <span>华侨大学网络创新实验室</span>
        </div>
        <ul>
            <li >
              <a href="#" @click="GoExamine">考核</a>
            </li>
            <li>
              <a href="#" @click="GoInter">面试</a>
            </li>
            <li>
              <a href="#" @click="GoApply">申请</a>
            </li>
            <li>
              <a href="#" @click="GoCollect">收藏</a>
            </li>
            
            <li>
              <a href="#" ><img class="Ig" src="../assets/sends_logo.png" alt=""></a>
            </li>
        </ul>  
      </el-header>
</template>
<script>
export default {
  props:['Examine','Inter','Apply','Collect'],
     methods:{
        GoExamine(){
            this.Examine()
        },
        GoInter(){
            this.Inter()
        },
        GoApply(){
            this.Apply()
        },
        GoCollect(){
             this.Collect()
        }
     }
}
</script>

<style lang="less" scoped>

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
  // padding: 5px;
  @media (max-width: 920px) {
    width: 36%;
    
  }
  img{
    height: 5%;
    width: 5%;
    border-radius: 50%;
    @media (max-width: 920px) {
      height: 12%;
      width: 12%;
  }
  }
  span{
    font-family: 'Source Han Sans SC VF', sans-serif;
    padding-left:8px;
    display: inline-block;
    line-height: 100%;
    font-size: 1.3rem;
    @media (max-width: 920px) {
      font-size: 1vw;
      // display: block;
      // display: none;
  }
  }
}
ul{
  display: flex;
  flex: 1;
  width: 100%;
  li{
    list-style: none;
  }
  a{
    color:black;
    display: block; /* 把链接显示为块元素可使整个链接区域可点击 */
    text-align: center;
    padding-left: 5rem;
    overflow: hidden;
    text-decoration: none; /* 去除下划线 */
    @media (max-width: 769px) {
      font-size: 2vw;
      padding: 1vw;
  }
  }
}
.Ig{
  padding: auto;
  width: 20px;
  height: 20px;

}
</style>