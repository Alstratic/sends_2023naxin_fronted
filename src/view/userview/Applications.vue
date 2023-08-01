<template>
<div class="container">
  <CHeader></CHeader>
  <div class="ApplyText"> 
      <span>申请面试</span>
      <div class="row py-4 align-items-center"  style="font-size:15px;">
      <!--查询条件-->
      <div class="col-lg-12 col-md-12">
      <div class="py-3 text-center1">
        <p class="lead">面试职位</p>
        <p class="tet">{{ChoosePosition}}</p>
      </div>
      <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm pl-5 ml-5" label-position="top" >
        <el-form-item
        label="姓名"
        prop="inputName"
        :rules="[
        { required: true, min: 2, max: 100, message: '请正确输入姓名', trigger: 'blur'},
        ]"
        >
          <el-input v-model="ruleForm.inputName"></el-input>
        </el-form-item>
        <el-form-item 
        label="学号"
        prop="stuNum"
        :rules="[
          {required: true, min: 10, max: 11,message: '*学号错误，请检查输入', trigger: 'blur'},
          {pattern:/^[0-9]*$/,message: '*学号错误，请检查输入',trigger: 'blur'}
        ]"
        >
        <el-input v-model="ruleForm.stuNum"></el-input>
        </el-form-item>

        <el-form-item
        label="电话号码"
        prop="phoneNumber"
        :rules="[
          {required: true, min: 11, max: 11,message: '*电话号码错误，请检查输入', trigger: 'blur'},
          {pattern:/^[0-9]*$/,message: '*电话号码错误，请检查输入',trigger: 'blur'}
        ]"
        >
        <el-input v-model="ruleForm.phoneNumber"></el-input>
        </el-form-item>

        <el-form-item
        label="QQ"
        prop="QQNumber"
        >
        <el-input v-model="ruleForm.QQNumber"></el-input>
        </el-form-item>

        <el-form-item
        label="邮箱"
        prop="Email"
        >
        <el-input v-model="ruleForm.Email"></el-input>
        </el-form-item>
        <el-form-item class="Self"  label="自我介绍" prop="desc" :rules="[
          {required: true,message: '*请输入内容', trigger: 'blur'},
          ]">
          <el-input type="textarea" resize="none" :autosize="{ minRows: 10, maxRows:40}"  v-model="ruleForm.desc" placeholder="介绍一下自己吧~">    
          </el-input>
        </el-form-item>
  </el-form>


</div>
</div>
  </div>

</div>
</template>


<script>
import CHeader from '@/components/CHeader.vue';
import VueSlickCarousel from 'vue-slick-carousel'
export default {
  name:'Applications',
  components: { VueSlickCarousel,CHeader },
  data() {
    return {
      ChoosePosition:'产品经理',
      ruleForm: {
        inputName:'',
        stuNum:'',
        phoneNumber:'',
        QQNumber:'',
        Email:'',
        desc:''
        },
    };
    },
  methods: {
  submitForm(formName) {
    this.$refs[formName].validate((valid) => {
    if (valid) {
      alert('submit!');
    } else {
      console.log('error submit!!');
      return false;
    }
    });
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
  }

}
</script>

<style lang="less" scoped>
.container{
  height: 100%;
}
.ApplyText{
  margin-left: 26vw;
  margin-right: 23vw;
  padding-top: 7vh;
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
.lead{
  margin-top:5vh;
  font-size: 0.5rem;
  color: #7E7E7E;
}
.tet{
  margin-top:1vh;
  font-weight: 545;
}
.el-form-item{
  width: 40%;
  margin-right: 6%;
}
.el-form{
 
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/deep/.el-input__inner{
    border: 1px solid #FFD74DB2
}
/deep/.el-input__inner{
    border: 1px solid #FFD74DB2
}
/deep/.el-input__inner:focus {
  border: 1px solid #FFD74DB2;
  box-shadow:0 0 2.5px #FFD74DB2
}
/deep/.el-input__inner:hover {
  border: 1px solid #FFD74DB2;
}
/deep/.el-textarea__inner{
  width: 100%;
  border: 1px solid #FFD74DB2;
}
/deep/.el-textarea__inner:focus {
  border: 1px solid #FFD74DB2;
  box-shadow:0 0 2.5px #FFD74DB2
}
/deep/.el-textarea__inner:hover {
  border: 1px solid #FFD74DB2;
}
/deep/.el-textarea__inner {
  border: 1px solid #FFD74DB2;
}
.Self{
  width: 100%;
}
</style>
    