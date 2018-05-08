<template>
    <div class="login">
      <div class="logo">
        <img src="./logo.png" alt="">
      </div>
      <div class="loginForm">
        <el-form :model="user" :rules="rules" ref="user" class="demo-ruleForm">
          <el-form-item  prop="email" >
            <img src="./phone.png" alt="">
            <el-input v-model="user.email" placeholder="请输入用户名" class="border-none"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <img src="./password.png" alt="">
            <el-input v-model="user.password" placeholder="请输入密码" type="password" class="border-none"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 40px">
            <el-button type="primary" @click="submitForm">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
          return {
            user:{
              email:'',
              password:""
            },
            rules:{
              email: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
              ],
            }
          }
        },
      methods:{
        submitForm(){

        }
      }
    }
</script>

<style scoped lang="stylus">
.login
  width 100%
  height 100%
  position fixed
  top 0
  bottom 0
  right 0
  left 0
  background #F5E787
  .logo
    width 100%
    text-align: center
    margin-top 100px
    img
      width 116px
  .loginForm
    width 90%
    margin-left 5%
    margin-top 80px
    .el-form-item
      background #fff
      border-radius 22px
      height 50px
      img
        width 15px
        margin-left 15px
      .el-input
        width 70%
        height 50px
        display inline-block

    .el-form-item__content
      height 50px
      line-height 50px
      .el-button--primary
        width 100%
        height 50px
        border-radius 22px
        font-size 18px
        letter-spacing 3px
</style>
