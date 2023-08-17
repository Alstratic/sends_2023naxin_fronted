<template>
  <el-header class="header-container">
      <div class="header-navigator">
        <img src="../assets/sends_logo.png" alt="">
        <span>华侨大学网络创新实验室</span>
      </div>
      <div>组织版</div>
    </el-header>
</template>
<script>
export default {

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
/* padding: 5px; */
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
</style>