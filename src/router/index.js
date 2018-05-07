import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Sales from '../components/sales/sales'
Vue.use(ElementUI);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/sales',
      name:Sales,
      component:Sales
    }
  ]
})
