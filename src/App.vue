<template>
  <div id="app">

    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
@import "./components/common/stylus/reset.css";
.avatar-uploader{
  width 100%;
  text-align: center
}
.avatar-uploader .el-upload {
  border: 3px dashed #ff6600 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

}
.avatar-uploader .el-upload:hover {
  border-color: #ff6600;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #ff6600;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.border-none .el-input__inner{
  border: none!important;
  outline :none;
  height :50px;
}
.el-icon-delete:before {
  position:absolute;
  right :0;
  top:0;
}
.el-dialog{
  width :100% !important;
}
.el-dialog__header{
  padding:0 !important;
}
.el-dialog__body{
  padding:0 !important;
}
.el-button--text{
  color:#000;
}
.el-button--text:focus, .el-button--text:hover{
  color:#000;
}
.el-upload-list--picture-card .el-upload-list__item-actions:hover span {
  display: inline-block;
  text-align: center;
  margin: 0 auto !important;
}
.el-tabs__header
  width 100%
  .el-tabs__nav-wrap
    width 100%
    .el-tabs__nav-scroll
      width 100%
      .el-tabs__nav
        width 100%
        .el-tabs__item
          width 50%
          text-align center
</style>
