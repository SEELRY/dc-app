import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import Goods from '@/components/goods/Goods';
import Ratings from '@/components/ratings/Ratings';
import Seller from '@/components/seller/Seller';


Vue.config.productionTip = false
Vue.use(VueRouter)


//创建routes
const routes = [
  {path:"/",redirect:"/goods"},
  {path:"/goods",component:Goods},
  {path:"/ratings",component:Ratings},
  {path:"/Seller",component:Seller}
]

//实例router
const router = new VueRouter({
  routes,
  linkActiveClass:"active"
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
