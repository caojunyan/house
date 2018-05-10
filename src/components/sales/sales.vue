<template>
  <div class="sale">
    <el-tabs v-model="queryTabs" type="card" @tab-click="handleClick">
      <!--客户查询-->
      <el-tab-pane label="客户查询" name="query">
        <el-form :inline="true" :model="queryForm" class="queryForm">
          <el-form-item style="width: 70%">
            <el-input v-model="queryForm.user" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item style="width: 20%">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <!--查询结果-->
        <ul class="list"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="rolling"
            infinite-scroll-distance="10"
        >
          <li v-for="(item,index) in customerList" :key="index" @click="toDetail(item.id)">
            <span>{{item.name}}</span>
            <b class="el-icon-arrow-right"></b>
          </li>
        </ul>
        <div class="loading">
          <span v-show="loading"  >加载更多。。。</span>
          <span v-show="!loading">没有更多数据了</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="添加客户" name="add">
        <div  class="addForm">
          <el-form :label-position="labelPosition" label-width="70px" :model="customerForm" :rules="rules" ref="customerForm">
            <el-form-item label="名称：" prop="name">
              <el-input v-model="customerForm.name" placeholder="请输入客户姓名"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="telephone">
              <el-input v-model="customerForm.telephone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input v-model="customerForm.remark" type="textarea" placeholder="备注"></el-input>
            </el-form-item>
            <el-button type="primary" @click="subCustomer('customerForm')" style="width:100%;margin-top:30px" v-show="showButton">提交</el-button>
            <div class="upload">
              <p>身份证图片（共有房产需提供两人身份证和关系证明资料，如结婚证和户口本）</p>
              <el-upload :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"' list-type="picture-card" :data="{type:'idImage'}" :file-list="idImage" :headers="{Authorization:'Bearer '+user_token}" :on-preview="handlePictureCardPreview" :on-error="handleError" :on-remove="handleRemove" multiple>
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <p>户口本（户主和本人）</p>
              <el-upload :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"' list-type="picture-card" :data="{type:'registeredResidence'}" :file-list="registeredResidence" :headers="{Authorization:'Bearer '+user_token}" :on-preview="handlePictureCardPreview" :on-error="handleError" :on-remove="handleRemove" multiple>
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <p>征信报告 （提供15天以内人行详细版征信报告）</p>
              <el-upload :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"' list-type="picture-card" :data="{type:'creditReport'}" :file-list="creditReport" :headers="{Authorization:'Bearer '+user_token}" :on-preview="handlePictureCardPreview" :on-error="handleError" :on-remove="handleRemove" multiple>
                <i class="el-icon-plus"></i>
              </el-upload>
              <p>商业产权调查（15天内） </p>
              <el-upload :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"' list-type="picture-card" :data="{type:'commercialPropertyInvestigation'}" :file-list="commercialPropertyInvestigation" :headers="{Authorization:'Bearer '+user_token}" :on-preview="handlePictureCardPreview" :on-error="handleError" :on-remove="handleRemove" multiple>
                <i class="el-icon-plus"></i>
              </el-upload>
              <p>房产证或购房合同加购房发票 </p>
              <el-upload :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"' list-type="picture-card" :data="{type:'realEstateLicense'}" :file-list="realEstateLicense" :headers="{Authorization:'Bearer '+user_token}" :on-preview="handlePictureCardPreview" :on-error="handleError" :on-remove="handleRemove" multiple>
                <i class="el-icon-plus"></i>
              </el-upload>
              <p>银行卡</p>
              <el-upload :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"' list-type="picture-card" :data="{type:'debitCard'}" :file-list="debitCard" :headers="{Authorization:'Bearer '+user_token}" :on-preview="handlePictureCardPreview" :on-error="handleError" :on-remove="handleRemove" multiple>
                <i class="el-icon-plus"></i>
              </el-upload>
              <p>工作证明或营业执照复印件 </p>
              <el-upload :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"' list-type="picture-card" :data="{type:'workProof'}" :file-list="workProof" :headers="{Authorization:'Bearer '+user_token}" :on-preview="handlePictureCardPreview" :on-error="handleError" :on-remove="handleRemove" multiple>
                <i class="el-icon-plus"></i>
              </el-upload>
              <p>抵押给银行的必须要抵押或按揭合同，没有的可以去银行补打（选传） </p>
              <el-upload :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"' list-type="picture-card" :data="{type:'mortgageContract'}" :file-list="mortgageContract" :headers="{Authorization:'Bearer '+user_token}" :on-preview="handlePictureCardPreview" :on-error="handleError" :on-remove="handleRemove" multiple>
                <i class="el-icon-plus"></i>
              </el-upload>
              <p>若离婚，离婚协议涉及财产分割必须要民政局的盖章（选传）</p>
              <el-upload :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"' list-type="picture-card" :data="{type:'divorceAgreement'}" :file-list="divorceAgreement" :headers="{Authorization:'Bearer '+user_token}" :on-preview="handlePictureCardPreview" :on-error="handleError" :on-remove="handleRemove" multiple>
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form>
          <el-button type="primary" @click="sendCustomer" style="width:100%;margin-top:30px">送审</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {getCustomers,submitCustomer,sendAssesses,deleteImage} from '../../api/api'
  import axios from 'axios'
  export default {
    data() {
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
        nextUrl: [],
        previousUrl: [],
        page:"",
        url:"",
        current_page:"",
        total_pages:"",
        rolling:false,
        showButton:true,
        id:1,
        dialogImageUrl: "",
        dialogVisible: false,
        user_token: localStorage.getItem("user_token"),
        customerList:[],
        queryTabs: 'query',
        queryForm: {
          user: '',
        },
        loading:false,
        labelPosition: 'right',
        customerForm: {
          name: '',
          telephone: '',
          remark: ''
        },
        rules:{
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min:2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          telephone:  [{ required: true,validator: checkPhone, trigger: "blur" }],
        },
        idImage: [],
        registeredResidence: [],
        creditReport: [],
        commercialPropertyInvestigation: [],
        realEstateLicense: [],
        debitCard: [],
        workProof: [],
        mortgageContract: [],
        divorceAgreement: []
      };
    },
    methods: {
      loadMore() {
        this.current_page++;
        this.loading = true;
        if (this.current_page <= this.total_pages) {
          this.rolling=true;
            axios.get(this.url + this.current_page).then((res) => {
              this.customerList = this.customerList.concat(res.data.data);
              setTimeout(()=>{
                this.rolling=false;
              },3000)
            }).catch(err=>{
              alert('请求过于频繁，请稍后再试')
            });
        }else{
          this.loading = false;
          return;
        }
      },
      toDetail(id){
        this.$router.push({
          path:'/detail',
          query:{
            id:id
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log('submit!');
      },
      handleRemove: function(file) {
        deleteImage(this, file.response.code);
      },
      handlePictureCardPreview: function(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        //console.log(file);
      },
      handleError: function(err, file, fileList) {
        this.$message({
          type: "warning",
          message: "上传失败,请先填写客户信息"
        });
      },
      subCustomer(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            submitCustomer(this,this.customerForm).then(res=>{
              this.id=res.code
              this.showButton=false
              alert("客户基本信息提交成功，请继续提交照片信息")
              console.log(this.id)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      sendCustomer(){
        sendAssesses(this,this.id).then(res=>{
          alert("提交成功")
        })
      },
      getList(){
        getCustomers(this).then(res=>{
          this.customerList=res.data
          //      当前页码
             this.page=res.meta.pagination.current_page;
             this.url="https://fdd.api.jiahaichuang.com/api/customers?page=";
             this.current_page=res.meta.pagination.current_page;
             //      总页码
             this.total_pages=res.meta.pagination.total_pages
          this.id =res.code
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    mounted(){
      this.getList()
    }
  };
</script>

<style scoped lang="stylus">
  @import "../common/stylus/upload.css"
  .sale
    width 100%
    .queryForm
      width 100%
      padding 5%
    .list
      width 100%
      border-bottom 1px solid #ddd
      li
        width 100%
        height 50px
        line-height 50px
        border-top 1px solid #ddd
        display flex
        justify-content space-between
        span
          display inline-block
          padding-left 10px
          font-size 1.3rem
        b
          font-size 1.3rem
          display inline-block
          height 50px
          line-height 50px
          padding-right 10px
    .loading
      width 100%
      text-align center
      span
        display inline-block
        padding-top 10px
        padding-bottom 10px

    .addForm
      width 100%
      padding 10px
    .upload
      width 100%
      padding 10px
      padding-bottom 0
      p
        margin-top 15px
        line-height 33px
        font-size 1.3rem

</style>
