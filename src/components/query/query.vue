<template>
    <div class="query">
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
    </div>
</template>

<script>
  import {getCustomers,getCustomersByName} from '../../api/api'
  import axios from 'axios'
  export default {
    data() {
      return {
        nextUrl: [],
        previousUrl: [],
        page:"",
        url:"",
        current_page:"",
        total_pages:"",
        rolling:false,
        customerList:[],
        id:1,
        queryForm: {
          user: '',
        },
        loading:false,
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
      onSubmit() {
        this.customerList=[]
        getCustomersByName(this,this.queryForm.user).then(res=>{
          if(res.data.data.length>0){
            this.customerList=res.data.data
          }else{
            alert("没有查到结果")
            this.getList()
          }
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

</style>
