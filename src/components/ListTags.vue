<template>
    <div class="Position-tag-list">
        <label v-for="(tag,index) in tags" :key="tag" :class="{'active': selectedTags[index]}" class="application-list-tag" @click="toggleTag(index)">
            {{ tag }}
        </label>
    </div>
</template>

<script>
export default{
    props:{
        tags:Array,
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
            this.$emit('tag-selected',this.tags[index]);
        }
    }
    
}
</script>

<style lang="less" scoped>

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
    padding-bottom: 3px;
    padding-top: 3px;
    font-size: 1rem;
    @media (max-width: 769px) {
        margin-left:8px;
        padding: 0 2px;
        font-size: 0.5rem;
    } 
  }

.active{
    background-color: #FFD74D;
    transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

</style>
