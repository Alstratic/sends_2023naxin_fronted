<template>
    <el-container class="all-container">
        <el-header class="header-container">
            <Login_nav></Login_nav>
        </el-header>
    </el-container>


</template>

<script>
import Login_nav from '@/components/Login_nav.vue';
import axios from 'axios';

export default{
    components:{Login_nav,axios}
}
</script>

<style>
.all-container{
height: 100%;
background-color: #909090;;
}

</style>