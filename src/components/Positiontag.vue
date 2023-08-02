<template>
    <div class="Position-tag-list">
        <label v-for="(tag,index) in tags" :key="tag" :class="{'active':selectedTags[index]}" @click="toggleTag(index)">
            <input type="checkbox" v-model="selectedTags[index]" @change="check" style="display: none">{{tag}}
        </label>
    </div>
</template>

<script>
export default{
    props:{
        tags:Array
    },
    data(){
        return{
            selectedTags: []
        }
    },
    methods:{
        check(){
            console.log(this.selectedTags)
        },
        toggleTag(index) {
            this.selectedTags[index] = !this.selectedTags[index];
        }
    },
    watch:{
        tags(newTag){
            this.selectedTags = new Array(newTag.length).fill(false);
        }
    }
}
</script>

<style scoped lang="less">
.Position-tag-list label{
    margin-left: 2vw;
    color:#3E3E3E;
    background-color: #fff;
    height: 2rem;
    width: 4vw;
    font-weight: 600;
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
        margin-left: 3vw;
        font-size: 14px;
        line-height: 32px;
    } 
}
.Position-tag-list label.active {
  background-color: #FFD74D;
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}


</style>