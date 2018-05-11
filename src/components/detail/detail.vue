<template>
<div class="detail">
  <div  class="addForm">
    <el-form :label-position="labelPosition" label-width="60px" :model="addCustomer">
      <el-form-item label="名称：">
        <el-input v-model="addCustomer.name" placeholder="请输入客户姓名" disabled></el-input>
      </el-form-item>
      <el-form-item label="电话：">
        <el-input v-model="addCustomer.telephone" placeholder="请输入手机号码" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="addCustomer.remark" type="textarea" placeholder="备注" disabled> </el-input>
      </el-form-item>
      <div class="upload">
        <p>身份证图片（共有房产需提供两人身份证和关系证明资料，如结婚证和户口本）</p>
        <el-upload
          :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"'
          list-type="picture-card"
          :data="{type:'idImage'}"
          :file-list="idImage"
          :headers="{Authorization:'Bearer '+user_token}"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-remove="handleRemove" multiple disabled>
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <p>户口本（户主和本人）</p>
        <el-upload
          :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"'
          list-type="picture-card"
          :data="{type:'registeredResidence'}"
          :file-list="registeredResidence"
          :headers="{Authorization:'Bearer '+user_token}"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-remove="handleRemove"
          multiple disabled>
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <p>征信报告 （提供15天以内人行详细版征信报告）</p>
        <el-upload
          :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"'
          list-type="picture-card"
          :data="{type:'creditReport'}"
          :file-list="creditReport"
          :headers="{Authorization:'Bearer '+user_token}"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-remove="handleRemove"
          multiple disabled>
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>商业产权调查（15天内） </p>
        <el-upload
          :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"'
          list-type="picture-card" :data="{type:'commercialPropertyInvestigation'}"
          :file-list="commercialPropertyInvestigation"
          :headers="{Authorization:'Bearer '+user_token}"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-remove="handleRemove"
          multiple disabled>
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>房产证或购房合同加购房发票 </p>
        <el-upload
          :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"'
          list-type="picture-card"
          :data="{type:'realEstateLicense'}"
          :file-list="realEstateLicense"
          :headers="{Authorization:'Bearer '+user_token}"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-remove="handleRemove"
          multiple disabled>
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>银行卡</p>
        <el-upload
          :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"'
          list-type="picture-card"
          :data="{type:'debitCard'}"
          :file-list="debitCard"
          :headers="{Authorization:'Bearer '+user_token}"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-remove="handleRemove"
          disabled multiple>
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>工作证明或营业执照复印件 </p>
        <el-upload
          :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"'
          list-type="picture-card"
          :data="{type:'workProof'}"
          :file-list="workProof"
          :headers="{Authorization:'Bearer '+user_token}"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-remove="handleRemove"
          disabled multiple>
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>抵押给银行的必须要抵押或按揭合同，没有的可以去银行补打（选传） </p>
        <el-upload
          :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"'
          list-type="picture-card"
          :data="{type:'mortgageContract'}"
          :file-list="mortgageContract"
          :headers="{Authorization:'Bearer '+user_token}"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-remove="handleRemove"
          disabled multiple>
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>若离婚，离婚协议涉及财产分割必须要民政局的盖章（选传）</p>
        <el-upload
          :action='"https://fdd.api.jiahaichuang.com/api/customers/"+ id +"/credentials"'
          list-type="picture-card"
          :data="{type:'divorceAgreement'}"
          :file-list="divorceAgreement"
          :headers="{Authorization:'Bearer '+user_token}"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-remove="handleRemove"
          disabled multiple>
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
  import {getCustomersById,getImages} from '../../api/api'
    export default {
        name: "detail",
      data(){
          return{
            idImage: [],
            registeredResidence: [],
            creditReport: [],
            commercialPropertyInvestigation: [],
            realEstateLicense: [],
            debitCard: [],
            workProof: [],
            mortgageContract: [],
            divorceAgreement: [],
            labelPosition:"right",
            id:this.$route.query.id,
            addCustomer: {
              name: '',
              telephone: '',
              remark: ''
            },
            dialogImageUrl: "",
            dialogVisible: false,
            user_token: localStorage.getItem("user_token"),
          }
      },
      methods:{
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
      },
      mounted(){
        getCustomersById(this,this.id).then(res=>{
            this.addCustomer=res.data
        })
        getImages(this, this.id, "idImage").then(data => {
          this.idImage = data.data;
        });
        getImages(this, this.id, "registeredResidence").then(
          data => {
            this.registeredResidence = data.data;
          }
        );
        getImages(this, this.id, "creditReport").then(data => {
          this.creditReport = data.data;
        });
        getImages(
          this,
          this.id,
          "commercialPropertyInvestigation"
        ).then(data => {
          this.commercialPropertyInvestigation = data.data;
        });
        getImages(this, this.id, "realEstateLicense").then(
          data => {
            this.realEstateLicense = data.data;
          }
        );
        getImages(this, this.id, "debitCard").then(data => {
          this.debitCard = data.data;
        });
        getImages(this, this.id, "workProof").then(data => {
          this.workProof = data.data;
        });
        getImages(this, this.id, "mortgageContract").then(
          data => {
            this.mortgageContract = data.data;
          }
        );
        getImages(this, this.id, "divorceAgreement").then(
          data => {
            this.divorceAgreement = data.data;
          }
        );
      }
    }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/upload.css"
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
