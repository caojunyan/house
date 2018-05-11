<template>
    <div class="deal">
      <el-form ref="form" :model="form" label-width="100px" class="form" :rules="rules">
        <el-form-item label="姓名：">
          <el-input v-model="form.name" placeholder="请输入姓名" class="item"></el-input>
        </el-form-item>
        <el-form-item label="处理时间：">
          <el-date-picker
            class="item"
            v-model="form.processingTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地点：">
          <el-input v-model="form.disposalSites" placeholder="请输入地点" class="item"></el-input>
        </el-form-item>
       <!-- <el-form-item label="未还款原因：">
          <el-input v-model="form.name" placeholder="未还款原因" class="item"></el-input>
        </el-form-item>-->
        <el-form-item label="处理方式：">
          <el-input v-model="form.treatmentMethod" placeholder="处理方式" class="item"></el-input>
        </el-form-item>
        <el-form-item label="参与人员：" >
          <el-select v-model="form.processingStaff" multiple placeholder="参与人员" class="item">
            <el-option
              v-for="(item,index) in value5"
              :key="index"
              :value="item.name">
            </el-option>
          </el-select>

         <!-- <el-input v-model="form.processingStaff" placeholder="参与人员" class="item"></el-input>-->
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="form.remark" class="item"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" style="width: 80%">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {dealAbnormal,getAssetsList} from '../../api/api'
  export default {
    data() {
      return {
        value5: [],
        id:this.$route.query.id,
        form: {
          name:this.$route.query.name,
          processingStaff: [],
          processingTime:"",
          disposalSites:"",
          treatmentMethod:"",
          remark:"",
        },
        rules:{
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min:2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          time:  [{ required: true,message: '请输入时间', trigger: "blur" }],
          desc:  [{ required: true,message: '请输入地点', trigger: "blur" }],
        },
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            dealAbnormal(this,this.id,this.form).then(res=>{
              console.log(res)
              alert("提交成功")
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted(){
      getAssetsList(this).then(res=>{
        this.value5=res.data.data
        console.log(this.form.processingStaff)
      })
    }
  }
</script>

<style scoped lang="stylus">
.deal
  width 100%
  .form
    margin-top 20px
    .item
      width 80%
</style>
