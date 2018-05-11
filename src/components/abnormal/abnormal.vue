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
      <el-tab-pane label="异常客户" name="add">
        <el-form :inline="true" :model="abnormalQuery" class="queryForm">
          <el-form-item style="width: 70%">
            <el-input v-model="abnormalQuery.user" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitAbnormal">查询</el-button>
          </el-form-item>
        </el-form>
        <!--查询结果-->
        <ul class="list"
            v-infinite-scroll="loadMore1"
            infinite-scroll-disabled="rolling1"
            infinite-scroll-distance="10">
          <li v-for="(item,index) in abnormalList" :key="index" >
            <span>{{item.order.data.name}}</span>
            <el-button type="text" size="mini" round @click="toDeal(item.id,item.order.data.name)">处理</el-button>
            <el-button type="text" size="mini" round @click="toDetail(item.order.data.id)">详细信息</el-button>
           <!-- <b class="el-icon-arrow-right"></b>-->
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
  import {getCustomers,getAbnormal,getCustomersByName,getAbnormalByname} from '../../api/api'
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
        nextUrl1: [],
        previousUrl1: [],
        page1:"",
        url1:"",
        current_page1:"",
        total_pages1:"",

        nextUrl: [],
        previousUrl: [],
        page:"",
        url:"",
        current_page:"",
        total_pages:"",
        rolling:false,
        rolling1:false,
        queryTabs: 'query',
        customerList:[],
        queryForm: {
          user: '',
        },
        abnormalQuery: {
          user: '',
       },
        abnormalList:[],
        loading:false,
        // 异常列表
        pageAbnormal:1,

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
      loadMore1() {
        this.current_page1++;
        this.loading1 = true;
        if (this.current_page1 <= this.total_pages1) {
          this.rolling1=true;
          axios.get(this.url1 + this.current_page1).then((res) => {
            this.abnormalList = this.abnormalList.concat(res.data.data);
            setTimeout(()=>{
              this.rolling1=false;
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
      toDeal(id,name){
        this.$router.push({
          path:'/deal',
          query:{
            id:id,
            name:name
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        this.customerList=[]
        if(this.queryForm.user===""){
          alert("请输入客户名")
          this.getList()
        }else{
          getCustomersByName(this,this.queryForm.user).then(res=>{
            if(res.data.data.length>0){
              this.customerList=res.data.data
            }else{
              alert("没有查询到数据")
              this.getList()
            }
          })
        }
      },
      onSubmitAbnormal(){
        this.abnormalList=[]
        getAbnormalByname(this,this.abnormalQuery.user).then(res=>{
         this.abnormalList=res.data.data
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
      },
      getListAbnormal(){
        getAbnormal(this,1).then(res=>{
          this.abnormalList=res.data
          //      当前页码
          this.page1=res.meta.pagination.current_page;
          this.url1="https://fdd.api.jiahaichuang.com/api/orderAbnormals/status/1?include=order&page=";
          this.current_page1=res.meta.pagination.current_page;
          //      总页码
          this.total_pages1=res.meta.pagination.total_pages
        })
      }
    },
    mounted(){
      this.getList()
      this.getListAbnormal()
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
