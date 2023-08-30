<template>
    <div class="Position-tag-list">
<<<<<<< HEAD
<<<<<<< HEAD
        <label v-for="(tag,index) in tags" :key="tag" :class="{'active': selectedTags[index]}" @click="toggleTag(index)">
            {{ tag }}
=======
        <label v-for="(tag,index) in tags" :key="tag" :class="{'active':selectedTags[index]}">
            <input type="checkbox" v-model="selectedTags[index]" style="display: none" @click="toggleTag(index)">{{tag}}
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
=======
        <label v-for="(tag,index) in tags" :key="tag" :class="{'active': selectedTags[index]}" @click="toggleTag(index)">
            {{ tag }}
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
        </label>
    </div>
</template>

<script>
export default{
    props:{
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
        tags:Array,
        id:Number
    },
    created(){
        this.selectedTags = this.tags.map((tag, index) => index === 0);
<<<<<<< HEAD
=======
        tags:Array
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
=======
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
    },
    data(){
        return{
            selectedTags: []
        }
    },
    methods:{
        toggleTag(index) {
            // 先判断是否有标签被选中
<<<<<<< HEAD
<<<<<<< HEAD
            this.selectedTags = this.selectedTags.map((_, idx) => idx === index);
            this.$emit('tag-selected',this.tags[index],this.id);
=======
            if (this.selectedTags.includes(true)) {
                // 如果有标签被选中，则执行选中操作
                this.selectedTags = this.selectedTags.map((tag, idx) => (idx === index ? !tag : false));
            } else {
                // 如果没有标签被选中，则直接将点击的标签设置为选中状态（true）。
                this.selectedTags[index] = true;
            }
        }
    },
    watch:{
        tags(newTag){
            this.selectedTags = new Array(newTag.length).fill(false);
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
=======
            this.selectedTags = this.selectedTags.map((_, idx) => idx === index);
            this.$emit('tag-selected',this.tags[index],this.id);
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
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
<<<<<<< HEAD
<<<<<<< HEAD
    padding: 3 4px;
=======
    padding: 0 3px;
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
=======
    padding: 3 4px;
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
    line-height: 36px;
    font-size: 16px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    @media (max-width: 769px) {
<<<<<<< HEAD
<<<<<<< HEAD
        margin-left: 0vw;
        font-size: 12px;
=======
        margin-left: 3vw;
        font-size: 14px;
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
=======
        margin-left: 0vw;
        font-size: 12px;
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
        line-height: 32px;
    } 
}
.Position-tag-list label.active {
  background-color: #FFD74D;
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

</style>