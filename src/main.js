// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueWechatTitle from 'vue-wechat-title';
import { InfiniteScroll } from 'mint-ui';
import 'mint-ui/lib/style.css'



Vue.use(InfiniteScroll);

import MyPlugin from './components/common/js/plugin'

Vue.use(MyPlugin)
Vue.use(VueWechatTitle)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
