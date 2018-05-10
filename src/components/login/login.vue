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
            <el-button type="primary" @click="submitForm('user')">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
  import {getAdmin,getUser} from "../../api/api";

  export default {
        name: "login",
        data(){
          let checkPhone = (rule, value, callback) => {
            let regPhone = /^1[3|4|5|7}8][0-9]\d{4,8}$/;
            if (value === "") {
              callback(new Error("请输入手机号"));
            } else if (!regPhone.test(value) || value.length != 11) {
              callback(new Error("请输入正确的手机号"));
            } else {
              callback();
            }
          };
          return {
            user:{
              email:'18672776975',
              password:"123456"
            },
            rules:{
              email:  [{ validator: checkPhone, trigger: "blur" }],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
              ],
            }
          }
        },
        methods:{
          submitForm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
              getAdmin(this,this.user).then(res=>{
                console.log(res)
                localStorage.setItem('user_pass', res.password);
                if(res){
                  getUser(this).then(res=>{
                    if(res.data.data.depart==="业务B组"){
                      this.$router.push({ path: '/sales' });
                    }else if(res.data.data.depart==="资产管理部门"){
                      this.$router.push({ path: '/abnormal' });
                    }else{
                      this.$message.error('您没有登录权限');
                      return false
                    }
                  })
                }else{
                  this.$message.error('您没有登录权限');
                }
              }).catch(err=>{
                alert('用户名或密码错误')
                return false
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
          init() {
          this.$nextTick( ()=> {
            this.user.email = localStorage.getItem('user_name');
            this.user.password = localStorage.getItem('user_pass');
          })
        },
      },
        mounted(){
          this.init()
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
      border-radius 30px
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
