import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import NotFound from '@/views/NotFound'
import Search from '@/views/Search'

Vue.use(VueRouter) // VueRouter插件初始化

// 创建了一个路由对象
const router = new VueRouter({
  routes: [
    // 重定向
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/search/:words?', component: Search },
    // 路由匹配 => 404
    { path: '*', component: NotFound },
  ],
  // 切换为history模式
  mode: 'history',
})

export default router
