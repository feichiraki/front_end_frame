import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// import Login from '@/views/login/Login'
// import MyOrder from '@/views/myorder/MyOrder'
// import Pay from '@/views/pay/Pay'
// import ProDetail from '@/views/prodetail/ProDetail'
// import Search from '@/views/search/Index'
// import SearchList from '@/views/search/SearchList'

import Layout from '@/views/layout/Layout'
import Home from '@/views/layout/Home'
import Category from '@/views/layout/Category'
import Cart from '@/views/layout/Cart'
import User from '@/views/layout/User'

const Login = () => import('@/views/login/Login')
const MyOrder = () => import('@/views/myorder/MyOrder')
const Pay = () => import('@/views/pay/Pay')
const ProDetail = () => import('@/views/prodetail/ProDetail')
const Search = () => import('@/views/search/Index')
const SearchList = () => import('@/views/search/SearchList')

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }
    ]
  },
  { path: '/search', component: Search },
  { path: '/searchlist', component: SearchList },
  // 动态路由传参，确认将来是由那个商品，路由参数中携带id
  { path: '/prodetail/:id', component: ProDetail },
  { path: '/pay', component: Pay },
  { path: '/myorder', component: MyOrder }
]

const router = new VueRouter({
  routes
})
// 全局前置导航守卫
// 1. to 往哪里去， 到哪去的路由信息对象
// 2. from 从哪里来， 从哪来的路由信息对象
// 3. next() 是否放行
// 如果next()调用，就是放行
// next(路径) 拦截到某个路径页面

// 定义一个数组，专门用户存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 是权限页面，需要判断token
  const token = store.getters.getToken
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
