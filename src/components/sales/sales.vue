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
        <li>
          <span>张三</span>
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
        <el-form :label-position="labelPosition" label-width="60px" :model="addCustomer">
          <el-form-item label="名称：">
            <el-input v-model="addCustomer.name" placeholder="请输入客户姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话：">
            <el-input v-model="addCustomer.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="addCustomer.note" type="textarea" placeholder="备注"></el-input>
          </el-form-item>
          <div class="upload">
            <p>身份证图片（共有房产需提供两人身份证和关系证明资料，如结婚证和户口本）</p>
            <el-upload
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
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
             <p>房产证或购房合同加购房发票 （提供15天以内人行详细版征信报告）</p>
            <el-upload
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
         <el-button type="primary" @click="addCustomer" style="width:100%;margin-top:30px">提交</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>

  export default {
    data() {
      return {
        queryTabs: 'query',
        queryForm: {
          user: '',
        },
        loading:false,
        labelPosition: 'right',
        addCustomer: {
          name: '',
          phone: '',
          note: ''
        },
        imageUrl: ''
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log('submit!');
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
      addCustomer(){

      }
    },
    mounted(){

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
