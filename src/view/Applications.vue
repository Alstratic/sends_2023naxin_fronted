<template>
<div class="container">

  <div class="row py-4 align-items-center"  style="font-size:15px;">

<!--查询条件-->
<div class="col-lg-12 col-md-12">

  <div class="py-3 text-center">
      <h2 >教室借订申请</h2>
      <p class="lead">请您填写条件进行申请，开始时间请选00分或30分，结束时间请选29分或59分。</p>
    </div>


  <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm pl-5 ml-5">
  
    <el-form-item 
      label="预定教室名称" 
      prop="checkedClassroom"
      :rules="[
      { required: true, message: '教室名称不能为空', trigger: 'change'},
      ]"
    >
      <el-select v-model="ruleForm.checkedClassroom" placeholder="请选择教室">
      <el-option :label="option" v-for="(option,index) in this.classroom_options" :value="option" :key="index"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      label="参与人数"
      prop="booking_classroom_person_hc"
      :rules="[
      { required: true, type: 'number', message: '参与人数不能为空,必须为数字值', trigger: 'blur'},
      ]"
    >
      <el-input v-model.number="ruleForm.booking_classroom_person_hc" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item 
      label="预定类别" 
      prop="booking_type"
      :rules="[
      { required: true, message: '预定类别不能为空', trigger: 'blur'},
      ]"
    >
      <el-select v-model="ruleForm.booking_type" placeholder="预定类别">
        <el-option label="HR培训课程" value="HR培训课程"></el-option>
        <el-option label="非HR培训课程" value="非HR培训课程"></el-option>
        <el-option label="会议" value="会议"></el-option>
        <el-option label="其他" value="其他"></el-option>
      </el-select>
    </el-form-item>


    <el-form-item 
      label="预定事宜说明" 
      prop="booking_content"
      :rules="[
      { required: true,  min: 3, max: 100, message: '预定事宜说明请填写至少3个字', trigger: 'blur'},
      ]"
    >
      <el-input v-model="ruleForm.booking_content"></el-input>
    </el-form-item>

    <el-form-item
      label="预定时间"
    >
      <el-col :span="5">
        <el-form-item 
        prop="booking_date"
        :rules="[
          { required: true, message: '预定时间不能为空', trigger: 'blur'},
          ]"
        >
          <el-date-picker type="date" placeholder="预订日期" v-model="ruleForm.booking_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line text-center" :span="2">之</el-col>
      <el-col :span="5">
        <el-form-item 
        prop="booking_start_time"
        :rules="[
          { required: true, message: '开始时间不能为空', trigger: 'blur'},
        ]"
        >
          <el-time-select placeholder="开始时间" v-model="ruleForm.booking_start_time" style="width: 100%;"
          :picker-options="{
            start: '08:00',
            step: '00:30',
            end: '19:30'
            }"
          >
          </el-time-select>
        </el-form-item>
      </el-col>
      <el-col class="line text-center" :span="2">-</el-col>
      <el-col :span="5">
        <el-form-item
        prop="booking_end_time"
        :rules="[
          { required: true, message: '结束时间不能为空', trigger: 'blur'},
        ]"
          >
          <el-time-select placeholder="结束时间" v-model="ruleForm.booking_end_time" style="width: 100%;"
          :picker-options="{
            start: '08:29',
            step: '00:30',
            end: '19:59',
            minTime: ruleForm.booking_start_time,
            }"
          >
          </el-time-select>
        </el-form-item>
      </el-col>
    </el-form-item>


    <el-form-item label="预订人" required >
      <el-col :span="7" class="pl-1">
        <el-form-item 
          prop="booking_employee_id"
          :rules="[
          { required: true, message: '预定人工号不能为空', trigger: 'blur' }
          ]"
        >
          <el-input v-model="ruleForm.booking_employee_id" placeholder="工号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" class="pl-1">
        <el-form-item 
          prop="booking_employee_name"
          :rules="[
          { required: true, message: '中文姓名不能为空', trigger: 'blur' }
          ]"
        >
          <el-input v-model="ruleForm.booking_employee_name" placeholder="姓名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" class="pl-1">
        <el-form-item 
          prop="booking_employee_phone"
          :rules="[
          { required: true, min: 11, max: 11, message: '请填写11位手机长号', trigger: 'blur' }
          ]"
        >
          <el-input v-model="ruleForm.booking_employee_phone" placeholder="长号"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>



    <el-form-item
      prop="booking_fill_date"
      label="填写日期" 
      :rules="[
      { required: true, message: '填写日期不能为空', trigger: 'blur' }
      ]"
    >
      <el-date-picker type="date" placeholder="预订周末请先联系管理员" v-model="ruleForm.booking_fill_date" style="width: 100%;"></el-date-picker>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>


</div>
</div>
</div>
</template>


<script>


export default {
  name:'Applications',
  
  data() {
    return {
      classroom_options:['TC-01.孟子教室','TC-02.庄子教室','TC-03.墨子教室','TC-04.旬子教室',
                'TC-05.国际语言教室','TC-06.会议室','TC-07.企业文化展厅',],
      classroomschedule_date_start:'2022-12-21',
      classroomschedule_date_end:'2022-12-22',
      checkedClassroom: ['TC-01.孟子教室',],
      ruleForm: {
        checkedClassroom:[],
        booking_classroom_person_hc:'',
        booking_type:'',
        booking_content: '',
        booking_date:'',
        booking_start_time: '',
        booking_end_time: '',
        booking_employee_id: '',
        booking_employee_name:'',
        booking_employee_phone:'',
        booking_fill_date:'',
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

</style>
    