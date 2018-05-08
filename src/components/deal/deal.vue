<template>
    <div class="deal">
      <el-form ref="form" :model="form" label-width="100px" class="form">
        <el-form-item label="姓名：">
          <el-input v-model="form.name" placeholder="请输入姓名" class="item"></el-input>
        </el-form-item>
        <el-form-item label="处理时间：">
          <el-date-picker
            class="item"
            v-model="form.time"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地点：">
          <el-input v-model="form.name" placeholder="请输入地点" class="item"></el-input>
        </el-form-item>
        <el-form-item label="未还款原因：">
          <el-input v-model="form.name" placeholder="未还款原因" class="item"></el-input>
        </el-form-item>
        <el-form-item label="处理方式：">
          <el-input v-model="form.name" placeholder="处理方式" class="item"></el-input>
        </el-form-item>
        <el-form-item label="参与人员：" >
          <el-input v-model="form.name" placeholder="参与人员" class="item"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="form.desc" class="item"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 80%">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          time:"",
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
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
