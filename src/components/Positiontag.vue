<template>
    <div>
        <span :class="['Position-tag',{'selected':selected}]" @click="toggleSelected" v-for="tag in tags" :key="tag">{{tag}}</span>
    </div>
</template>

<script>
export default{
    props:{
        tags:Array
    },
    data(){
        return{
            selected:false
        }
    },
    methods:{
    //     toggleSelected() {
    //   // 如果点击的是“全部”标签，则将其余标签的选中状态设为false
    //     if (this.tags[0] === '全部') {
    //         this.selected = true;
    //         for (let i = 1; i < this.tags.length; i++) {
    //             this.$parent.$children[i - 1].selected = false;
    //         }
    //     } 
    //     else {
    //         this.selected = !this.selected;
    //         // 如果有其他标签被选中，则将“全部”标签的选中状态设为false
    //         if (this.selected) {
    //             this.$parent.$children[0].selected = false;
    //         }
    //     }
    }
}
</script>

<style scoped lang="less">
.Position-tag{
    margin-left: 2vw;
    color:#909090;
    background-color: #fff;
    height: 2rem;
    width: 4vw;
    font-weight: 400;
    border-color: #fff;
    height: 32px;
    padding: 0 3px;
    line-height: 36px;
    font-size: 16px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    @media (max-width: 769px) {
        margin-left: 2vw;
        font-size: 14px;
        line-height: 32px;
    } 
}

.selected {
    background-color: #FFD74D;
    border-radius: 15%;
}
</style>