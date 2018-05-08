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
      <el-tab-pane label="异常客户" name="add">
        <el-form :inline="true" :model="abnormalQuery" class="queryForm">
          <el-form-item label="查询客户：">
            <el-input v-model="abnormalQuery.user" placeholder="请输入用户姓名"></el-input>
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
        abnormalQuery: {
          user: '',
       },
        loading:false,
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log('submit!');
      },

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
