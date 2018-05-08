<template>
<div class="detail">
  <div  class="addForm">
    <el-form :label-position="labelPosition" label-width="60px" :model="addCustomer">
      <el-form-item label="名称：">
        <el-input v-model="addCustomer.name" placeholder="请输入客户姓名" disabled></el-input>
      </el-form-item>
      <el-form-item label="电话：">
        <el-input v-model="addCustomer.phone" placeholder="请输入手机号码" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="addCustomer.note" type="textarea" placeholder="备注" disabled> </el-input>
      </el-form-item>
      <div class="upload">
        <p>身份证图片（共有房产需提供两人身份证和关系证明资料，如结婚证和户口本）</p>
        <el-upload
          disabled
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <p>征信报告 （提供15天以内人行详细版征信报告）</p>
        <el-upload
          disabled
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p>商业产权调查 （提供15天以内人行详细版征信报告）</p>
        <el-upload
          disabled
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleIdcardsuccess"
          :before-upload="beforeidcard">
          <img v-if="idCard" :src="idCard" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p>房产证或购房合同加购房发票 （提供15天以内人行详细版征信报告）</p>
        <el-upload
          disabled
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p>抵押给银行的必须要抵押或按揭合同</p>
        <el-upload
          disabled
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p>工作证明或营业执照复印件</p>
        <el-upload
          disabled
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p>有离婚的，离婚协议涉及财产分割必须要民政局的盖章</p>
        <el-upload
          disabled
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
    export default {
        name: "detail",
      data(){
          return{
            addCustomer: {
              name: '',
              phone: '',
              note: ''
            },
            idCard:"",
            imageUrl: '',
            labelPosition:"right"
          }
      },
      methods:{
        handleIdcardsuccess(res, file) {
          this.idCard = URL.createObjectURL(file.raw);
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeidcard(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
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
