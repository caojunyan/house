<template>
  <div id="app">

    <router-view/>
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
