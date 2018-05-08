import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Sales from '../components/sales/sales'
import Abnormal from '../components/abnormal/abnormal'
import Deal from '../components/deal/deal'
import Detail from '../components/detail/detail'
Vue.use(ElementUI);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta:{
        title:"登陆"
      }
    },
    {
      path:'/sales',
      name:Sales,
      component:Sales,
      meta:{
        title:"添加客户"
      }
    },
    {
      path:'/abnormal',
      name:Abnormal,
      component:Abnormal,
      meta:{
        title:"异常客户"
      }
    },
    {
      path:'/deal',
      name:Deal,
      component:Deal,
      meta:{
        title:"异常处理"
      }
    },
    {
      path:'/detail',
      name:Detail,
      component:Detail,
      meta:{
        title:"客户详情"
      }
    }
  ]
})
