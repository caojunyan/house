<template>
<div class="sale">
  <el-tabs v-model="queryTabs" type="card" @tab-click="handleClick">
    <!--客户查询-->
    <el-tab-pane label="客户查询" name="query">
      <el-form :inline="true" :model="queryForm" class="queryForm">
        <el-form-item label="查询客户：">
          <el-input v-model="queryForm.user" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
       <!--查询结果-->
      <ul class="list">
        <li v-for="(item,index) in customerList" :key="index">
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
        <el-form :label-position="labelPosition" label-width="60px" :model="customerForm">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="customerForm.name" placeholder="请输入客户姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="telephone">
            <el-input v-model="customerForm.telephone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="customerForm.remark" type="textarea" placeholder="备注"></el-input>
          </el-form-item>
          <el-button type="primary" @click="subCustomer" style="width:100%;margin-top:30px">提交</el-button>
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
import {getCustomers,submitCustomer} from '../../api/api'
  export default {
    data() {
      return {
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
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log('submit!');
      },
      handleRemove: function(file) {
        //console.log(file);
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
          message: "上传失败"
        });
      },
      subCustomer(){
        submitCustomer(this,this.customerForm).then(res=>{
          this.id=res.code
          console.log(res)
        })
      },
      sendCustomer(){

      },
      getList(){
        getCustomers(this).then(res=>{
          this.customerList=res.data
          this.id =res.code
          console.log(this.customerList)
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
