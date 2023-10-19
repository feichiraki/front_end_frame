// 经过抽离后的路由模块

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // VueRouter插件初始化

import Find from '@/views/Find'
import Friend from '@/views/Friend'
import My from '@/views/My'

const router = new VueRouter({
  routes: [
    { path: '/find', component: Find },
    { path: '/my', component: My },
    { path: '/friend', component: Friend },
  ],
  //   link自定义高亮类名
  linkActiveClass: 'active', // linkActiveClass => 配置模糊匹配的类名
  linkExactActiveClass: 'exact-active', // linkExactActiveClass => 配置精确匹配的类名
})

export default router
