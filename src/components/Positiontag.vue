<template>
    <div class="Position-tag-list">
        <label v-for="(tag,index) in tags" :key="tag" :class="{'active': selectedTags[index]}" @click="toggleTag(index)">
            {{ tag }}
        </label>
    </div>
</template>

<script>
export default{
    props:{
        tags:Array,
        id:Number
    },
    created(){
        this.selectedTags = this.tags.map((tag, index) => index === 0);
    },
    data(){
        return{
            selectedTags: []
        }
    },
    methods:{
        toggleTag(index) {
            // 先判断是否有标签被选中
            this.selectedTags = this.selectedTags.map((_, idx) => idx === index);
            this.$emit('tag-selected',this.tags[index],this.id);
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
    padding: 3 4px;
    line-height: 36px;
    font-size: 16px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    @media (max-width: 769px) {
        margin-left: 0vw;
        font-size: 12px;
        line-height: 32px;
    } 
}
.Position-tag-list label.active {
  background-color: #FFD74D;
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

</style>